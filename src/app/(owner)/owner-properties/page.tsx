import getToken from "@/utils/getToken";
import PropertyCard from "./_component/PropertyCard";
import Property from "./utils/PropertyType";

type PropertiesResponse = {
  message?: string;
  data?: Property[];
  error?: string;
};

async function OwnerProperties() {
  const { message, data: properties, error } = await getProperties();

  return (
    <div className="mx-5 my-3 sm:mx-8 sm:my-4 md:mx-10 md:my-6 lg:mx-12 lg:my-8 xl:mx-14 xl:my-10 2xl:mx-16 2xl:my-12">
      <h1 className="text-center font-bold text-4xl">Properties</h1>

      <div className="my-5">
        {error ? (
          <p className="text-gray-500 text-center text-2xl font-bold">
            {error}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-3 lg:gap-4 xl:gap-5 2xl:gap-6">
            {properties?.map((property: Property) => (
              <PropertyCard property={property} key={property.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OwnerProperties;

export const metadata = {
  title: "Your Properties",
};

const getProperties = async (): Promise<PropertiesResponse> => {
  const token = getToken();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${API_URL}/api/owner/properties`, {
    next: {
      revalidate: 60,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const response = await res.json();

  return response;
};
