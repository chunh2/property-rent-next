import NavigateBack from "@/app/_utilsComponents/NavigateBack";
import getPropertyById from "./_utils/getPropertyById";
import EditForm from "./_component/EditForm";
import Property from "../utils/PropertyType";
import CreatedDateTimeTooltip from "./_component/CreatedDateTimeTooltip";
import getStates, { StateType } from "@/app/_utils/getStates";
import getPropertyTypes, {
  PropertyTypesType,
} from "@/app/_utils/getPropertyTypes";
import getPropertyStatuses, {
  PropertyStatusType,
} from "@/app/_utils/getPropertyStatuses";
import formatDateTime from "@/app/_utils/formatDateTime";

type PropsType = {
  params: {
    id: string | number;
  };
};

type Response = {
  data: Property;
  message: string | undefined;
  error: string | undefined;
};

async function PropertyDetails({ params }: PropsType) {
  const { id } = params;

  const {
    data: property,
    message,
    error,
  }: Response = await getPropertyById(id);

  const states: StateType[] = (await getStates()) || [];

  const propertyTypes: PropertyTypesType[] = (await getPropertyTypes()) || [];

  const propertyStatuses: PropertyStatusType[] =
    (await getPropertyStatuses()) || [];

  console.log(propertyStatuses);

  return (
    <div className="mx-4 my-20 sm:mx-20">
      <div className="flex justify-start">
        <NavigateBack />
      </div>

      {/* created date time */}
      <div className="flex justify-end">
        <p className="text-gray-500">
          Added at {formatDateTime(property.createdAt)}
        </p>
      </div>

      <h1 className="text-center font-bold text-3xl">{property.title}</h1>

      {/* Form for editing */}
      <EditForm
        property={property}
        states={states}
        propertyTypes={propertyTypes}
        propertyStatuses={propertyStatuses}
      />
    </div>
  );
}

export const generateMetadata = async ({ params }: PropsType) => {
  const { id } = params;

  const { data: property } = await getPropertyById(id);

  return {
    title: property?.title || "Loading...",
  };
};

export default PropertyDetails;
