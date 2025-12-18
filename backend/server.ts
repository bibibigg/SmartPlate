import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import {
  BodyInfo,
  BodyInfoRequest,
  Meal,
  MealRequest,
  ApiResponse,
} from "./types";

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

app.use(bodyParser.json());
app.use(cors());

// 서버 상태 확인
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "서버가 정상 작동 중입니다!" });
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

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
