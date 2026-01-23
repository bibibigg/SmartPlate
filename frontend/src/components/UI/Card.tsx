import { memo, ReactNode, HTMLAttributes } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

type CardVariant = "default" | "gradient" | "outlined";

// animate가 false일 때는 일반 div props, true일 때는 motion props
type BaseCardProps = {
  children: ReactNode;
  variant?: CardVariant;
  borderColor?: string;
  className?: string;
  delay?: number;
};

type AnimatedCardProps = BaseCardProps & {
  animate?: true;
} & Omit<HTMLMotionProps<"div">, keyof BaseCardProps>;

type StaticCardProps = BaseCardProps & {
  animate: false;
} & Omit<HTMLAttributes<HTMLDivElement>, keyof BaseCardProps>;

type CardProps = AnimatedCardProps | StaticCardProps;

const variantStyles: Record<CardVariant, string> = {
  default: "bg-white dark:bg-gray-800 shadow-lg",
  gradient:
    "bg-gradient-to-br from-[#00BCD4] to-[#0097A7] dark:from-[#0097A7] dark:to-[#00796B] text-white shadow-xl",
  outlined: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
};

function Card(props: CardProps) {
  const {
    children,
    variant = "default",
    borderColor,
    className = "",
    delay = 0,
    animate = true,
    ...restProps
  } = props;

  const baseStyles = "rounded-2xl p-6";
  const borderStyles = borderColor ? `border-l-4 ${borderColor}` : "";
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${borderStyles} ${className}`;

  if (!animate) {
    const divProps = restProps as Omit<
      HTMLAttributes<HTMLDivElement>,
      keyof BaseCardProps
    >;
    return (
      <div className={combinedClassName} {...divProps}>
        {children}
      </div>
    );
  }

  const motionProps = restProps as Omit<
    HTMLMotionProps<"div">,
    keyof BaseCardProps
  >;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={combinedClassName}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

export default memo(Card);
