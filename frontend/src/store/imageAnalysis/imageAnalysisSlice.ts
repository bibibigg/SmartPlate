import { create } from "zustand";
import { analyzeFoodImage, AnalyzedFood } from "../../utils/http";

interface ImageAnalysisState {
  selectedImage: string | null;
  analyzedFoods: AnalyzedFood[] | null;
  isAnalyzing: boolean;
  error: string | null;

  // Actions
  setSelectedImage: (image: string | null) => void;
  setAnalyzedFoods: (foods: AnalyzedFood[] | null) => void;
  setError: (error: string | null) => void;
  analyzeImage: (base64Image: string) => Promise<void>;
  reset: () => void;
}

const initialState = {
  selectedImage: null,
  analyzedFoods: null,
  isAnalyzing: false,
  error: null,
};

export const useImageAnalysisStore = create<ImageAnalysisState>((set) => ({
  ...initialState,

  setSelectedImage: (image) => {
    set({
      selectedImage: image,
      analyzedFoods: null,
      error: null,
    });
  },

  setAnalyzedFoods: (foods) => {
    set({ analyzedFoods: foods });
  },

  setError: (error) => {
    set({ error });
  },

  analyzeImage: async (base64Image) => {
    set({ isAnalyzing: true, error: null });

    try {
      const data = await analyzeFoodImage(base64Image);
      set({ analyzedFoods: data.foods, isAnalyzing: false });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "이미지 분석 중 오류가 발생했습니다.";
      set({ error: errorMessage, isAnalyzing: false });
    }
  },

  reset: () => {
    set(initialState);
  },
}));
