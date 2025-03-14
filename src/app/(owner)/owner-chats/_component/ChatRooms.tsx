import getChatRoomsByUserId, {
  ChatRoomType,
} from "../_utils/getChatRoomsByUserId";
import ChatRoom from "./ChatRoom";

async function ChatRooms() {
  const { data: chatRooms } = await getChatRoomsByUserId();

  console.log(chatRooms);

  if (chatRooms?.length > 0) {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:mx-10 lg:mx-24 xl:mx-28 2xl:mx-32 md:gap-5 lg:gap-8 2xl:gap-12 my-5 sm:my-10">
          {chatRooms.map((chatRoom: ChatRoomType) => (
            <ChatRoom
              key={chatRoom.chat_members[0].user_id}
              chatRoom={chatRoom}
            />
          ))}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="my-10">
          <h2 className="text-center text-gray-500 text-2xl font-bold">
            No Chats
          </h2>
        </div>
      </>
    );
  }
}

export default ChatRooms;
