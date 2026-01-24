import { Router, Request, Response } from "express";
import fs from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { supabase } from "../config/supabase.js";
import { authMiddleware } from "../middleware/auth.js";
import {
  AuthenticatedRequest,
  Meal,
  MealRecordRequest,
  MealItem,
  MealRecordDB,
  MealItemDB,
} from "../types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = __dirname.includes("dist")
  ? path.resolve(__dirname, "../..")
  : path.resolve(__dirname, "..");
const foodDataPath = path.join(rootDir, "data", "food_data.json");
const myFoodDataPath = path.join(rootDir, "data", "my_food_data.json");

const router = Router();

// 음식 검색 (인증 불필요 - 공개 API)
router.get("/", async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const mealsContent = await fs.readFile(foodDataPath, "utf-8");
    let meals: Meal[] = JSON.parse(mealsContent);

    if (search && typeof search === "string") {
      meals = meals.filter((meal) => {
        const searchableText = `${meal.name}`.toLowerCase();
        return searchableText.includes(search.toLowerCase());
      });
    }

    res.json(meals);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: errorMessage });
  }
});

// 카테고리별 음식 조회 (인증 불필요)
router.get("/category/:category", async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const { search } = req.query;

    const mealsContent = await fs.readFile(foodDataPath, "utf-8");
    const meals: Meal[] = JSON.parse(mealsContent);

    let filteredMeals = meals.filter((meal) => meal.category === category);

    if (search && typeof search === "string") {
      filteredMeals = filteredMeals.filter((meal) => {
        const searchableText =
          `${meal.name} ${meal.description || ""}`.toLowerCase();
        return searchableText.includes(search.toLowerCase());
      });
    }

    res.json(filteredMeals);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: errorMessage });
  }
});

// 나의 식사 기록 조회 (인증 필요)
router.get(
  "/my",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user!.userId;

      // meal_records와 meal_items 조인 조회
      const { data: mealRecords, error } = await supabase
        .from("meal_records")
        .select(
          `
        id,
        user_id,
        date,
        total_calories,
        created_at,
        updated_at,
        meal_items (*)
      `,
        )
        .eq("user_id", userId)
        .order("date", { ascending: false });

      if (error) {
        throw error;
      }

      // 프론트엔드 형식으로 변환 (camelCase)
      const formattedData = (mealRecords || []).map((record: MealRecordDB) => ({
        id: record.id,
        date: record.date,
        totalCalories: record.total_calories,
        mealItems: (record.meal_items || []).map((item: MealItemDB) => ({
          id: item.food_id || item.id.toString(),
          name: item.name,
          mainCategory: item.main_category,
          subCategory: item.sub_category,
          servingSize: item.serving_size,
          calories: item.calories,
          protein: item.protein,
          carbohydrates: item.carbohydrates,
          fat: item.fat,
          water: item.water,
          sugar: item.sugar,
          fiber: item.fiber,
          calcium: item.calcium,
          iron: item.iron,
          phosphorus: item.phosphorus,
          potassium: item.potassium,
          sodium: item.sodium,
          vitaminA: item.vitamin_a,
          niacin: item.niacin,
          vitaminC: item.vitamin_c,
          vitaminD: item.vitamin_d,
          cholesterol: item.cholesterol,
          saturatedFat: item.saturated_fat,
          totalWeight: item.total_weight,
          currentServing: item.current_serving,
          brandName: item.brand_name,
        })),
      }));

      res.json(formattedData);
    } catch (error) {
      console.error("식사 기록 조회 오류:", error);

      // Supabase 오류 시 JSON 파일에서 읽기 (폴백)
      try {
        const myMealsContent = await fs.readFile(myFoodDataPath, "utf-8");
        const myMeals = JSON.parse(myMealsContent);
        res.json(myMeals);
      } catch {
        res
          .status(500)
          .json({ message: "식사 기록을 가져오는데 실패했습니다." });
      }
    }
  },
);

// 식사 기록 저장 (인증 필요)
router.post(
  "/",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user!.userId;
      const mealsData: MealRecordRequest = req.body;

      if (!mealsData || !mealsData.mealItems) {
        return res
          .status(400)
          .json({ message: "필수 데이터가 누락되었습니다." });
      }

      const mealDate = new Date(mealsData.date).toISOString().split("T")[0];
      const now = new Date().toISOString();

      // 1. 같은 날짜의 기존 기록 확인
      const { data: existingRecord } = await supabase
        .from("meal_records")
        .select("id")
        .eq("user_id", userId)
        .eq("date", mealDate)
        .single();

      let mealRecordId: string;

      if (existingRecord) {
        // 기존 기록 업데이트
        const { data: updatedRecord, error: updateError } = await supabase
          .from("meal_records")
          .update({
            total_calories: mealsData.totalCalories,
            updated_at: now,
          })
          .eq("id", existingRecord.id)
          .select()
          .single();

        if (updateError) throw updateError;
        mealRecordId = updatedRecord.id;

        // 기존 meal_items 삭제
        await supabase
          .from("meal_items")
          .delete()
          .eq("meal_record_id", mealRecordId);
      } else {
        // 새 기록 생성
        const { data: newRecord, error: insertError } = await supabase
          .from("meal_records")
          .insert({
            user_id: userId,
            date: mealDate,
            total_calories: mealsData.totalCalories,
            created_at: now,
            updated_at: now,
          })
          .select()
          .single();

        if (insertError) throw insertError;
        mealRecordId = newRecord.id;
      }

      // 2. 새 meal_items 삽입
      const mealItemsToInsert = mealsData.mealItems.map((item: MealItem) => ({
        meal_record_id: mealRecordId,
        food_id: typeof item.id === "string" ? item.id : null,
        name: item.name,
        main_category: item.mainCategory || item.main_category || null,
        sub_category: item.subCategory || item.sub_category || null,
        serving_size: item.servingSize || item.serving_size || "100",
        total_weight: item.totalWeight || item.total_weight || 0,
        current_serving: item.currentServing || item.current_serving || 0,
        calories: item.calories || 0,
        protein: item.protein || 0,
        carbohydrates: item.carbohydrates || 0,
        fat: item.fat || 0,
        water: item.water || 0,
        sugar: item.sugar || 0,
        fiber: item.fiber || 0,
        calcium: item.calcium || 0,
        iron: item.iron || 0,
        phosphorus: item.phosphorus || 0,
        potassium: item.potassium || 0,
        sodium: item.sodium || 0,
        vitamin_a: item.vitaminA || item.vitamin_a || 0,
        niacin: item.niacin || 0,
        vitamin_c: item.vitaminC || item.vitamin_c || 0,
        vitamin_d: item.vitaminD || item.vitamin_d || 0,
        cholesterol: item.cholesterol || 0,
        saturated_fat: item.saturatedFat || item.saturated_fat || 0,
        brand_name: item.brandName || item.brand_name || "해당없음",
        created_at: now,
      }));

      const { error: itemsError } = await supabase
        .from("meal_items")
        .insert(mealItemsToInsert);

      if (itemsError) throw itemsError;

      res.status(201).json({
        message: "식사가 저장되었습니다.",
        data: mealsData,
      });
    } catch (error) {
      console.error("식사 저장 오류:", error);

      // Supabase 오류 시 JSON 파일에 저장
      try {
        let existingData = [];
        try {
          const mealsContent = await fs.readFile(myFoodDataPath, "utf-8");
          existingData = JSON.parse(mealsContent);
        } catch {
          existingData = [];
        }

        existingData.push(req.body);
        await fs.writeFile(
          myFoodDataPath,
          JSON.stringify(existingData, null, 2),
        );

        res.status(201).json({
          message: "식사가 저장되었습니다.",
          data: req.body,
        });
      } catch {
        res.status(500).json({ message: "식사 저장에 실패했습니다." });
      }
    }
  },
);

export default router;
