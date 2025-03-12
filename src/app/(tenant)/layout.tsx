import React from "react";
import SocketProvider from "../_context/SocketContext";
import NavBar from "./_component/NavBar";

function LayoutTenant({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SocketProvider>
        <NavBar />
        <>{children}</>
      </SocketProvider>
    </>
  );
}

export default LayoutTenant;
