import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(cors());

// BodyInfo 조회
app.get("/api/bodyinfo", async (req, res) => {
  try {
    const bodyInfoContent = await fs.readFile("./data/bodyInfo.json", "utf-8");
    const bodyInfo = JSON.parse(bodyInfoContent);
    res.json(bodyInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// BodyInfo 업데이트
app.post("/api/bodyinfo", async (req, res) => {
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

    await fs.writeFile("./data/bodyInfo.json", JSON.stringify(bodyInfoData));
    res.json(bodyInfoData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 모든 식사 조회
app.get("/api/meals", async (req, res) => {
  try {
    const mealsContent = await fs.readFile("./data/food_data.json", "utf-8");
    const meals = JSON.parse(mealsContent);
    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 카테고리별 식사 조회 (검색어 포함)
app.get("/api/meals/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const { search } = req.query;

    const mealsContent = await fs.readFile("./data/food_data.json", "utf-8");
    const meals = JSON.parse(mealsContent);

    let filteredMeals = meals.filter((meal) => meal.category === category);

    // 검색어가 있는 경우 추가 필터링
    if (search) {
      filteredMeals = filteredMeals.filter((meal) => {
        const searchableText = `${meal.name} ${meal.description}`.toLowerCase();
        return searchableText.includes(search.toLowerCase());
      });
    }

    res.json(filteredMeals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 식사 검색
app.get("/api/meals/search", async (req, res) => {
  try {
    const { search_keyword } = req.query;
    const mealsContent = await fs.readFile("./data/food_data.json", "utf-8");
    const meals = JSON.parse(mealsContent);

    const searchResults = meals.filter((meal) =>
      meal.name.toLowerCase().includes(search_keyword.toLowerCase())
    );

    res.json(searchResults);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
