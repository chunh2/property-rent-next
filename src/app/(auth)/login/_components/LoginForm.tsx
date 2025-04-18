"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { RoleType } from "@/app/_utils/getRoles";
import formatValueFromDb from "@/app/_utils/formatValueFromDb";
import { useContext } from "react";
import { RolesContext } from "@/app/_context/RolesContext";

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

  const roles: RoleType[] | null = useContext(RolesContext);

  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const mutation = useMutation({
    mutationFn: async (data: LoginFormType) => {
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error);
      }

      return res.json();
    },
    onSuccess: (data) => {
      const {
        roleId,
        user: { user_id },
      } = data;

      sessionStorage.setItem("userId", user_id);

      if (roleId === "1") {
        router.replace("/tenant-properties");
      } else if (roleId === "2") {
        router.replace("/owner-properties");
      }
    },
    onError: (error) => {
      console.log("Error");
      toast("Error", {
        description: error.message,
      });
    },
  });

  const handleLogin = (data: LoginFormType) => {
    mutation.mutate(data);
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
                  {roles?.map((role) => (
                    <div className="flex items-center mt-1" key={role.role_id}>
                      <RadioGroupItem
                        value={role.role_id.toString()}
                        id={role.role_id.toString()}
                        className="mx-1"
                      />
                      <Label htmlFor={role.role_id.toString()}>
                        {formatValueFromDb(role.role_name)}
                      </Label>
                    </div>
                  ))}
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
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Logging in..." : "Login"}
          </Button>
        </CardFooter>
      </form>
    </>
  );
}

export default LoginForm;
