import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PropertyType from "../../_utils/PropertyType";

type PropsType = {
  property: PropertyType;
};

function PropertyImages({ property }: PropsType) {
  return (
    <div className="flex justify-center items-center my-5">
      <Carousel className="max-h-screen w-full sm:w-5/6 md:w-4/5">
        <CarouselContent className="w-full md:w-1/2">
          {property.property_images?.map((propertyImage) => (
            <CarouselItem
              key={propertyImage.id}
              className="flex justify-center md:max-h-[40vh]"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/${propertyImage.image_path}`}
                alt={`${property.title}`}
                className="max-h-full w-auto object-contain"
                draggable={false}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}

export default PropertyImages;
