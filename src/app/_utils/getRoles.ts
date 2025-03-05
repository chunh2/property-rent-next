const getRoles = async (): Promise<RoleType[] | undefined> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const url = `${API_URL}/api/roles`;

  try {
    const res = await fetch(url, {
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

export default getRoles;

export type RoleType = {
  role_id: number;
  role_name: string;
};
