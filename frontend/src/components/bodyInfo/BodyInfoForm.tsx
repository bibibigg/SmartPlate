import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateBodyData, HttpError } from "../../utils/http";
import { BodyData, BodyInfo } from "../../types";
import { koreanDateTime } from "../../utils/formatDate";
import { queryClient } from "../../utils/http";
import { QUERY_KEYS } from "../../constants/queryKeys";
import React from "react";

interface BodyInfoFormProps {
  bodyData?: BodyInfo | null;
}

export default function BodyInfoForm({ bodyData }: BodyInfoFormProps) {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updateBodyData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BODY_INFO });
      navigate("/");
    },
  });

  const today = koreanDateTime.split("T")[0];
  let lastEntryDate: string | null;

  if (!bodyData) {
    lastEntryDate = null;
  } else {
    lastEntryDate = bodyData.updatedAt.split("T")[0];
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // FormData를 안전하게 BodyData로 변환
    const bodyInfoFormData: BodyData = {
      gender: formData.get("gender") as "male" | "female",
      age: Number(formData.get("age")),
      height: Number(formData.get("height")),
      weight: Number(formData.get("weight")),
      muscle: Number(formData.get("muscle")),
      fatMass: Number(formData.get("fatMass")),
      exerciseFrequency: Number(formData.get("exerciseFrequency")),
      goal: formData.get("goal") as "maintain" | "lose" | "gain",
    };

    if (lastEntryDate === today) {
      const confirmOverwrite = window.confirm(
        "오늘 이미 입력한 데이터가 있습니다. 덮어쓸까요?"
      );
      if (!confirmOverwrite) {
        return;
      }
    }

    mutate(bodyInfoFormData);
  }

  // 상수 데이터 분리
  const EXERCISE_OPTIONS = [
    { value: "1.2", label: "거의 활동 없음" },
    { value: "1.375", label: "가벼운 활동(주 1~2회 운동)" },
    { value: "1.55", label: "보통 활동 (주 3~5회 운동)" },
    { value: "1.725", label: "매우 활동적 (주 6~7회)" },
  ];

  const GOAL_OPTIONS = [
    { value: "maintain", label: "체중 유지" },
    { value: "lose", label: "체중 감량" },
    { value: "gain", label: "근육 증량" },
  ];

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-xl font-bold dark:text-white">신체 정보 입력</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="gender" className="block font-semibold dark:text-white mb-1">
              성별
            </label>
            <select
              id="gender"
              name="gender"
              defaultValue={bodyData?.gender || ""}
              className="border p-2 dark:bg-gray-800 dark:border-white dark:text-white rounded w-full"
              required
              aria-label="성별 선택"
            >
              <option value="male">남자</option>
              <option value="female">여자</option>
            </select>
          </div>

          <div>
            <label htmlFor="age" className="block font-semibold dark:text-white mb-1">
              나이
            </label>
            <input
              id="age"
              type="number"
              name="age"
              placeholder="나이"
              defaultValue={bodyData?.age || ""}
              min="1"
              max="120"
              className="border p-2 dark:bg-gray-800 dark:border-white dark:text-white rounded w-full"
              required
              aria-label="나이 입력"
            />
          </div>

          <div>
            <label htmlFor="height" className="block font-semibold dark:text-white mb-1">
              키 (cm)
            </label>
            <input
              id="height"
              type="number"
              name="height"
              step="0.1"
              placeholder="신장 (cm)"
              defaultValue={bodyData?.height || ""}
              min="100"
              max="250"
              className="border p-2 dark:bg-gray-800 dark:border-white dark:text-white rounded w-full"
              required
              aria-label="키 입력"
            />
          </div>

          <div>
            <label htmlFor="weight" className="block font-semibold dark:text-white mb-1">
              체중 (kg)
            </label>
            <input
              id="weight"
              type="number"
              step="0.1"
              name="weight"
              placeholder="체중 (kg)"
              defaultValue={bodyData?.weight || ""}
              min="30"
              max="300"
              className="border p-2 dark:bg-gray-800 dark:border-white dark:text-white rounded w-full"
              required
              aria-label="체중 입력"
            />
          </div>

          <div>
            <label htmlFor="muscle" className="block font-semibold dark:text-white mb-1">
              골격근량 (kg)
            </label>
            <input
              id="muscle"
              type="number"
              step="0.1"
              name="muscle"
              placeholder="골격근량 (kg)"
              defaultValue={bodyData?.muscle || ""}
              min="0"
              max="100"
              className="border p-2 dark:bg-gray-800 dark:border-white dark:text-white rounded w-full"
              required
              aria-label="골격근량 입력"
            />
          </div>

          <div>
            <label htmlFor="fatMass" className="block font-semibold dark:text-white mb-1">
              체지방량 (kg)
            </label>
            <input
              id="fatMass"
              type="number"
              step="0.1"
              name="fatMass"
              placeholder="체지방량 (kg)"
              defaultValue={bodyData?.fatMass || ""}
              min="0"
              max="150"
              className="border p-2 dark:bg-gray-800 dark:border-white dark:text-white rounded w-full"
              required
              aria-label="체지방량 입력"
            />
          </div>

          <div>
            <label htmlFor="exerciseFrequency" className="block font-semibold dark:text-white mb-1">
              운동 빈도
            </label>
            <select
              id="exerciseFrequency"
              name="exerciseFrequency"
              className="border p-2 dark:bg-gray-800 dark:border-white dark:text-white rounded w-full"
              defaultValue={bodyData?.exerciseFrequency || ""}
              required
              aria-label="운동 빈도 선택"
            >
              {EXERCISE_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="goal" className="block font-semibold dark:text-white mb-1">
              목표
            </label>
            <select
              id="goal"
              name="goal"
              defaultValue={bodyData?.goal || ""}
              className="border p-2 dark:bg-gray-800 dark:border-white dark:text-white rounded w-full"
              required
              aria-label="목표 선택"
            >
              {GOAL_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {isError && (
            <div className="bg-red-100 text-center text-2xl ">
              {error instanceof HttpError ? error.info.message : "데이터 저장에 실패했습니다."}
            </div>
          )}
          {isPending && (
            <button
              disabled
              className="bg-gray-500 text-gray-200 p-2 rounded w-full cursor-not-allowed"
            >
              데이터 전송중...
            </button>
          )}
          {!isPending && (
            <button className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 ">
              저장하고 홈으로 이동
            </button>
          )}
        </form>
      </div>
    </>
  );
}
