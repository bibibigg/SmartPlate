import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// 라우터 임포트
import authRouter from "./routes/auth.js";
import bodyInfoRouter from "./routes/bodyinfo.js";
import mealsRouter from "./routes/meals.js";
import analyzeRouter from "./routes/analyze.js";

// 환경 변수 로드
dotenv.config();

const app = express();

// Base64 이미지를 위해 제한 대폭 증가
app.use(bodyParser.json({ limit: 10 * 1024 * 1024 }));
app.use(bodyParser.urlencoded({ limit: 10 * 1024 * 1024, extended: true }));
app.use(cors());

// 서버 상태 확인
app.get("/", (req, res) => {
  res.json({ message: "서버가 정상 작동 중입니다!" });
});

// 라우터 연결
app.use("/api/auth", authRouter);
app.use("/api/bodyinfo", bodyInfoRouter);
app.use("/api/meals", mealsRouter);
app.use("/api/analyze", analyzeRouter);

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
