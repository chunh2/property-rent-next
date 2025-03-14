import { UserType } from "../../_utils/getChatRoomsByUserId";

type PropsType = {
  authId: number;
  sender: UserType;
  message: string;
};

function MessageBubble({ authId, sender, message }: PropsType) {
  const isSender = authId === sender?.user_id ? true : false;

  return (
    <div className={`my-8 flex ${isSender ? "justify-end" : "justify-start"}`}>
      <div
        className={`min-w-[10vw] max-w-[80vw] rounded-2xl px-4 py-3 shadow-md ${
          isSender
            ? "bg-green-500 rounded-br-none"
            : "bg-blue-100 rounded-bl-none"
        }`}
      >
        <p>{message}</p>
      </div>
    </div>
  );
}

export default MessageBubble;
