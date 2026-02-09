import { Link } from "react-router-dom";

interface ButtonProps {
  type?: "button" | "submit";
  variant?: "primary" | "link";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  to?: string; // React Router 경로 (선택적)
  children: React.ReactNode;
}

const Button = ({
  type = "button",
  variant = "primary",
  size = "medium",
  fullWidth = true,
  disabled = false,
  onClick,
  to,
  children,
}: ButtonProps) => {
  const baseStyles = "transition-colors";

  const sizeStyles = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  const variants = {
    primary: `${fullWidth ? "w-full" : ""} ${sizeStyles[size]} rounded-lg font-medium text-white bg-[#00BCD4] hover:bg-[#0097A7] disabled:opacity-50 disabled:cursor-not-allowed`,
    link: "text-sm text-[#00BCD4] hover:text-[#0097A7] dark:text-[#00BCD4] dark:hover:text-[#4DD0E1]",
  };

  const buttonElement = (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {children}
    </button>
  );

  // to prop이 있으면 Link로 감싸기
  if (to && !disabled) {
    return (
      <Link to={to} className="inline-block">
        {buttonElement}
      </Link>
    );
  }

  return buttonElement;
};

export default Button;
