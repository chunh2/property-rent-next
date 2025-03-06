import { Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

type PropertyImage = {
  id: number;
  image_path: string;
};

type PropsType = {
  propertyImages: PropertyImage[];
  deletePropertyImage: (id: number) => void;
  propertyImagesIdsDELETE: string[];
};

function PropertyImagesPreviewFileFormat({
  propertyImages,
  deletePropertyImage,
  propertyImagesIdsDELETE, //delete list
}: PropsType) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  //   filter image to be rendered
  //   image added to delete list is not rendered
  const propertyImagesToBeRendered = propertyImages?.filter(
    (propertyImage: PropertyImage) =>
      !propertyImagesIdsDELETE.some(
        (propertyImageIdDELETE) =>
          propertyImage.id === parseInt(propertyImageIdDELETE)
      )
  );

  console.log(propertyImagesToBeRendered);

  return (
    <>
      <div className="grid grid-cols-5 gap-1">
        {propertyImagesToBeRendered?.length <= 0 ? (
          <p className="my-3 text-gray-500">No Image</p>
        ) : (
          propertyImagesToBeRendered.map((propertyImage: PropertyImage) => (
            <div
              key={propertyImage.id}
              className="flex justify-center border border-black relative"
            >
              <img
                src={`${API_URL}/${propertyImage.image_path}`}
                alt={propertyImage.image_path}
                className="object-contain w-20 h-20"
              />
              <Button
                className={`absolute top-0 right-0 opacity-0 hover:opacity-100 transition-opacity rounded-none`}
                size="icon"
                variant="destructive"
                type="button"
                onClick={() => deletePropertyImage(propertyImage.id)}
              >
                <Minus />
              </Button>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default PropertyImagesPreviewFileFormat;
