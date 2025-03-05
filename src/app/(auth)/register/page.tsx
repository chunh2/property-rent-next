import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "./_components/RegisterForm";
import getRoles, { RoleType } from "@/app/_utils/getRoles";

async function Register() {
  const roles: RoleType[] = (await getRoles()) || [];

  return (
    <>
      <div className="flex justify-center">
        <Card className="w-full h-auto mx-5 sm:w-4/5 sm:h-auto md:w-3/4 lg:w-3/5 xl:w-1/2 2xl:w-1/3 rounded-t-none">
          <CardHeader>
            <CardTitle>
              <h1 className="text-center text-4xl">Register</h1>
            </CardTitle>
          </CardHeader>

          <RegisterForm roles={roles} />
        </Card>
      </div>
    </>
  );
}

export default Register;

export const metadata = {
  title: "Register",
};
