interface FormInputProps {
  id: string;
  label: string;
  type?: "text" | "password" | "email" | "number";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const FormInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  disabled = false,
}: FormInputProps) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};

export default FormInput;
