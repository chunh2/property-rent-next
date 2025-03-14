import getToken from "@/utils/getToken";

const getChatRoomsByUserId = async () => {
  const token = getToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat-rooms`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const response = await res.json();

  return {
    message: response.message || "",
    data: response.data || [],
  };
};

export default getChatRoomsByUserId;

export type ChatRoomType = {
  id: number;
  name?: string;
  createdAt: string;

  chat_members: ChatMemberType[];
};

export type ChatMemberType = {
  id: number;
  chat_room_id: number;
  user_id: number;
  createdAt: string;

  user: UserType;
};

export type UserType = {
  user_id: number;
  name: string;
  email: string;
  phone?: string;
};
