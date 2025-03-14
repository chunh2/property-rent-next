"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import deleteCookies from "../_utils/deleteCookies";
import { useRouter } from "next/navigation";

function Logout() {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const router = useRouter();

  const logout = () => {
    deleteCookies("accessToken");
    sessionStorage.clear();

    router.replace("/login");
  };

  return (
    <>
      <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Logout</Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout?</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to log out?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction asChild>
              <Button variant="destructive" onClick={logout}>
                Logout
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default Logout;
