export default function ErrorBlock({ title, message }) {
  return (
    <div className="bg-[#f0d9e5] my-4 p-4 rounded text-[#890b35] flex gap-8 items-center text-left">
      <div className="text-3xl w-12 h-12 text-white bg-[#890b35] rounded-full flex justify-center items-center">
        !
      </div>
      <div>
        <h2 className="text-xl m-0 text-inherit">{title}</h2>
        <p className="m-0">{message}</p>
      </div>
    </div>
  );
}
