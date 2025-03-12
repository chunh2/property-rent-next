import SocketProvider from "../_context/SocketContext";
import NavBar from "./_components/NavBar";

type PropsType = {
  children: React.ReactNode;
};

function LayoutOwner({ children }: PropsType) {
  return (
    <>
      <SocketProvider>
        <NavBar />

        <>{children}</>
      </SocketProvider>
    </>
  );
}

export default LayoutOwner;
