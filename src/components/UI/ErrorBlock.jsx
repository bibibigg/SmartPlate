export default function ErrorBlock({ title, message }) {
  return (
    <div>
      <div className="bg-white p-4 my-4 rounded flex text-red-900 gap-8 items-center text-left ">
        !
      </div>
      <div className="text-3xl w-12 h-12 text-white bg-red-900 flex justify-center items-center">
        <h2 className="text-xl m-0 text-inherit">{title}</h2>
        <p className="m-0">{message}</p>
      </div>
    </div>
  );
}
