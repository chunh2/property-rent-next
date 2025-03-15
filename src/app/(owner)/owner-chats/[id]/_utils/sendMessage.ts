import { Socket } from "socket.io-client";
import { toast } from "sonner";

const sendMessage = async (data: DataType, socket: Socket) => {
  const { senderId, chatRoomId, message_content } = data;
  socket.emit(
    "sendMessage",
    { senderId, chatRoomId, message_content },
    (response: any) => {
      console.log(response);

      if (response.success) {
        toast("Success", {
          description: response.message,
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
