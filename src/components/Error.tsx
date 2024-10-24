const Error = ({ message }: { message: string }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="min-w-[50%] px-4 py-3 mt-3 mb-2 text-center text-white rounded-3xl bg-red-500 capitalize">
        {message}
      </div>
    </div>
  );
};

export default Error;
