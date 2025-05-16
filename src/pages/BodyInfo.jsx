import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBodyData, sendBodyData } from "../store/bodyInfo/bodyInfoActions";
import { getKoreanDate } from "../utils/formatDate";
import BodyInfoForm from "../components/bodyInfo/bodyInfoForm";

export default function BodyInfoPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bodyData = useSelector((state) => state.bodyInfo.info ?? []);
  console.log(bodyData);

  useEffect(() => {
    dispatch(fetchBodyData());
  }, [dispatch]);
  const currentData = bodyData[bodyData.length - 1];
  console.log(currentData);

  // 폼 제출 핸들러
  // 제출 시 로컬스토리지에 데이터를 저장
  function handleSubmit(event) {
    event.preventDefault();

    try {
      const formData = new FormData(event.target);
      const koreanDateTime = getKoreanDate().toISOString();
      const bodyInfo = {
        ...Object.fromEntries(formData.entries()),
        updatedAt: koreanDateTime,
      };

      const today = koreanDateTime.split("T")[0];

      // 오늘 데이터 존재 여부 확인
      const alreadyExists = bodyData.some(
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
        ? bodyData.filter((data) => data.updatedAt.split("T")[0] !== today)
        : bodyData;

      const updatedData = [...filteredData, bodyInfo];
      dispatch(sendBodyData(JSON.stringify(updatedData)));
      // localStorage.setItem("bodyInfo", JSON.stringify(updatedData));
      navigate("/");
    } catch (error) {
      console.error("데이터 저장 중 오류 발생:", error);
      alert("데이터 저장에 실패했습니다. 다시 시도해주세요.");
    }
  }

  return (
    <BodyInfoForm bodyData={currentData || {}} handleSubmit={handleSubmit} />
  );
}
