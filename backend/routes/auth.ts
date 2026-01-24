import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import { supabase } from "../config/supabase.js";
import { generateToken, authMiddleware } from "../middleware/auth.js";
import { AuthenticatedRequest } from "../types.js";

const router = Router();

// 회원가입 API
router.post("/signup", async (req: Request, res: Response) => {
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

// 로그인 API
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { userId, password } = req.body;

    // 입력 검증
    if (!userId || !password) {
      return res.status(400).json({
        message: "아이디와 비밀번호를 입력해주세요.",
      });
    }

    // 사용자 조회
    const { data: user, error: queryError } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (queryError || !user) {
      return res.status(401).json({
        message: "아이디 또는 비밀번호가 올바르지 않습니다.",
      });
    }

    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "아이디 또는 비밀번호가 올바르지 않습니다.",
      });
    }

    // JWT 토큰 생성
    const token = generateToken({
      userId: user.id,
      userLoginId: user.user_id,
      username: user.username,
    });

    res.json({
      message: "로그인 성공",
      token,
      user: {
        id: user.id,
        userId: user.user_id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("로그인 오류:", error);
    res.status(500).json({
      message: "로그인에 실패했습니다.",
    });
  }
});

// 토큰 검증 API (자동 로그인용)
router.get(
  "/me",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { data: user, error } = await supabase
        .from("users")
        .select("id, user_id, username")
        .eq("id", req.user!.userId)
        .single();

      if (error || !user) {
        return res.status(404).json({
          message: "사용자를 찾을 수 없습니다.",
        });
      }

      res.json({
        user: {
          id: user.id,
          userId: user.user_id,
          username: user.username,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: "사용자 정보를 가져오는데 실패했습니다.",
      });
    }
  },
);

export default router;
