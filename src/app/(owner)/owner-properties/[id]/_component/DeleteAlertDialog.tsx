import revalidateRoute from "@/app/_utils/revalidateRoute";
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
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type PropsType = {
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  id: number;
};

function DeleteAlertDialog({
  deleteDialogOpen,
  setDeleteDialogOpen,
  id,
}: PropsType) {
  const router = useRouter();

  const deleteProperty = (id: number) => {
    console.log(id);
    mutation.mutate(id);
  };

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      const url = `${API_URL}/api/owner/properties/${id}`;

      const res = await fetch(url, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });

      const response = await res.json();

      if (!res.ok) {
        throw new Error(
          response.error || response.message || "Something went wrong"
        );
      }

      return response;
    },
    onSuccess: (response) => {
      const { message } = response;

      toast("Success", {
        description: message || "Operation performed successfully",
      });

      revalidateRoute("/owner-properties");

      router.replace("/owner-properties");
    },
    onError: (error) => {
      console.error(error);

      toast("Error", {
        description: error.message,
      });
    },
  });

  return (
    <>
      <AlertDialog
        defaultOpen={false}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      >
        <AlertDialogTrigger asChild>
          <Button type="button" variant="destructive" className="mt-20 sm:m-1">
            Delete
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure to delete this property?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. The data will permanently be
              deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction onClick={() => deleteProperty(id)} asChild>
              <Button variant="destructive" disabled={mutation.isPending}>
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default DeleteAlertDialog;
