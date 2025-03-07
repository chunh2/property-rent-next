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

type PropsType = {
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  id: number;
  deleteProperty: (id: number) => void;
};

function DeleteAlertDialog({
  deleteDialogOpen,
  setDeleteDialogOpen,
  id,
  deleteProperty,
}: PropsType) {
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
              <Button variant="destructive">Delete</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default DeleteAlertDialog;
