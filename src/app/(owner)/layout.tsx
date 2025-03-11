import NavBar from "./_components/NavBar";

type PropsType = {
  children: React.ReactNode;
};

function LayoutOwner({ children }: PropsType) {
  return (
    <>
      <NavBar />

      <>{children}</>
    </>
  );
}

export default LayoutOwner;
