import ChatRooms from "./_component/ChatRooms";

function Chats() {
  return (
    <>
      <h1 className="font-bold text-center text-4xl">Chats</h1>

      <ChatRooms />
    </>
  );
}

export const metadata = {
  title: "Chats",
};

export default Chats;
