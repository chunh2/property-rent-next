import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "./_components/LoginForm";

function Login() {
  return (
    <>
      <div className="flex justify-center">
        <Card className="w-full h-auto mx-5 sm:w-4/5 sm:h-auto md:w-3/4 lg:w-3/5 xl:w-1/2 2xl:w-1/3">
          <CardHeader>
            <CardTitle>
              <h1 className="text-center text-4xl">Login</h1>
            </CardTitle>
          </CardHeader>

          <LoginForm />
        </Card>
      </div>
    </>
  );
}

export default Login;

export const metadata = {
  title: "Login",
};
