import NavigateBack from "@/app/_utilsComponents/NavigateBack";
import PropertyType from "../_utils/PropertyType";
import getPropertyById from "./_utils/getPropertyById";
import PropertyInfoCard from "./_component/PropertyInfoCard";
import OwnerInfoCard from "./_component/OwnerInfoCard";
import PropertyImages from "./_component/PropertyImages";
import formatValueFromDb from "@/app/_utils/formatValueFromDb";

type PropsType = {
  params: {
    id: string;
  };
};

type Response = {
  data: PropertyType;
  message: string;
  error: string;
};

async function PropertyDetails({ params }: PropsType) {
  const { id } = params;

  const {
    data: property,
    message,
    error,
  }: Response = await getPropertyById(id);

  return (
    <div className="sm:m-20">
      <div className="flex justify-start">
        <NavigateBack buttonVariant="ghost" />
      </div>

      {/* Images */}
      <PropertyImages property={property} />

      <div className="grid gap-5 sm:grid-cols-6 items-start">
        {/* Property Info */}
        <div className="sm:col-span-6 lg:col-span-3 xl:col-span-4">
          <PropertyInfoCard property={property} />
        </div>

        {/* Owner Info */}
        <div className="sm:col-span-6 lg:col-span-3 xl:col-span-2">
          <OwnerInfoCard property={property} />
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;

export const generateMetadata = async ({
  params: { id },
}: {
  params: {
    id: string;
  };
}) => {
  const { data: property }: Response = await getPropertyById(id);

  const {
    title,
    property_type: { name },
  } = property;

  const metadata = {
    title: `${title} | ${formatValueFromDb(name)}` || "Loading...",
  };

  return metadata;
};
