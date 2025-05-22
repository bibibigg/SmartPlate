// import { useDispatch } from "react-redux";
// import { updateBodyData } from "../../store/bodyInfo/bodyInfoActions";

export default function BodyInfoForm({ handleSubmit, bodyData }) {
  // const dispatch = useDispatch();
  console.log(bodyData);
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

  // function handleChange(event) {
  //   const { name, value } = event.target;
  //   const updatedBodyData = {
  //     ...bodyData,
  //     [name]: value,
  //   };
  //   dispatch(updateBodyData(updatedBodyData));
  // }

  // function getFieldLabel(field) {
  //   const fieldLabel = {
  //     age: "나이",
  //     height: "키",
  //     weight: "체중",
  //     muscle: "골격근량",
  //     fatMass: "체지방량",
  //   };
  //   return fieldLabel[field];
  // }

  // const getPlaceholder = (field) =>
  //   ({
  //     age: "나이",
  //     height: "신장 (cm)",
  //     weight: "체중 (kg)",
  //     muscle: "골격근량 (kg)",
  //     fatMass: "체지방량 (kg)",
  //   }[field]);

  return (
    <>
      {bodyData && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">신체 정보 입력</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="font-semibold">성별</label>
            <select
              name="gender"
              key={bodyData.gender || ""}
              defaultValue={bodyData.gender || ""}
              className="border p-2 rounded w-full"
              required
            >
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
              key={bodyData.exerciseFrequency}
              defaultValue={bodyData.exerciseFrequency || ""}
              // onChange={handleChange}
              required
            >
              {EXERCISE_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <label className="font-semibold">목표</label>
            <select
              name="goal"
              key={bodyData.goal}
              defaultValue={bodyData.goal || ""}
              className="border p-2 rounded w-full"
              required
            >
              {GOAL_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <button className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600">
              저장하고 홈으로 이동
            </button>
          </form>
        </div>
      )}
    </>
  );
}
