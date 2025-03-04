"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type PropsType = {
  buttonVariant?:
    | "default"
    | "outline"
    | "ghost"
    | "link"
    | "secondary"
    | "destructive";
};

function NavigateBack({ buttonVariant = "outline" }: PropsType) {
  const router = useRouter();

  const navigateBack = () => {
    router.back();
  };

  return (
    <>
      <Button onClick={navigateBack} variant={buttonVariant}>
        <ChevronLeftIcon />
      </Button>
    </>
  );
}

export default NavigateBack;
