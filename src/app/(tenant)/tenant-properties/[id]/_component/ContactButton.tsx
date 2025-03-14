"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { MessageCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import addChatRoom from "../_utils/addChatRoom";
import { toast } from "sonner";

type PropsType = {
  userId: number;
};

function ContactButton({ userId }: PropsType) {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (userId: number) => addChatRoom(userId),
    onSuccess: (data) => {
      const { chatRoomId } = data;

      router.push(`/tenant-chats/${chatRoomId}`);
    },
    onError: (error) => {
      console.log(error);

      toast("Error", {
        description: error.message,
      });
    },
  });

  const handleOnClick = (userId: number) => {
    console.log(userId);

    mutation.mutate(userId);
  };

  return (
    <>
      <Button
        className="bg-green-500 hover:bg-green-500/90"
        onClick={() => handleOnClick(userId)}
      >
        <MessageCircleIcon /> Contact Now
      </Button>
    </>
  );
}

export default ContactButton;
