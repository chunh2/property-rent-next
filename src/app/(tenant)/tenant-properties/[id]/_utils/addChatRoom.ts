const addChatRoom = async (userId: number) => {
  const reqBody = {
    user_id: userId,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat-rooms`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(reqBody),
  });

  const response = await res.json();

  console.log(response);

  return {
    chatRoomId: response.data?.chatRoomId || 0,
  };
};

export default addChatRoom;
