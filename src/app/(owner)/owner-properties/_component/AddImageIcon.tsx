import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

function AddImageIcon() {
  return (
    <>
      <Label
        htmlFor="property_images"
        className="flex justify-center items-center bg-gray-300 text-gray-600 w-20 h-20 cursor-pointer"
      >
        <Plus />
      </Label>
    </>
  );
}

export default AddImageIcon;
