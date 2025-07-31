import React from "react";

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-full w-full min-h-[200px]">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
}

export default LoadingSpinner;
