"use client";

import { useState } from "react";
import MessageInput from "./MessageInput";
import MessagesSection from "./MessagesSection";
import { MessageType } from "../_utils/getMessages";

function MessageContainer() {
  const [messagesDisplay, setMessagesDisplay] = useState<MessageType[]>([]);

  return (
    <>
      <MessagesSection
        messagesDisplay={messagesDisplay}
        setMessagesDisplay={setMessagesDisplay}
      />

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] sm:w-[75%]">
        <MessageInput setMessagesDisplay={setMessagesDisplay} />
      </div>
    </>
  );
}

export default MessageContainer;
