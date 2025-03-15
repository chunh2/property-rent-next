import { Socket } from "socket.io-client";
import { toast } from "sonner";
import { MessageType } from "./getMessages";
import { v4 as uuidv4 } from "uuid";

const sendMessage = async (
  data: DataType,
  socket: Socket,
  setMessagesDisplay: React.Dispatch<React.SetStateAction<MessageType[]>>
) => {
  const { senderId, chatRoomId, message_content } = data;

  // handle optimistic UI

  const tempMessageId = uuidv4();

  const newMessage: MessageType = {
    id: tempMessageId,
    content: message_content,
    chat_room_id: chatRoomId,
    sender_id: senderId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),

    sender: {
      user_id: senderId,
      name: "",
      email: "",
      phone: "",
    },
  };

  setMessagesDisplay((prev) => [...(prev || []), newMessage]);

  //   Timer | if no response, considered as failed
  const timeout = setTimeout(() => {
    // rollback the optimistic UI
    setMessagesDisplay((prev) =>
      prev.filter((message) => message.id !== tempMessageId)
    );

    toast("Error", {
      description: "Failed to send message",
    });
  }, 5000);

  socket.emit(
    "sendMessage",
    { senderId, chatRoomId, message_content },
    (response: any) => {
      // clear timer, since there is response
      clearTimeout(timeout);

      console.log(response);

      //   if succeed
      if (response.success) {
        // toast("Success", {
        //   description: response.message,
        // });
      } else {
        // if backend responds NOT SUCCEED, rollback the optimistic UI
        setMessagesDisplay((prev) =>
          prev.filter((message) => message.id !== tempMessageId)
        );

        toast("Error", {
          description: "Failed to send message",
        });
      }
    }
  );
};

export default sendMessage;

type DataType = {
  senderId: number;
  chatRoomId: number;
  message_content: string;
};
