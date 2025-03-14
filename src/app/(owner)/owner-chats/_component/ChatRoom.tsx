import Link from "next/link";
import { ChatRoomType } from "../_utils/getChatRoomsByUserId";

type PropsType = {
  chatRoom: ChatRoomType;
};

function ChatRoom({ chatRoom }: PropsType) {
  const { id: chatRoomId } = chatRoom;

  return (
    <Link href={`/owner-chats/${chatRoomId}`} draggable={false}>
      <div className="bg-gray-200 py-10 px-5 m-1">
        <p>{chatRoom.chat_members[0].user.name}</p>
      </div>
    </Link>
  );
}

export default ChatRoom;
