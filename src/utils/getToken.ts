import { cookies } from "next/headers";

const getToken = () => {
  const accessToken = cookies().get("accessToken")?.value;

  return accessToken;
};

export default getToken;
