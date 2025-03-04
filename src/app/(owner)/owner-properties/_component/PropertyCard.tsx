import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Property from "../utils/PropertyType";

function PropertyCard({ property }: { property: Property }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  return (
    <>
      <Card>
        <CardHeader className="w-full p-0">
          <div className="text-center">
            <img
              src={`${API_URL}/${property.property_images[0]?.image_path}`}
              alt={`${property.property_type.name} - ${property.title}`}
              className="w-full h-full object-cover rounded-t-lg"
            />
          </div>
        </CardHeader>

        <CardContent className="mt-4">
          <h6 className="text-lg">{property.title}</h6>
          <p className="font-bold text-sm">RM {property.price}</p>

          <div className="flex gap-5">
            <div className="flex">
              <p className="text-sm">{property.bedroom} Bedroom</p>
            </div>

            <div className="flex">
              <p className="text-sm">{property.bathroom} Bathroom</p>
            </div>
          </div>

          <div>
            <p className="">
              {property.city}, {property.state.name}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default PropertyCard;
