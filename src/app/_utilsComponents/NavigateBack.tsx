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
  path?: string;
};

function NavigateBack({ buttonVariant = "outline", path }: PropsType) {
  const router = useRouter();

  const navigateTo = () => {
    router.push(path || "/");
  };

  const navigateBack = () => {
    router.back();
  };

  return (
    <>
      <Button
        onClick={path ? navigateTo : navigateBack}
        variant={buttonVariant}
      >
        <ChevronLeftIcon />
      </Button>
    </>
  );
}

export default NavigateBack;
