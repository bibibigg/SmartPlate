import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/http";
import { fetchBodyData, sendBodyData } from "../store/bodyInfo/bodyInfoActions";
import BodyInfoForm from "../components/bodyInfo/bodyInfoForm";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorBlock from "../components/UI/ErrorBlock";

export default function BodyInfoPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const bodyData = useSelector((state) => state.bodyInfo.info ?? []);
  // const uiNotification = useSelector((state) => state.ui.notification);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["bodyInfo"],
    queryFn: fetchData("bodyinfo"),
  });

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (isError) {
    <ErrorBlock
      title="에러!"
      message={error.info?.message || "fail to fetch"}
    />;
  }

  function handleSubmit(event) {
    event.preventDefault();

    try {
      const formData = new FormData(event.target);
      const bodyInfoFormData = Object.fromEntries(formData.entries());
      dispatch(sendBodyData(bodyInfoFormData));
      navigate("/");
    } catch (error) {
      console.error("데이터 저장 중 오류 발생:", error);
      alert("데이터 저장에 실패했습니다. 다시 시도해주세요.");
    }
  }

  if (data) {
    return <BodyInfoForm bodyData={data} handleSubmit={handleSubmit} />;
  }

  // useEffect(() => {
  //   dispatch(fetchBodyData());
  // }, [dispatch]);
  // const currentData = bodyData.length > 0 ? bodyData[bodyData.length - 1] : {};

  // function handleSubmit(event) {
  //   event.preventDefault();

  //   try {
  //     const formData = new FormData(event.target);
  //     const bodyInfoFormData = Object.fromEntries(formData.entries());
  //     dispatch(sendBodyData(bodyInfoFormData));
  //     navigate("/");
  //   } catch (error) {
  //     console.error("데이터 저장 중 오류 발생:", error);
  //     alert("데이터 저장에 실패했습니다. 다시 시도해주세요.");
  //   }
  // }

  // if (!uiNotification || uiNotification.status === "pending") {
  //   return <div>데이터 로드 중...</div>;
  // }

  // if (uiNotification.status === "success") {
  //   return <BodyInfoForm bodyData={currentData} handleSubmit={handleSubmit} />;
  // }
}
