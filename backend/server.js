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

// app.get("/api/bodyInfo/check", async (req, res) => {
//   try {
//     const bodyInfoContent = await fs.readFile("./data/bodyInfo.json", "utf-8");
//     const bodyInfo = JSON.parse(bodyInfoContent);

//     const today = new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
//       .toISOString()
//       .split("T")[0];

//     const exists = bodyInfo.some(
//       (data) => data.updatedAt.split("T")[0] === today
//     );

//     res.json({ exists });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

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
    const bodyInfoContent = await fs.readFile("./data/bodyInfo.json", "utf-8");
    const bodyInfo = JSON.parse(bodyInfoContent);

    const koreanDateTime = new Date(
      new Date().getTime() + 9 * 60 * 60 * 1000
    ).toISOString();

    const newData = {
      ...req.body,
      updatedAt: koreanDateTime,
    };
    bodyInfo.push(newData);
    await fs.writeFile("./data/bodyInfo.json", JSON.stringify(bodyInfo));
    res.json(bodyInfoData);
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

//식단 조회
app.get("/api/meals", async (req, res) => {
  try {
    const { search } = req.query;
    const mealsContent = await fs.readFile("./data/food_data.json", "utf-8");
    let meals = JSON.parse(mealsContent);

    if (search) {
      meals = meals.filter((meal) => {
        const searchableText = `${meal.name}`.toLowerCase();
        return searchableText.includes(search.toLowerCase());
      });
      console.log("음식조회");
    }

    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//식단 저장
app.post("/api/meals", async (req, res) => {
  try {
    const mealsData = req.body;

    // 데이터 유효성 검사
    if (!mealsData) {
      return res
        .status(400)
        .json({ message: "post요청 오류: 필수 데이터가 누락되었습니다." });
    }

    // 기존 데이터 읽기
    let existingData = [];
    try {
      const mealsContent = await fs.readFile(
        "./data/my_food_data.json",
        "utf-8"
      );
      existingData = JSON.parse(mealsContent);
    } catch (error) {
      // 파일이 없거나 비어있는 경우 빈 배열로 시작
      existingData = [];
    }

    // 새로운 데이터를 배열에 추가
    existingData.push(mealsData);

    // 파일에 저장
    await fs.writeFile(
      "./data/my_food_data.json",
      JSON.stringify(existingData, null, 2)
    );

    res.status(201).json({
      message: "식사가 저장되었습니다.",
      data: mealsData,
    });
  } catch (error) {
    console.error("식사 저장 중 오류:", error);
    res.status(500).json({
      message: "식사 저장에 실패했습니다.",
      error: error.message,
    });
  }
});

// 음식 조회
app.get("/api/myMeals", async (req, res) => {
  try {
    const myMealsContent = await fs.readFile(
      "./data/my_food_data.json",
      "utf-8"
    );
    const myMeals = JSON.parse(myMealsContent);
    res.json(myMeals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// // 식사 검색
// app.get("/api/meals/search", async (req, res) => {
//   try {
//     const { search } = req.query;
//     const mealsContent = await fs.readFile("./data/food_data.json", "utf-8");
//     const meals = JSON.parse(mealsContent);

//     const searchResults = meals.filter((meal) =>
//       meal.name.toLowerCase().includes(search.toLowerCase())
//     );

//     res.json(searchResults);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
