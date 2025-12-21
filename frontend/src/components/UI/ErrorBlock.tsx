import { memo } from "react";

interface ErrorBlockProps {
  title: string;
  message: string;
  onRetry?: () => void;
}

function ErrorBlock({ title, message, onRetry }: ErrorBlockProps) {
  return (
    <div
      className="bg-red-50 dark:bg-red-900/20 my-4 p-6 rounded-lg border-2 border-red-200 dark:border-red-800 flex flex-col gap-4"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex gap-4 items-start">
        <div
          className="text-3xl w-12 h-12 text-white bg-red-600 dark:bg-red-700 rounded-full flex justify-center items-center flex-shrink-0"
          aria-label="에러"
        >
          !
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-red-900 dark:text-red-200 mb-2">{title}</h2>
          <p className="text-red-800 dark:text-red-300">{message}</p>
        </div>
      </div>
      {onRetry && (
        <div className="flex justify-end">
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-white rounded-lg transition-colors font-medium"
            aria-label="다시 시도"
          >
            다시 시도
          </button>
        </div>
      )}
    </div>
  );
}

// React.memo로 불필요한 리렌더링 방지
export default memo(ErrorBlock);
