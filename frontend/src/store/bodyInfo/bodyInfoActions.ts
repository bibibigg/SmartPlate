import { bodyInfoActions, BodyInfo } from "./bodyInfoSlice";
import { uiActions } from "../UI/uiSlice";
import { getKoreanDate } from "../../utils/formatDate";
import { AppDispatch } from "../index";

export function fetchBodyData() {
  return function (dispatch: AppDispatch) {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Pending",
        message: "pending body data",
      })
    );
    function fetchData(): BodyInfo[] {
      // 이 부분에 fetch파일에 들어있는 리액트 쿼리 함수를 사용

      const savedData = localStorage.getItem("bodyInfo");

      const parsedData = savedData ? JSON.parse(savedData) : [];
      return parsedData;
    }
    try {
      // dispatch(
      //   uiActions.showNotification({
      //     status: "loading",
      //     title: "Loading",
      //     message: "loading body data",
      //   })
      // );
      const bodydata = fetchData();
      // console.log("로드데이터", bodydata);
      dispatch(bodyInfoActions.loadBodyInfo(bodydata));
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "success",
          message: "load body data successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "fetching cart data failed",
        })
      );
    }
  };
}

export function sendBodyData(bodyData: Omit<BodyInfo, "updatedAt">) {
  return function (dispatch: AppDispatch) {
    try {
      const koreanDateTime = getKoreanDate().toISOString();
      const savedData = localStorage.getItem("bodyInfo");
      const parsedData: BodyInfo[] = savedData ? JSON.parse(savedData) : [];

      const updateBodyInfo: BodyInfo = {
        ...bodyData,
        updatedAt: koreanDateTime,
      };

      const today = koreanDateTime.split("T")[0];
      const alreadyExists = parsedData.some(
        (data: BodyInfo) => data.updatedAt.split("T")[0] === today
      );

      if (alreadyExists) {
        const confirmOverwrite = window.confirm(
          "오늘 이미 입력한 데이터가 있습니다. 덮어쓸까요?"
        );

        if (!confirmOverwrite) {
          return;
        }
      }

      const filteredData = alreadyExists
        ? parsedData.filter((data: BodyInfo) => data.updatedAt.split("T")[0] !== today)
        : parsedData;

      const updateData = [...filteredData, updateBodyInfo];

      localStorage.setItem("bodyInfo", JSON.stringify(updateData));

      dispatch(bodyInfoActions.addBodyInfo(updateBodyInfo));
      // console.log("추가 완료", bodyData);
    } catch (error) {
      // console.error("데이터 저장 중 오류:", error);
    }
  };
}

// export function updateBodyData(updatedBodyData) {
//   return function (dispatch) {
//     try {
//       dispatch(bodyInfoActions.updateBodyInfo(updatedBodyData));
//     } catch (error) {
//       console.error("데이터 변경 중 오류:", error);
//     }
//   };
// }
