"use client";

import { useContext, useEffect } from "react";
import { SocketContext } from "../_context/SocketContext";
import { MessageType } from "../(owner)/owner-chats/[id]/_utils/getMessages";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

function ReceiveMessageListener({ children }: { children: React.ReactNode }) {
  const socket = useContext(SocketContext);

  const pathname = usePathname();

  useEffect(() => {
    console.log("Socket", socket);

    const handleReceiveMessage = ({
      chatRoomId: receivingChatRoomId,
      message,
    }: {
      chatRoomId: number;
      message: MessageType;
    }) => {
      // if current chat room is NOT the receiving chat room
      if (
        !(
          pathname.startsWith(`/tenant-chats/${receivingChatRoomId}`) ||
          pathname.startsWith(`/owner-chats/${receivingChatRoomId}`)
        )
      ) {
        toast(message.sender.name, {
          description: message.content,
        });
      }
    };

    socket?.on("receiveMessage", handleReceiveMessage);

    return () => {
      console.log("Cleaning up receiveMessage socket listener");

      socket?.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket, pathname]);

  return <>{children}</>;
}

export default ReceiveMessageListener;
