interface ButtonProps {
  type?: "button" | "submit";
  variant?: "primary" | "link";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button = ({
  type = "button",
  variant = "primary",
  size = "medium",
  fullWidth = true,
  disabled = false,
  onClick,
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

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
