import SocketProvider from "../_context/SocketContext";
import ReceiveMessageListener from "../_utilsComponents/ReceiveMessageListener";
import NavBar from "./_components/NavBar";

type PropsType = {
  children: React.ReactNode;
};

function LayoutOwner({ children }: PropsType) {
  return (
    <>
      <SocketProvider>
        <ReceiveMessageListener>
          <NavBar />

          <>{children}</>
        </ReceiveMessageListener>
      </SocketProvider>
    </>
  );
}

export default LayoutOwner;
