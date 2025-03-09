import { redirect } from "next/navigation";
import getProperties from "./_utils/getProperties";
import PropertyCard from "./_component/PropertyCard";
import PropertyType from "./_utils/PropertyType";
import Search from "./_component/Search";
import Pagination from "./_component/Pagination";
import getStates, { StateType } from "@/app/_utils/getStates";
import FilterSection from "./_component/FilterSection";
import getPropertyTypes, {
  PropertyTypesType,
} from "@/app/_utils/getPropertyTypes";
import { Suspense } from "react";
import Loading from "@/app/_utilsComponents/Loading";

async function TenantProperties({
  searchParams,
}: {
  searchParams: Record<string, string | string[]>;
}) {
  // default
  const page = "1";
  const limit = "20";

  if (!searchParams.page || !searchParams.limit) {
    redirect(`/tenant-properties?page=${page}&limit=${limit}`);
    return;
  }

  const query = new URLSearchParams();

  // appending searchParams to URLSearchParams (different types)
  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => query.append(key, v));
    } else {
      query.append(key, value);
    }
  });

  const {
    message,
    count,
    data: properties,
    error,
  }: Response = await getProperties(query);

  const states: StateType[] = (await getStates()) || [];

  const propertyTypes: PropertyTypesType[] = (await getPropertyTypes()) || [];

  return (
    <>
      <div className="mx-5 my-3 sm:mx-8 sm:my-4 md:mx-10 md:my-6 lg:mx-12 lg:my-8 xl:mx-14 xl:my-10 2xl:mx-16 2xl:my-12">
        <h1 className="text-center font-bold text-4xl">Properties</h1>

        <div className="my-5 flex justify-center">
          <div className="w-full sm:w-3/5">
            <Search />
          </div>
        </div>

        <div className="flex justify-center my-5">
          <div className="w-full sm:w-3/5 lg:w-1/2 xl:w-2/5">
            <FilterSection states={states} propertyTypes={propertyTypes} />
          </div>
        </div>

        <Pagination count={count} />

        <Suspense fallback={<Loading />}>
          <div className="my-5">
            {properties?.length ?? 0 > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-3 lg:gap-4 xl:gap-5 2xl:gap-6">
                {properties?.map((property: PropertyType) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center text-2xl font-bold">
                {error || "Properties not found"}
              </p>
            )}
          </div>
        </Suspense>
      </div>
    </>
  );
}

export default TenantProperties;

export const metadata = {
  title: "Properties | Tenant",
};

type Response = {
  message: string;
  data: PropertyType[];
  count: number;
  error: string;
};
