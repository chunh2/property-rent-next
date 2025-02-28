const getPropertyTypes = async (): Promise<PropertyTypesType[] | undefined> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/property-types`,
      {
        next: {
          revalidate: 86400,
        },
      }
    );

    const response = await res.json();
    if (!res.ok) {
      const error = new Error(response.error || response.message);

      throw error;
    }

    const { data } = response;

    return data;
  } catch (e: any) {
    console.error(e.message);
  }
};

export type PropertyTypesType = {
  id: number;
  name: string;
};

export default getPropertyTypes;
