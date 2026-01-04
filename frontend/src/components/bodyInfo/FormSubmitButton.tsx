interface FormSubmitButtonProps {
  isPending: boolean;
}

export default function FormSubmitButton({ isPending }: FormSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className={`w-full py-3 rounded-lg font-semibold text-base transition-all ${
        isPending
          ? "bg-gray-400 dark:bg-gray-600 text-gray-200 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg"
      }`}
    >
      {isPending ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          데이터 전송 중...
        </span>
      ) : (
        "저장하고 홈으로 이동"
      )}
    </button>
  );
}
