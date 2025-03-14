import NavigateBack from "@/app/_utilsComponents/NavigateBack";
import MessagesSection from "./_component/MessagesSection";

function ChatRoom() {
  return (
    <>
      <div className="mx-2 sm:mx-20">
        <div className="fixed top-20 sm:top-28">
          <NavigateBack buttonVariant="ghost" path="/owner-chats" />
        </div>

        <MessagesSection />
      </div>
    </>
  );
}

export default ChatRoom;
