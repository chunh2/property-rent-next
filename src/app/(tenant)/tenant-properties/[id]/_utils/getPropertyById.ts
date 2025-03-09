import getToken from "@/utils/getToken";

const getPropertyById = async (id: string | number) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const url = `${API_URL}/api/tenant/properties/${id}`;

  const token = getToken();

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

  return {
    data: response.data || [],
    message: response.message || "",
    error: response.error || "",
  };
};

export default getPropertyById;
