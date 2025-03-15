import NavigateBack from "@/app/_utilsComponents/NavigateBack";
import MessagesSection from "./_component/MessagesSection";
import MessageInput from "./_component/MessageInput";

function ChatRoom() {
  return (
    <>
      <div className="mx-2 sm:mx-20">
        <div className="fixed top-20 sm:top-28">
          <NavigateBack buttonVariant="ghost" path="/owner-chats" />
        </div>

        <MessagesSection />

        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] sm:w-[75%]">
          <MessageInput />
        </div>
      </div>
    </>
  );
}

export default ChatRoom;
