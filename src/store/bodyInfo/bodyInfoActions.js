import { bodyInfoActions } from "./bodyInfoSlice";

export const fetchBodyData = () => {
  return (dispatch) => {
    const fetchData = () => {
      const savedData = localStorage.getItem("bodyInfo");
      const parsedData = savedData ? JSON.parse(savedData) : [];
      return parsedData;
    };
    try {
      const bodydata = fetchData();
      dispatch(bodyInfoActions.loadBodyInfo(bodydata));
    } catch {
      // status: 'error'
    }
  };
};

// export const sendBodyData = (bodyData) => {
//   return (dispatch) => {
//     const sendData = () => {
//       const data = localStorage.setItem('bodyInfo', bodyData)

//     }

//     try {
//       sendData()
//     } catch {
// // status: 'error'
//     }
//   }
// }
