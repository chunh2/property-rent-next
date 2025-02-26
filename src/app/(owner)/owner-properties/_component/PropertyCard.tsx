import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Property from "../utils/PropertyType";

function PropertyCard({ property }: { property: Property }) {
  return (
    <>
      <Card>
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
