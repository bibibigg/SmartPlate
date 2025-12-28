import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import bcrypt from "bcrypt";
import {
  BodyInfo,
  BodyInfoRequest,
  Meal,
  MealRequest,
  ApiResponse,
} from "./types";
import { supabase } from "./config/supabase";

// 환경 변수 로드
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 프로젝트 루트 디렉토리 (dist 폴더가 있든 없든 상관없이)
const rootDir = __dirname.endsWith("dist")
  ? path.dirname(__dirname)
  : __dirname;

const bodyInfoPath = path.join(rootDir, "data", "bodyInfo.json");
const foodDataPath = path.join(rootDir, "data", "food_data.json");
const myFoodDataPath = path.join(rootDir, "data", "my_food_data.json");

const app = express();

// OpenAI 클라이언트 초기화
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Base64 이미지를 위해 제한 대폭 증가
app.use(bodyParser.json({ limit: 10 * 1024 * 1024 }));
app.use(bodyParser.urlencoded({ limit: 10 * 1024 * 1024, extended: true }));
app.use(cors());

// 서버 상태 확인
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "서버가 정상 작동 중입니다!" });
});

// 회원가입 API
app.post("/api/auth/signup", async (req: Request, res: Response) => {
  try {
    const { userId, username, password } = req.body;

    // 입력 검증
    if (!userId || !username || !password) {
      return res.status(400).json({
        message: "아이디, 닉네임, 비밀번호를 모두 입력해주세요.",
      });
    }

    // 아이디 길이 검증 (최소 4자)
    if (userId.length < 4) {
      return res.status(400).json({
        message: "아이디는 최소 4자 이상이어야 합니다.",
      });
    }

    // 닉네임 길이 검증 (최소 2자)
    if (username.length < 2) {
      return res.status(400).json({
        message: "닉네임은 최소 2자 이상이어야 합니다.",
      });
    }

    // 비밀번호 길이 검증 (최소 6자)
    if (password.length < 6) {
      return res.status(400).json({
        message: "비밀번호는 최소 6자 이상이어야 합니다.",
      });
    }

    // 중복 아이디 체크
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (existingUser) {
      return res.status(409).json({
        message: "이미 존재하는 아이디입니다.",
      });
    }

    // 비밀번호 해싱
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 사용자 생성
    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert([
        {
          user_id: userId,
          username: username,
          password: hashedPassword,
        },
      ])
      .select()
      .single();

    if (insertError) {
      console.error("사용자 생성 오류:", insertError);
      return res.status(500).json({
        message: "회원가입 중 오류가 발생했습니다.",
      });
    }

    res.status(201).json({
      message: "회원가입이 완료되었습니다.",
      user: {
        id: newUser.id,
        userId: newUser.user_id,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error("회원가입 오류:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      message: "회원가입에 실패했습니다.",
      error: errorMessage,
    });
  }
});

// BodyInfo 조회
app.get("/api/bodyinfo", async (req: Request, res: Response) => {
  try {
    const bodyInfoContent = await fs.readFile(bodyInfoPath, "utf-8");
    const bodyInfo: BodyInfo[] = JSON.parse(bodyInfoContent);
    res.json(bodyInfo);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: errorMessage });
  }
});

// BodyInfo 업데이트
app.post(
  "/api/bodyinfo",
  async (req: Request<{}, {}, BodyInfoRequest>, res: Response) => {
    try {
      const bodyInfoData = req.body;

      // 데이터 유효성 검사
      if (
        !bodyInfoData.gender ||
        !bodyInfoData.age ||
        !bodyInfoData.height ||
        !bodyInfoData.weight ||
        !bodyInfoData.muscle ||
        !bodyInfoData.fatMass ||
        !bodyInfoData.exerciseFrequency ||
        !bodyInfoData.goal
      ) {
        return res
          .status(400)
          .json({ message: "post요청 오류: 필수 데이터가 누락되었습니다." });
      }
      const bodyInfoContent = await fs.readFile(bodyInfoPath, "utf-8");
      const bodyInfo: BodyInfo[] = JSON.parse(bodyInfoContent);

      const koreanDateTime = new Date(
        new Date().getTime() + 9 * 60 * 60 * 1000
      ).toISOString();

      const newData: BodyInfo = {
        ...req.body,
        updatedAt: koreanDateTime,
      };
      bodyInfo.push(newData);
      await fs.writeFile(bodyInfoPath, JSON.stringify(bodyInfo));
      res.json(bodyInfoData);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({ message: errorMessage });
    }
  }
);

// 카테고리별 식사 조회 (검색어 포함)
app.get(
  "/api/meals/category/:category",
  async (req: Request, res: Response) => {
    try {
      const { category } = req.params;
      const { search } = req.query;

      const mealsContent = await fs.readFile(foodDataPath, "utf-8");
      const meals: Meal[] = JSON.parse(mealsContent);

      let filteredMeals = meals.filter((meal) => meal.category === category);

      // 검색어가 있는 경우 추가 필터링
      if (search && typeof search === "string") {
        filteredMeals = filteredMeals.filter((meal) => {
          const searchableText = `${meal.name} ${
            meal.description || ""
          }`.toLowerCase();
          return searchableText.includes(search.toLowerCase());
        });
      }

      res.json(filteredMeals);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({ message: errorMessage });
    }
  }
);

// 식단 조회
app.get("/api/meals", async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const mealsContent = await fs.readFile(foodDataPath, "utf-8");
    let meals: Meal[] = JSON.parse(mealsContent);

    if (search && typeof search === "string") {
      meals = meals.filter((meal) => {
        const searchableText = `${meal.name}`.toLowerCase();
        return searchableText.includes(search.toLowerCase());
      });
      console.log("음식조회");
    }

    res.json(meals);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: errorMessage });
  }
});

// 식단 저장
app.post(
  "/api/meals",
  async (req: Request<{}, {}, MealRequest>, res: Response) => {
    try {
      const mealsData = req.body;

      // 데이터 유효성 검사
      if (!mealsData) {
        return res
          .status(400)
          .json({ message: "post요청 오류: 필수 데이터가 누락되었습니다." });
      }

      // 기존 데이터 읽기
      let existingData: MealRequest[] = [];
      try {
        const mealsContent = await fs.readFile(myFoodDataPath, "utf-8");
        existingData = JSON.parse(mealsContent);
      } catch (error) {
        // 파일이 없거나 비어있는 경우 빈 배열로 시작
        existingData = [];
      }

      // 새로운 데이터를 배열에 추가
      existingData.push(mealsData);

      // 파일에 저장
      await fs.writeFile(myFoodDataPath, JSON.stringify(existingData, null, 2));

      res.status(201).json({
        message: "식사가 저장되었습니다.",
        data: mealsData,
      });
    } catch (error) {
      console.error("식사 저장 중 오류:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({
        message: "식사 저장에 실패했습니다.",
        error: errorMessage,
      });
    }
  }
);

// 음식 조회
app.get("/api/myMeals", async (req: Request, res: Response) => {
  try {
    const myMealsContent = await fs.readFile(myFoodDataPath, "utf-8");
    const myMeals: Meal[] = JSON.parse(myMealsContent);
    res.json(myMeals);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: errorMessage });
  }
});

// AI 이미지 분석 엔드포인트
app.post("/api/analyze-food-image", async (req: Request, res: Response) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ message: "이미지가 제공되지 않았습니다." });
    }

    // Zod 스키마 정의
    const FoodAnalysis = z.object({
      foods: z.array(
        z.object({
          name: z.string().describe("음식 이름 (한글)"),
          calories: z.number().describe("예상 칼로리 (kcal)"),
          weight: z.number().describe("예상 중량 (그램)"),
          protein: z.number().describe("단백질 (g)"),
          carbohydrates: z.number().describe("탄수화물 (g)"),
          fat: z.number().describe("지방 (g)"),
          confidence: z.number().min(0).max(1).describe("확신도 (0-1 사이)"),
        })
      ),
    });

    // Responses API를 사용하여 GPT-5.2로 이미지 분석 (Structured Outputs)
    const response = await openai.responses.parse({
      model: "gpt-5.2",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `이 음식 이미지를 분석해주세요.
              - 이미지에 있는 모든 음식을 식별하세요
              - 각 음식의 칼로리, 중량, 영양소(단백질, 탄수화물, 지방)를 추정하세요
              - 확신도는 0-1 사이 값으로 표현하세요 (1에 가까울수록 확실함)
              - 여러 음식이 있으면 모두 배열에 포함하세요`,
            },
            {
              type: "input_image",
              image_url: image,
              detail: "high",
            },
          ],
        },
      ],
      text: {
        format: zodTextFormat(FoodAnalysis, "food_analysis"),
      },
      max_output_tokens: 2000,
    });

    // Structured Outputs이므로 타입 안전하게 파싱된 결과 사용
    const analysisResult = response.output_parsed;

    if (!analysisResult) {
      return res
        .status(500)
        .json({ message: "AI 분석 결과를 받지 못했습니다." });
    }

    res.json(analysisResult);
  } catch (error) {
    console.error("AI 이미지 분석 오류:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      message: "이미지 분석에 실패했습니다.",
      error: errorMessage,
    });
  }
});

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
