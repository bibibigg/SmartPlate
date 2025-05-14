import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getKoreanDate } from "../utils/formatDate";
import BodyInfoForm from "../components/bodyInfo/bodyInfoForm";

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

  return <BodyInfoForm bodyData={bodyData} handleSubmit={handleSubmit} />;
}
