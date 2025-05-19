// import { getKoreanDate } from "./formatDate";

// export default function prepareBodyInfo(bodyInfo, existingData) {
//   const koreanDateTime = getKoreanDate().toISOString();
//   const updateBodyInfo = {
//     ...bodyInfo,
//     updatedAt: koreanDateTime,
//   };
//   const today = koreanDateTime.split("T")[0];

//   console.log(existingData);
//   const alreadyExists = existingData.some(
//     (data) => data.updatedAt.split("T")[0] === today
//   );

//   if (alreadyExists) {
//     const confirmOverwrite = window.confirm(
//       "오늘 이미 입력한 데이터가 있습니다. 덮어쓸까요?"
//     );

//     if (!confirmOverwrite) {
//       return null;
//     }
//   }

//   const filteredData = alreadyExists
//     ? existingData.filter((data) => data.updatedAt.split("T")[0] !== today)
//     : existingData;

//   return [...filteredData, updateBodyInfo];
// }
