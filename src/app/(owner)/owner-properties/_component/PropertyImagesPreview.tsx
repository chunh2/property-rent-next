import { Minus } from "lucide-react";
import AddImageIcon from "./AddImageIcon";
import { Button } from "@/components/ui/button";
import PropertyImageType from "../utils/PropertyImageType";

type PropsType = {
  propertyImages: PropertyImageType[];
  removePropertyImage: (id: string) => void;
};

function PropertyImagesPreview({
  propertyImages,
  removePropertyImage,
}: PropsType) {
  return (
    <>
      <div className="grid grid-cols-5 gap-1">
        {propertyImages?.map((propertyImage: any) => (
          <div
            key={propertyImage.id}
            className="flex justify-center border border-black relative"
          >
            <img
              src={URL.createObjectURL(propertyImage.property_image)}
              alt={propertyImage.property_image.name}
              className="object-contain w-20 h-20"
            />
            <Button
              className={`absolute top-0 right-0 opacity-0 hover:opacity-100 transition-opacity rounded-none`}
              size="icon"
              variant="destructive"
              type="button"
              onClick={() => removePropertyImage(propertyImage.id)}
            >
              <Minus />
            </Button>
          </div>
        ))}
        <div className={`${propertyImages?.length >= 10 ? "hidden" : "block"}`}>
          <AddImageIcon />
        </div>
      </div>
    </>
  );
}

export default PropertyImagesPreview;
