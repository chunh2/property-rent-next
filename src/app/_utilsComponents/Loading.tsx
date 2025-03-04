function Loading() {
  return (
    <>
      <div className="flex justify-center items-center w-full h-full">
        <span className="animate-spin rounded-full w-8 h-8 border-gray-500 border-4 border-t-4"></span>
      </div>
      <p className="text-center font-bold text-lg">Loading...</p>
    </>
  );
}

export default Loading;
