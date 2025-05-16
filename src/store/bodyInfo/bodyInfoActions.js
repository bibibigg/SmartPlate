import { bodyInfoActions } from "./bodyInfoSlice";

export function fetchBodyData() {
  return function (dispatch) {
    function fetchData() {
      const savedData = localStorage.getItem("bodyInfo");
      const parsedData = savedData ? JSON.parse(savedData) : [];
      return parsedData;
    }
    try {
      const bodydata = fetchData();
      dispatch(bodyInfoActions.loadBodyInfo(bodydata));
    } catch {
      // status: 'error'
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
