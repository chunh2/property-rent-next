"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .max(100, "Email cannot exceed 100 characters")
    .email("Invalid email format"),
  password: z.string().min(8, "At least 8 characters"),
});

type LoginFormType = z.infer<typeof LoginFormSchema>;

function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginFormSchema),
  });

  const handleLogin = (data: LoginFormType) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)}>
        <CardContent className="my-5">
          <div className="my-5">
            {/* Email */}
            <Label htmlFor="email">Email</Label>

            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input {...field} id="email" placeholder="email@example.com" />
              )}
            />

            {/* Email error message */}
            <div className="mt-2 ml-2 h-6">
              <p className="text-red-500 ">{errors.email?.message || null}</p>
            </div>
          </div>

          <div>
            {/* Password */}
            <Label htmlFor="password">Password</Label>

            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  id="password"
                  placeholder="Password"
                  type="password"
                />
              )}
            />

            {/* Password error message */}
            <div className="mt-2 ml-2 h-6">
              <p className="text-red-500">{errors.password?.message || null}</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button type="submit">Login</Button>
        </CardFooter>
      </form>
    </>
  );
}

export default LoginForm;
