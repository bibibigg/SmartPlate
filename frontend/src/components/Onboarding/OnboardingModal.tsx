import { memo, useState } from "react";
import Modal from "../UI/Modal";

interface OnboardingModalProps {
  onConfirm: () => void; // "지금 입력하기" 클릭
  onLater: (dontShowToday: boolean) => void; // "다음에 입력" 클릭 (체크박스 상태 전달)
}

function OnboardingModal({ onConfirm, onLater }: OnboardingModalProps) {
  const [dontShowToday, setDontShowToday] = useState(false);

  const handleLaterClick = () => {
    onLater(dontShowToday);
  };

  return (
    <Modal title="신체 정보를 입력해주세요" onClose={handleLaterClick}>
      <div className="space-y-6 mt-6">
        {/* 메시지 섹션 */}
        <div className="flex flex-col items-center text-center space-y-4">
          {/* 메시지 */}
          <div className="space-y-2">
            <p className="text-gray-800 dark:text-gray-200 font-medium text-base">
              신체 정보가 아직 입력되지 않았어요
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed px-2">
              신체 정보를 입력하시면
              <br />
              <span className="text-[#00BCD4] dark:text-[#67e8f9] font-semibold">
                맞춤형 칼로리 목표
              </span>
              를 추천해드립니다
            </p>
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-gray-200 dark:border-gray-700"></div>

        {/* 체크박스 섹션 */}
        <div className="flex items-center gap-3 px-2 py-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
          <input
            id="dont-show-today"
            type="checkbox"
            checked={dontShowToday}
            onChange={(e) => setDontShowToday(e.target.checked)}
            className="w-4 h-4 text-[#00BCD4] bg-gray-100 border-gray-300 rounded focus:ring-[#00BCD4] focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
            aria-label="오늘 하루 보지 않기"
          />
          <label
            htmlFor="dont-show-today"
            className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer select-none flex-1"
          >
            오늘 하루 보지 않기
          </label>
        </div>

        {/* 버튼 그룹 */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
          <button
            onClick={handleLaterClick}
            className="flex-1 px-5 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-all duration-200 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 focus:ring-offset-2"
            aria-label="나중에 신체 정보 입력하기"
          >
            다음에 입력할게요
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-5 py-3 bg-gradient-to-r from-[#00BCD4] to-[#0097A7] hover:from-[#0097A7] hover:to-[#00838F] text-white rounded-lg transition-all duration-200 font-semibold text-sm shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:ring-offset-2 transform hover:scale-[1.02]"
            aria-label="지금 신체 정보 입력하기"
          >
            지금 입력하기
          </button>
        </div>
      </div>
    </Modal>
  );
}

// React.memo로 불필요한 리렌더링 방지
export default memo(OnboardingModal);
