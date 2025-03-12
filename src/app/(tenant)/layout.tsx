import React from "react";
import SocketProvider from "../_context/SocketContext";

function LayoutTenant({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SocketProvider>
        <>{children}</>
      </SocketProvider>
    </>
  );
}

export default LayoutTenant;
