import getToken from "@/utils/getToken";
import PropertyCard from "./_component/PropertyCard";
import Property from "./utils/PropertyType";
import Pagination from "./_component/Pagination";
import SearchParamsType from "./utils/SearchParamsType";
import { redirect } from "next/navigation";
import Filter from "./_component/Filter";
import CreateProperty from "./_component/CreateProperty";
import getPropertyStatuses, {
  PropertyStatusType,
} from "@/app/_utils/getPropertyStatuses";
import { Suspense } from "react";
import Loading from "@/app/_utilsComponents/Loading";

type PropertiesResponse = {
  message?: string;
  data?: Property[];
  error?: string;
  count: number;
};

async function OwnerProperties({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  // query parameter
  const page = Number(searchParams.page) || 1;
  const limit = 20;

  if (!searchParams.page) {
    redirect(`/owner-properties?page=${page}&limit=${limit}`);
  }

  // get existing property_status_id from query parameter
  const property_status_id = parseInt(searchParams.property_status_id || "0");

  const {
    message,
    data: properties,
    error,
    count,
  } = await getProperties(page, limit, property_status_id);

  const propertyStatuses: PropertyStatusType[] =
    (await getPropertyStatuses()) || [];

  return (
    <div className="mx-5 my-3 sm:mx-8 sm:my-4 md:mx-10 md:my-6 lg:mx-12 lg:my-8 xl:mx-14 xl:my-10 2xl:mx-16 2xl:my-12">
      <h1 className="text-center font-bold text-4xl">Properties</h1>

      <CreateProperty />

      <Filter propertyStatuses={propertyStatuses} />

      <Pagination count={count} />

      <Suspense fallback={<Loading />}>
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
      </Suspense>

      <Pagination count={count} />
    </div>
  );
}

export default OwnerProperties;

export const metadata = {
  title: "Your Properties",
};

const getProperties = async (
  page: number,
  limit: number,
  property_status_id: number
): Promise<PropertiesResponse> => {
  const token = getToken();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const url =
    `${API_URL}/api/owner/properties?page=${page}&limit=${limit}` +
    (property_status_id ? `&property_status_id=${property_status_id}` : "");

  const res = await fetch(url, {
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
