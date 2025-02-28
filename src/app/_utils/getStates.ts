const getStates = async (): Promise<StateType[] | undefined> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/states`, {
      next: {
        revalidate: 86400,
      },
    });

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

export default getStates;

export type StateType = {
  id: number;
  name: string;
};
