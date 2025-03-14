const getMessages = async (chatRoomId: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/messages/${chatRoomId}`,
    {
      credentials: "include",
    }
  );

  const response = await res.json();

  return response;
};

export default getMessages;

export type MessageType = {
  id: number;
  content: string;
  chat_room_id: number;
  sender_id: number;
  createdAt: string;
  updatedAt: string;

  sender: SenderType;
};

export type SenderType = {
  user_id: number;
  name: string;
  email: string;
  phone?: string;
};
