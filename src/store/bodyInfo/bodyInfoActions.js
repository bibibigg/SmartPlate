import { bodyInfoActions } from "./bodyInfoSlice";
import { uiActions } from "./uiSlice";

export function fetchBodyData() {
  return function (dispatch) {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Pending",
        message: "pending body data",
      })
    );
    function fetchData() {
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
      dispatch(bodyInfoActions.loadBodyInfo(bodydata));
      dispatch(
        uiActions.showNotification({
          status: "sucess",
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

export function sendBodyData(bodyData) {
  return function (dispatch) {
    function sendData() {
      const data = localStorage.setItem("bodyInfo", bodyData);
      return data;
    }

    try {
      const setBodyData = sendData();
      dispatch(bodyInfoActions.addBodyInfo(setBodyData));
    } catch (error) {
      console.error("데이터 저장 중 오류:", error);
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
