interface FormErrorProps {
  message: string;
}

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="rounded-lg bg-red-100 dark:bg-red-900/30 p-3">
      <p className="text-sm text-red-600 dark:text-red-400">{message}</p>
    </div>
  );
};

export default FormError;
