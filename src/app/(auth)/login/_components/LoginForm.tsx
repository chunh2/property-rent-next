"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .max(100, "Email cannot exceed 100 characters")
    .email("Invalid email format"),
  password: z.string().min(8, "At least 8 characters"),
  roleId: z.enum(["1", "2"], {
    errorMap: () => ({ message: "Role is required" }),
  }),
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
          <div className="my-3">
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

          <div className="my-3">
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

          <div className="my-3">
            {/* RoleId */}
            <Label>Login as</Label>

            <Controller
              name="roleId"
              control={control}
              defaultValue={undefined}
              render={({ field: { onChange, value } }) => (
                <RadioGroup
                  className="flex justify-start"
                  onValueChange={onChange}
                  value={value}
                >
                  <div className="flex items-center mt-1">
                    <RadioGroupItem value="1" id="1" className="mx-1" />
                    <Label htmlFor="1">Tenant</Label>
                  </div>

                  <div className="flex items-center">
                    <RadioGroupItem value="2" id="2" className="mx-1" />
                    <Label htmlFor="2">Owner</Label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>

          {/* RoleId error message */}
          <div className="mt-2 ml-2 h-6">
            <p className="text-red-500">{errors.roleId?.message || null}</p>
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
