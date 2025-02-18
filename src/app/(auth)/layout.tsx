import NavBar from "./_components/NavBar";

type PropsType = {
  children: React.ReactNode;
};

function AuthLayout({ children }: PropsType) {
  return (
    <>
      <div className="my-5">
        <NavBar />

        <>{children}</>
      </div>
    </>
  );
}

export default AuthLayout;
