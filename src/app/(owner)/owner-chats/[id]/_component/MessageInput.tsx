"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import sendMessage from "../_utils/sendMessage";
import { SocketContext } from "@/app/_context/SocketContext";
import { MessageType } from "../_utils/getMessages";

type PropsType = {
  setMessagesDisplay: React.Dispatch<React.SetStateAction<MessageType[]>>;
};

function MessageInput({ setMessagesDisplay }: PropsType) {
  const params = useParams();

  const socket = useContext(SocketContext);

  const [senderId, setSenderId] = useState(0);
  const [chatRoomId, setChatRoomId] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const senderId = sessionStorage.getItem("userId") || 0;
    const chatRoomId = params.id;

    setSenderId(Number(senderId));
    setChatRoomId(Number(chatRoomId));
  }, []);

  const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setMessage(value);
  };

  const clearMessage = () => {
    setMessage("");
  };

  const send = async () => {
    console.log(message, senderId, chatRoomId);

    // if empty, END
    if (!message?.trim()) return;

    const data = { senderId, chatRoomId, message_content: message };

    // send message
    if (socket) {
      await sendMessage(data, socket, setMessagesDisplay);
    } else {
      console.error("Socket not connected");
    }

    clearMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      send();
    }
  };

  return (
    <div className="flex">
      <Input
        value={message}
        onChange={(e) => handleChangeMessage(e)}
        placeholder="Enter message"
        className="bg-gray-200 rounded-r-none"
        onKeyDown={handleKeyDown}
      />

      <Button
        disabled={message.trim() ? false : true}
        onClick={send}
        className="rounded-l-none"
      >
        <Send />
      </Button>
    </div>
  );
}

export default MessageInput;
