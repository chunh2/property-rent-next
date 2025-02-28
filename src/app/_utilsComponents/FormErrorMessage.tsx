function FormErrorMessage({
  errorMessage,
}: {
  errorMessage: string | undefined;
}) {
  return (
    <div className="my-1 min-h-[25px]">
      <p className="text-red-500">{errorMessage}</p>
    </div>
  );
}

export default FormErrorMessage;
