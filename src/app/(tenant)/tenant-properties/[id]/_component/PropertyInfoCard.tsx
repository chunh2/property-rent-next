import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PropertyType from "../../_utils/PropertyType";
import formatValueFromDb from "@/app/_utils/formatValueFromDb";
import { Bath, Bed } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import formatDateTime from "@/app/_utils/formatDateTime";

type PropsType = {
  property: PropertyType;
};

function PropertyInfoCard({ property }: PropsType) {
  return (
    <>
      <Card>
        {/* Status */}
        <div
          className={`py-1 rounded-t-xl text-white ${
            property.property_status.name === "available"
              ? "bg-green-500"
              : "bg-orange-500"
          }`}
        >
          <p className="text-center">
            {formatValueFromDb(property.property_status.name)}
          </p>
        </div>

        <CardHeader className="px-3 sm:px-5 pt-2">
          {/* Title */}
          <h1 className="text-lg sm:text-xl lg:text-2xl">{property.title}</h1>

          {/* Property type */}
          <h2 className="text-gray-600">
            {formatValueFromDb(property.property_type.name)}
          </h2>

          {/* Bedroom, Bathroom */}
          <div className="flex gap-5">
            <div className="flex items-center gap-2">
              <Bed />
              <p>{property.bedroom}</p>
            </div>

            <div className="flex items-center gap-2">
              <Bath />
              <p>{property.bathroom}</p>
            </div>
          </div>

          {/* Price */}
          <div>
            <p className="font-bold text-xl">RM {property.price}</p>
          </div>
        </CardHeader>

        <CardContent className="px-3 sm:px-5">
          <Accordion type="multiple" defaultValue={["description", "location"]}>
            {/* Description */}
            <AccordionItem value="description">
              <AccordionTrigger>Description</AccordionTrigger>

              <AccordionContent>
                {property.description ? (
                  <h2>{property.description}</h2>
                ) : (
                  <div className="text-center text-gray-500">
                    No Description
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>

            {/* Location */}
            <AccordionItem value="location">
              <AccordionTrigger>Location</AccordionTrigger>

              <AccordionContent>
                <h2>{property.address}</h2>

                <h2>
                  {property.city}, {property.state.name}
                </h2>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>

        {/* Date Time */}
        <div className="p-2 border-t-2 border-gray-100">
          <p className="text-gray-500 text-sm text-end">
            Added at: {formatDateTime(property.createdAt)}
          </p>
        </div>
      </Card>
    </>
  );
}

export default PropertyInfoCard;
