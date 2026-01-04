import { GENDER_OPTIONS } from "../../constants/bodyInfoOptions";
import { BodyInfo } from "../../types";

interface BasicInfoSectionProps {
  selectedGender: "male" | "female";
  onGenderChange: (gender: "male" | "female") => void;
  bodyData?: BodyInfo | null;
}

export default function BasicInfoSection({
  selectedGender,
  onGenderChange,
  bodyData,
}: BasicInfoSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 border border-gray-100 dark:border-gray-700">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-3 sm:mb-4">
        기본 정보
      </h3>

      {/* 성별 선택 */}
      <div className="mb-4 sm:mb-6">
        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          성별
        </label>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {GENDER_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => onGenderChange(value)}
              className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all ${
                selectedGender === value
                  ? value === "male"
                    ? "bg-blue-500 text-white shadow-lg scale-105"
                    : "bg-pink-500 text-white shadow-lg scale-105"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 나이 */}
      <div>
        <label
          htmlFor="age"
          className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          나이
        </label>
        <input
          id="age"
          type="text"
          inputMode="numeric"
          pattern="[0-9]+"
          name="age"
          placeholder="나이를 입력하세요"
          defaultValue={bodyData?.age || ""}
          onInvalid={(e) => {
            (e.target as HTMLInputElement).setCustomValidity("나이는 숫자만 입력 가능합니다");
          }}
          onInput={(e) => {
            (e.target as HTMLInputElement).setCustomValidity("");
          }}
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-all"
          required
        />
      </div>
    </div>
  );
}
