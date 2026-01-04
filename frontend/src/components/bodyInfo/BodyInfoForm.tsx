import { HttpError } from "../../utils/http";
import { BodyInfo } from "../../types";
import { useBodyInfoForm } from "../../hooks/useBodyInfoForm";
import RealTimeAnalysis from "./RealTimeAnalysis";
import BasicInfoSection from "./BasicInfoSection";
import BodyMeasurementSection from "./BodyMeasurementSection";
import ActivityGoalSection from "./ActivityGoalSection";
import FormSubmitButton from "./FormSubmitButton";
import { motion, AnimatePresence } from "framer-motion";

interface BodyInfoFormProps {
  bodyData?: BodyInfo | null;
}

// 애니메이션 variants (컴포넌트 외부로 이동하여 재생성 방지)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function BodyInfoForm({ bodyData }: BodyInfoFormProps) {
  const {
    selectedGender,
    selectedGoal,
    height,
    weight,
    fatMass,
    setSelectedGender,
    setSelectedGoal,
    setHeight,
    setWeight,
    setFatMass,
    bmi,
    bodyFatPercentage,
    bmiStatus,
    weightChange,
    fatChange,
    isPending,
    isError,
    error,
    handleSubmit,
  } = useBodyInfoForm(bodyData);

  return (
    <div className="min-h-screen py-4 sm:py-6 md:py-8 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <motion.div
          className="text-center mb-6 sm:mb-8"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-2xl sm:text-3xl font-bold dark:text-white mb-1 sm:mb-2">
            신체 정보 관리
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            정확한 데이터로 더 나은 건강 관리를 시작하세요
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 실시간 분석 */}
          <AnimatePresence mode="wait">
            {(bmi || bodyFatPercentage) && (
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <RealTimeAnalysis
                  bmi={bmi}
                  bmiStatus={bmiStatus}
                  bodyFatPercentage={bodyFatPercentage}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* 기본 정보 */}
          <motion.div variants={itemVariants}>
            <BasicInfoSection
              selectedGender={selectedGender}
              onGenderChange={setSelectedGender}
              bodyData={bodyData}
            />
          </motion.div>

          {/* 신체 측정 */}
          <motion.div variants={itemVariants}>
            <BodyMeasurementSection
              height={height}
              weight={weight}
              fatMass={fatMass}
              weightChange={weightChange}
              fatChange={fatChange}
              onHeightChange={setHeight}
              onWeightChange={setWeight}
              onFatMassChange={setFatMass}
              bodyData={bodyData}
            />
          </motion.div>

          {/* 활동 & 목표 */}
          <motion.div variants={itemVariants}>
            <ActivityGoalSection
              selectedGoal={selectedGoal}
              onGoalChange={setSelectedGoal}
              bodyData={bodyData}
            />
          </motion.div>

          {/* 에러 메시지 */}
          <AnimatePresence>
            {isError && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800 rounded-xl p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">⚠️</span>
                  <p className="text-red-800 dark:text-red-200 font-semibold">
                    {error instanceof HttpError
                      ? error.info.message
                      : "데이터 저장에 실패했습니다."}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 제출 버튼 */}
          <motion.div variants={itemVariants}>
            <FormSubmitButton isPending={isPending} />
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
}
