import { Router, Request, Response } from "express";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

const router = Router();

// OpenAI 클라이언트 초기화
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

// AI 이미지 분석 엔드포인트
router.post("/food-image", async (req: Request, res: Response) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ message: "이미지가 제공되지 않았습니다." });
    }

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

export default router;
