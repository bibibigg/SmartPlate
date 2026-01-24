import { Router, Response } from "express";
import fs from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { supabase } from "../config/supabase.js";
import { authMiddleware } from "../middleware/auth.js";
import {
  AuthenticatedRequest,
  BodyInfo,
  BodyInfoRequest,
  BodyInfoDB,
} from "../types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = __dirname.includes("dist")
  ? path.resolve(__dirname, "../..")
  : path.resolve(__dirname, "..");
const bodyInfoPath = path.join(rootDir, "data", "bodyInfo.json");

const router = Router();

// BodyInfo 조회 (인증 필요)
router.get(
  "/",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user!.userId;

      const { data: bodyInfo, error } = await supabase
        .from("body_info")
        .select("*")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false });

      if (error) {
        throw error;
      }

      // snake_case -> camelCase 변환
      const formattedData = (bodyInfo || []).map((item: BodyInfoDB) => ({
        id: item.id,
        gender: item.gender,
        age: item.age,
        height: item.height,
        weight: item.weight,
        muscle: item.muscle,
        fatMass: item.fat_mass,
        exerciseFrequency: item.exercise_frequency,
        goal: item.goal,
        updatedAt: item.updated_at,
        createdAt: item.created_at,
      }));

      res.json(formattedData);
    } catch (error) {
      console.error("BodyInfo 조회 오류:", error);

      // Supabase 오류 시 JSON 파일에서 읽기 (폴백)
      try {
        const bodyInfoContent = await fs.readFile(bodyInfoPath, "utf-8");
        const bodyInfo: BodyInfo[] = JSON.parse(bodyInfoContent);
        res.json(bodyInfo);
      } catch {
        res
          .status(500)
          .json({ message: "신체 정보를 가져오는데 실패했습니다." });
      }
    }
  },
);

// BodyInfo 업데이트 (인증 필요)
router.post(
  "/",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user!.userId;
      const bodyInfoData: BodyInfoRequest = req.body;

      // 데이터 유효성 검사
      if (
        !bodyInfoData.gender ||
        !bodyInfoData.age ||
        !bodyInfoData.height ||
        !bodyInfoData.weight ||
        bodyInfoData.muscle === undefined ||
        bodyInfoData.fatMass === undefined ||
        !bodyInfoData.exerciseFrequency ||
        !bodyInfoData.goal
      ) {
        return res
          .status(400)
          .json({ message: "필수 데이터가 누락되었습니다." });
      }

      const now = new Date().toISOString();

      // Supabase에 저장
      const { data, error } = await supabase
        .from("body_info")
        .insert({
          user_id: userId,
          gender: bodyInfoData.gender,
          age: bodyInfoData.age,
          height: bodyInfoData.height,
          weight: bodyInfoData.weight,
          muscle: bodyInfoData.muscle,
          fat_mass: bodyInfoData.fatMass,
          exercise_frequency: Number(bodyInfoData.exerciseFrequency),
          goal: bodyInfoData.goal,
          created_at: now,
          updated_at: now,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      // camelCase로 응답
      res.json({
        ...bodyInfoData,
        updatedAt: data.updated_at,
      });
    } catch (error) {
      console.error("BodyInfo 저장 오류:", error);

      // Supabase 오류 시 JSON 파일에 저장 (폴백)
      try {
        const bodyInfoContent = await fs.readFile(bodyInfoPath, "utf-8");
        const bodyInfo: BodyInfo[] = JSON.parse(bodyInfoContent);

        const koreanDateTime = new Date(
          new Date().getTime() + 9 * 60 * 60 * 1000,
        ).toISOString();

        const newData: BodyInfo = {
          ...req.body,
          updatedAt: koreanDateTime,
        };
        bodyInfo.push(newData);
        await fs.writeFile(bodyInfoPath, JSON.stringify(bodyInfo));
        res.json(req.body);
      } catch {
        res.status(500).json({ message: "신체 정보 저장에 실패했습니다." });
      }
    }
  },
);

export default router;
