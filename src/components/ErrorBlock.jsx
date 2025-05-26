export default function ErrorBlock({ title, message }) {
  return (
    <div className="bg-red-100 text-center text-2xl">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
