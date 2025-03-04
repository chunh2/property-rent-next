import NavigateBack from "@/app/_utilsComponents/NavigateBack";
import getPropertyById from "./_utils/getPropertyById";

type PropsType = {
  params: {
    id: string | number;
  };
};

async function PropertyDetails({ params }: PropsType) {
  const { id } = params;

  const { data: property, message, error } = await getPropertyById(id);

  console.log(property);

  return (
    <>
      <NavigateBack />
      <div>PropertyDetails {id}</div>
    </>
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
