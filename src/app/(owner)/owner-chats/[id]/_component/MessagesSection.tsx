"use client";

import { useQuery } from "@tanstack/react-query";
import MessageBubble from "./MessageBubble";
import getMessages, { MessageType } from "../_utils/getMessages";
import { useParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "@/app/_context/SocketContext";

type PropsType = {
  messagesDisplay: MessageType[];
  setMessagesDisplay: React.Dispatch<React.SetStateAction<MessageType[]>>;
};

function MessagesSection({ messagesDisplay, setMessagesDisplay }: PropsType) {
  const params = useParams();

  const socket = useContext(SocketContext);

  const [userId, setUserId] = useState<number>(0);

  //   store userId in session
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");

    setUserId(Number(userId));
  }, []);

  const chatRoomId = Number(params.id);

  const { data, isLoading, error } = useQuery({
    queryKey: ["messages"],
    queryFn: () => getMessages(chatRoomId),
    gcTime: 0,
    staleTime: 0,
    refetchOnMount: true,
  });

  const messages: MessageType[] = data?.data || [];

  useEffect(() => {
    if (messages?.length > 0) {
      setMessagesDisplay(messages);
    }
  }, [messages]);

  const bottomOfPageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomOfPageRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messagesDisplay]);

  // receiving message
  useEffect(() => {
    console.log("Socket", socket);
    const handleReceiveMessage = ({
      chatRoomId: receivingChatRoomId,
      message,
    }: {
      chatRoomId: number;
      message: MessageType;
    }) => {
      console.log(message);

      // if current chat room is the receiving chat room
      if (receivingChatRoomId === chatRoomId) {
        setMessagesDisplay((prev) => [...prev, message]);
      }
    };

    socket?.on("receiveMessage", handleReceiveMessage);

    return () => {
      console.log("Cleaning up receiveMessage socket listener");

      socket?.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket, chatRoomId]);

  return (
    <div className="mx-2 sm:mx-5 md:mx-10 lg:mx-16 xl:mx-20 2xl:mx-24 my-20">
      {messagesDisplay?.map((message: MessageType) => (
        <MessageBubble
          key={message.id}
          authId={userId}
          sender={message.sender}
          message={message.content}
        />
      ))}

      <div ref={bottomOfPageRef} />
    </div>
  );
}

export default MessagesSection;
