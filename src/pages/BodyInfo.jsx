import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getKoreanDate } from "../utils/formatDate";

export default function BodyInfoPage() {
  const navigate = useNavigate();
  const [bodyData, setBodyData] = useState({});

  useEffect(() => {
    const savedBodyData = localStorage.getItem("bodyInfo");

    if (savedBodyData) {
      const parsedData = JSON.parse(savedBodyData);
      const latestData = parsedData[parsedData.length - 1]; // 가장 최근 데이터 가져오기
      setBodyData(latestData);
    }
  }, []);

  // 폼 제출 핸들러
  // 제출 시 로컬스토리지에 데이터를 저장
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const koreanDateTime = getKoreanDate().toISOString();
      const bodyInfo = {
        ...Object.fromEntries(formData.entries()),
        updatedAt: koreanDateTime,
      };

      const existingData = JSON.parse(localStorage.getItem("bodyInfo") || "[]");
      const today = koreanDateTime.split("T")[0];

      // 오늘 데이터 존재 여부 확인
      const alreadyExists = existingData.some(
        (data) => data.updatedAt.split("T")[0] === today
      );

      // 데이터가 있고, 사용자가 덮어쓰기를 원하지 않는 경우
      if (
        alreadyExists &&
        !window.confirm("오늘 이미 입력한 데이터가 있습니다. 덮어쓸까요?")
      ) {
        return;
      }

      // 오늘 데이터가 없을 시 기존 데이터 사용, 오늘 데이터 존재 시 필터링
      const filteredData = alreadyExists
        ? existingData.filter((data) => data.updatedAt.split("T")[0] !== today)
        : existingData;

      const updatedData = [...filteredData, bodyInfo];
      localStorage.setItem("bodyInfo", JSON.stringify(updatedData));
      navigate("/");
    } catch (error) {
      console.error("데이터 저장 중 오류 발생:", error);
      alert("데이터 저장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">신체 정보 입력</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="font-semibold">성별</label>
        <select name="gender" className="border p-2 rounded w-full" required>
          <option value="male">남자</option>
          <option value="female">여자</option>
        </select>
        <label className="font-semibold">나이</label>
        <input
          type="number"
          name="age"
          placeholder="나이"
          defaultValue={bodyData.age || ""}
          className="border p-2 rounded w-full"
          required
        />
        <label className="font-semibold">키</label>
        <input
          type="number"
          name="height"
          step="0.1"
          placeholder="신장 (cm)"
          defaultValue={bodyData.height || ""}
          className="border p-2 rounded w-full"
          required
        />
        <label className="font-semibold">체중</label>
        <input
          type="number"
          step="0.1"
          name="weight"
          placeholder="체중 (kg)"
          defaultValue={bodyData.weight || ""}
          className="border p-2 rounded w-full"
          required
        />
        <label className="font-semibold">골격근량</label>
        <input
          type="number"
          step="0.1"
          name="muscle"
          placeholder="골격근량 (kg)"
          defaultValue={bodyData.muscle || ""}
          className="border p-2 rounded w-full"
          required
        />
        <label className="font-semibold">체지방량</label>
        <input
          type="number"
          step="0.1"
          name="fatMass"
          placeholder="체지방량 (kg)"
          defaultValue={bodyData.fatMass || ""}
          className="border p-2 rounded w-full"
          required
        />

        {/* TDEE계산을 위한 활동지수 */}
        <label className="font-semibold">운동 빈도</label>
        <select
          name="exerciseFrequency"
          className="border p-2 rounded w-full"
          required
        >
          <option value="1.2" selected={bodyData.exerciseFrequency === "1.2"}>
            거의 활동 없음
          </option>
          <option
            value="1.375"
            selected={bodyData.exerciseFrequency === "1.375"}
          >
            가벼운 활동(주 1~2회 운동)
          </option>
          <option value="1.55" selected={bodyData.exerciseFrequency === "1.55"}>
            보통 활동 (주 3~5회 운동)
          </option>
          <option
            value="1.725"
            selected={bodyData.exerciseFrequency === "1.725"}
          >
            매우 활동적 (주 6~7회)
          </option>
        </select>
        <label className="font-semibold">목표</label>
        <select name="goal" className="border p-2 rounded w-full" required>
          <option value="maintain" selected={bodyData.goal === "maintain"}>
            체중 유지
          </option>
          <option value="lose" selected={bodyData.goal === "lose"}>
            체중 감량
          </option>
          <option value="gain" selected={bodyData.goal === "gain"}>
            근육 증량
          </option>
        </select>
        <button className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600">
          저장하고 홈으로 이동
        </button>
      </form>
    </div>
  );
}
