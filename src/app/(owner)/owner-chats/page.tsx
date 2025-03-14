import { cookies } from "next/headers";
import Chats2 from "./page2";
import MessageBubble from "./_component/MessageBubble";

function Chats() {
  const cookiesInstance = cookies();
  const accessToken = cookiesInstance.get("accessToken")?.value;

  return (
    <>
      <div>Chats</div>
      <MessageBubble />
    </>
  );
}

export const metadata = {
  title: "Chats",
};

export default Chats;
