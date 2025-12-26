import { useRef, memo, useEffect } from "react";
import Modal from "../UI/Modal";
import { FiCamera, FiUpload, FiX } from "react-icons/fi";
import { useImageAnalysisStore } from "../../store/imageAnalysis/imageAnalysisSlice";
import { AnalyzedFood } from "../../utils/http";

interface ImageAnalysisModalProps {
  onClose: () => void;
  onConfirm: (foods: AnalyzedFood[]) => void;
}

function ImageAnalysisModal({ onClose, onConfirm }: ImageAnalysisModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    selectedImage,
    analyzedFoods,
    isAnalyzing,
    error,
    setSelectedImage,
    setError,
    analyzeImage,
    reset,
  } = useImageAnalysisStore();

  // 컴포넌트 언마운트 시 상태 초기화
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  // 이미지 파일을 Base64로 변환
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // 파일 선택 핸들러
  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 이미지 파일만 허용
    if (!file.type.startsWith("image/")) {
      setError("이미지 파일만 업로드 가능합니다.");
      return;
    }

    // 파일 크기 제한 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("파일 크기는 10MB 이하여야 합니다.");
      return;
    }

    try {
      const base64 = await convertToBase64(file);
      setSelectedImage(base64);
    } catch (err) {
      setError("이미지 로드에 실패했습니다.");
    }
  };

  // AI 분석 요청
  const handleAnalyze = () => {
    if (selectedImage) {
      analyzeImage(selectedImage);
    }
  };

  // 확인 버튼 핸들러
  const handleConfirm = () => {
    if (analyzedFoods && analyzedFoods.length > 0) {
      onConfirm(analyzedFoods);
      onClose();
    }
  };

  // 이미지 제거
  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Modal title="AI 음식 이미지 분석" onClose={onClose}>
      <div className="p-6 space-y-6">
        {/* 이미지 업로드 영역 */}
        {!selectedImage ? (
          <div className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex flex-col items-center justify-center py-8">
                <FiUpload className="w-12 h-12 mb-4 text-gray-400" />
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                  클릭하여 이미지 업로드
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  PNG, JPG, WEBP, GIF (최대 10MB)
                </p>
              </div>
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            {/* 이미지 미리보기 */}
            <div className="relative">
              <img
                src={selectedImage}
                alt="선택한 음식"
                className="w-full h-64 object-contain rounded-lg bg-gray-100 dark:bg-gray-800"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                aria-label="이미지 제거"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            {/* 분석 버튼 */}
            {!analyzedFoods && (
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full px-4 py-3 bg-gradient-to-r from-[#00BCD4] to-[#0097A7] hover:from-[#0097A7] hover:to-[#00838F] text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>분석 중...</span>
                  </>
                ) : (
                  <>
                    <FiCamera className="w-5 h-5" />
                    <span>AI로 음식 분석하기</span>
                  </>
                )}
              </button>
            )}

            {/* 분석 결과 */}
            {analyzedFoods && analyzedFoods.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  분석 결과
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {analyzedFoods.map((food, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-2"
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-800 dark:text-gray-200">
                          {food.name}
                        </h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          확신도: {Math.round(food.confidence * 100)}%
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <div>칼로리: {food.calories} kcal</div>
                        <div>중량: {food.weight}g</div>
                        <div>단백질: {food.protein}g</div>
                        <div>탄수화물: {food.carbohydrates}g</div>
                        <div>지방: {food.fat}g</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 에러 메시지 */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* 버튼 그룹 */}
        <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors font-medium"
          >
            취소
          </button>
          {analyzedFoods && analyzedFoods.length > 0 && (
            <button
              onClick={handleConfirm}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-[#00BCD4] to-[#0097A7] hover:from-[#0097A7] hover:to-[#00838F] text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            >
              선택한 음식 추가
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default memo(ImageAnalysisModal);
