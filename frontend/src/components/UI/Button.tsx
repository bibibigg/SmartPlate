interface ButtonProps {
  type?: "button" | "submit";
  variant?: "primary" | "link";
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button = ({
  type = "button",
  variant = "primary",
  disabled = false,
  onClick,
  children,
}: ButtonProps) => {
  const baseStyles = "transition-colors";

  const variants = {
    primary:
      "w-full py-3 px-4 rounded-lg font-medium text-white bg-[#00BCD4] hover:bg-[#0097A7] disabled:opacity-50 disabled:cursor-not-allowed",
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
