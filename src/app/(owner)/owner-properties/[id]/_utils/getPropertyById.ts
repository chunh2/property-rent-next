import getToken from "@/utils/getToken";

const getPropertyById = async (id: string | number) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const url = `${API_URL}/api/owner/properties/${id}`;

  const token = getToken();

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const response = await res.json();

  console.log(response);

  return response;
};

export default getPropertyById;
