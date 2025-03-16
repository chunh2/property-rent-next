import React from "react";
import SocketProvider from "../_context/SocketContext";
import NavBar from "./_component/NavBar";
import ReceiveMessageListener from "../_utilsComponents/ReceiveMessageListener";

function LayoutTenant({ children }: { children: React.ReactNode }) {
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

export default LayoutTenant;
