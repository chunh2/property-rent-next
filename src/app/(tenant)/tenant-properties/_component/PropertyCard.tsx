import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PropertyType from "../_utils/PropertyType";
import Image from "next/image";
import Link from "next/link";

async function PropertyCard({ property }: { property: PropertyType }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const { id } = property;

  return (
    <>
      <Link href={`/tenant-properties/${id}`} draggable={false}>
        <Card>
          <CardHeader className="w-full p-0">
            <div className="text-center">
              <Image
                src={`${API_URL}/${property.property_images[0]?.image_path}`}
                alt={`${property.property_type.name} - ${property.title}`}
                width={800}
                height={600}
                draggable={false}
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
      </Link>
    </>
  );
}

export default PropertyCard;
