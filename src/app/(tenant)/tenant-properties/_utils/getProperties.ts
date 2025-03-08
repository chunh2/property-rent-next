const getProperties = async (query: URLSearchParams) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const url = `${API_URL}/api/tenant/properties?${query.toString()}`;

  const res = await fetch(url, {
    next: {
      revalidate: 60,
    },
    headers: {
      Accept: "application/json",
    },
  });

  const response = await res.json();

  return {
    message: response.message || "",
    data: response.data || [],
    count: response.count || 0,
    error: response.error || "",
  };
};

export default getProperties;
