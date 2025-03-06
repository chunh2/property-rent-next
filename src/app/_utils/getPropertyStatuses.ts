const getPropertyStatuses = async (): Promise<
  PropertyStatusType[] | undefined
> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/property-statuses`,
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

export default getPropertyStatuses;

export type PropertyStatusType = {
  id: number;
  name: string;
};
