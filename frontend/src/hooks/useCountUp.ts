import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

/**
 * 숫자 count-up 애니메이션 훅 (viewport 진입 시 트리거)
 * Framer Motion의 animate + useInView를 사용하여 부드러운 숫자 증가 효과
 *
 * @param target - 목표 숫자
 * @param options - 애니메이션 옵션
 * @returns ref - 숫자를 표시할 요소에 연결할 ref
 *
 * @example
 * const countRef = useCountUp(1650, { duration: 2 });
 * return <span ref={countRef}>0</span>;
 */
export function useCountUp(
  target: number,
  options: {
    duration?: number;
    delay?: number;
    decimals?: number;
    enabled?: boolean;
    viewportOnce?: boolean; // viewport 진입 한 번만 트리거
    viewportAmount?: number; // 요소가 얼마나 보여야 트리거할지 (0~1)
  } = {}
) {
  const {
    duration = 2,
    delay = 0,
    decimals = 0,
    enabled = true,
    viewportOnce = true,
    viewportAmount = 0.3,
  } = options;

  const nodeRef = useRef<HTMLSpanElement>(null);

  // viewport 진입 감지
  const isInView = useInView(nodeRef, {
    once: viewportOnce,
    amount: viewportAmount
  });

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !enabled) {
      // 애니메이션 비활성화 시 즉시 목표 값 표시
      if (node) {
        node.textContent = target.toFixed(decimals);
      }
      return;
    }

    // viewport에 진입하지 않았으면 0 표시
    if (!isInView) {
      node.textContent = "0";
      return;
    }

    // viewport 진입 시 count-up 애니메이션 시작
    const controls = animate(0, target, {
      duration,
      delay,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = value.toFixed(decimals);
      },
    });

    return () => controls.stop();
  }, [target, duration, delay, decimals, enabled, isInView]);

  return nodeRef;
}
