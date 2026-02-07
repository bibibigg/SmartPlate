import { motion } from "framer-motion";

/**
 * 스크롤 유도 인디케이터
 * Hero 섹션 하단에 표시되는 마우스 모양 애니메이션
 */
export default function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      {/* 마우스 모양 */}
      <motion.div
        className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* 마우스 휠 */}
        <motion.div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full mt-2" />
      </motion.div>

      {/* Scroll 텍스트 */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
        Scroll
      </p>
    </motion.div>
  );
}
