import NavigateBack from "@/app/_utilsComponents/NavigateBack";
import MessageContainer from "./_component/MessageContainer";

function ChatRoom() {
  return (
    <>
      <div className="mx-2 sm:mx-20">
        <div className="fixed top-20 sm:top-28">
          <NavigateBack buttonVariant="ghost" path="/tenant-chats" />
        </div>

        <MessageContainer />
      </div>
    </>
  );
}

export const metadata = {
  title: "Private Chat",
};

export default ChatRoom;
