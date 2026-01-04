import { useState, useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateBodyData } from "../utils/http";
import { BodyData, BodyInfo } from "../types";
import { koreanDateTime } from "../utils/formatDate";
import { queryClient } from "../utils/http";
import { QUERY_KEYS } from "../constants/queryKeys";

// BMI 범위 상수
const BMI_RANGES = {
  UNDERWEIGHT: 18.5,
  NORMAL: 23,
  OVERWEIGHT: 25,
  OBESE: 30,
} as const;

export function useBodyInfoForm(bodyData?: BodyInfo | null) {
  const navigate = useNavigate();

  // 폼 상태
  const [selectedGender, setSelectedGender] = useState<"male" | "female">(
    bodyData?.gender || "male"
  );
  const [selectedGoal, setSelectedGoal] = useState<"maintain" | "lose" | "gain">(
    bodyData?.goal || "maintain"
  );
  const [height, setHeight] = useState(bodyData?.height || 0);
  const [weight, setWeight] = useState(bodyData?.weight || 0);
  const [fatMass, setFatMass] = useState(bodyData?.fatMass || 0);

  // Mutation
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updateBodyData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BODY_INFO });
      navigate("/");
    },
  });

  // BMI 계산
  const calculateBMI = () => {
    if (height > 0 && weight > 0) {
      const heightInMeters = height / 100;
      return (weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return null;
  };

  // 체지방률 계산
  const calculateBodyFatPercentage = () => {
    if (weight > 0 && fatMass > 0) {
      return ((fatMass / weight) * 100).toFixed(1);
    }
    return null;
  };

  // BMI 상태 판정
  const getBMIStatus = (bmi: number) => {
    if (bmi < BMI_RANGES.UNDERWEIGHT) return { text: "저체중", color: "text-blue-600 dark:text-blue-400" };
    if (bmi < BMI_RANGES.NORMAL) return { text: "정상", color: "text-green-600 dark:text-green-400" };
    if (bmi < BMI_RANGES.OVERWEIGHT) return { text: "과체중", color: "text-yellow-600 dark:text-yellow-400" };
    if (bmi < BMI_RANGES.OBESE) return { text: "비만", color: "text-orange-600 dark:text-orange-400" };
    return { text: "고도비만", color: "text-red-600 dark:text-red-400" };
  };

  // 이전 데이터와의 변화 계산
  const getChange = (current: number, previous: number | undefined) => {
    if (!previous) return null;
    return current - previous;
  };

  // 폼 제출 핸들러
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const today = koreanDateTime.split("T")[0];
    const lastEntryDate = bodyData?.updatedAt.split("T")[0];

    // 오늘 이미 입력한 데이터가 있는지 확인
    if (lastEntryDate === today) {
      const confirmOverwrite = window.confirm(
        "오늘 이미 입력한 데이터가 있습니다. 덮어쓸까요?"
      );
      if (!confirmOverwrite) {
        return;
      }
    }

    const bodyInfoFormData: BodyData = {
      gender: selectedGender,
      age: Number(formData.get("age")),
      height: Number(formData.get("height")),
      weight: Number(formData.get("weight")),
      muscle: Number(formData.get("muscle")),
      fatMass: Number(formData.get("fatMass")),
      exerciseFrequency: Number(formData.get("exerciseFrequency")),
      goal: selectedGoal,
    };

    mutate(bodyInfoFormData);
  };

  // 계산된 값들 (useMemo로 메모이제이션)
  const bmi = useMemo(() => calculateBMI(), [height, weight]);
  const bodyFatPercentage = useMemo(() => calculateBodyFatPercentage(), [weight, fatMass]);
  const bmiStatus = useMemo(() => (bmi ? getBMIStatus(Number(bmi)) : null), [bmi]);
  const weightChange = useMemo(() => getChange(weight, bodyData?.weight), [weight, bodyData?.weight]);
  const fatChange = useMemo(() => getChange(fatMass, bodyData?.fatMass), [fatMass, bodyData?.fatMass]);

  return {
    // 상태
    selectedGender,
    selectedGoal,
    height,
    weight,
    fatMass,

    // 상태 업데이트 함수
    setSelectedGender,
    setSelectedGoal,
    setHeight,
    setWeight,
    setFatMass,

    // 계산된 값
    bmi,
    bodyFatPercentage,
    bmiStatus,
    weightChange,
    fatChange,

    // Mutation 상태
    isPending,
    isError,
    error,

    // 핸들러
    handleSubmit,
  };
}
