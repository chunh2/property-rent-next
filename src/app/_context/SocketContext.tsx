"use client";

import { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | null>(null);

type PropsType = {
  children: React.ReactNode;
};

function SocketProvider({ children }: PropsType) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/get-cookies?name=accessToken`);

      const response = await res.json();

      const token = response.value;

      setToken(token);
    };

    fetchData();
  }, []);

  console.log(token);

  useEffect(() => {
    console.log("Token changes");

    // if no token, disconnect socket
    if (!token) {
      if (socket) {
        console.log("Disconnect socket");
        socket.disconnect();
        setSocket(null);
      }

      return;
    }

    console.log("Creating socket");
    const socketInstance = io(process.env.NEXT_PUBLIC_API_URL, {
      auth: {
        token,
      },
    });

    setSocket(socketInstance);

    return () => {
      console.log("Disconnecting socket");
      socketInstance.disconnect();
    };
  }, [token]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export default SocketProvider;
