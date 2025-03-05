"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { RoleType } from "@/app/_utils/getRoles";
import formatValueFromDb from "@/app/_utils/formatValueFromDb";

const RegisterFormSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(30, "Name cannot exceed 30 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .max(100, "Email cannot exceed 100 characters")
      .email("Invalid email format"),
    password: z
      .string()
      .max(255, "Password cannot exceed 255 characters")
      .refine((data) => data.length > 0, { message: "Password is required" })
      .refine((data) => data.length >= 8, { message: "At least 8 characters" }),
    confirmation_password: z
      .string()
      .min(1, "Password confirmation is required"),
    role_ids: z
      .array(z.enum(["1", "2"]))
      .min(1, "At least one role is required"),
  })
  .refine((data) => data.password === data.confirmation_password, {
    message: "Passwords do not match",
    path: ["confirmation_password"],
  });

type RegisterFormType = z.infer<typeof RegisterFormSchema>;

type PropsType = {
  roles: RoleType[];
};

function RegisterForm({ roles }: PropsType) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterFormSchema),
  });

  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const mutation = useMutation({
    mutationFn: async (data: RegisterFormType) => {
      const res = await fetch(`${API_URL}/api/register`, {
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
      toast("Registration Successful", {
        description: "Your account has been created successfully",
      });
      router.replace("/login");
    },
    onError: (error) => {
      toast("Error", {
        description: error.message,
      });
    },
  });

  const handleRegister = (data: RegisterFormType) => {
    mutation.mutate(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleRegister)}>
        <CardContent>
          <div className="my-5">
            {/* Name */}
            <Label htmlFor="name">Name</Label>

            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input {...field} id="name" placeholder="Name" />
              )}
            />

            {/* Name error message */}
            <div className="mt-2 ml-2 h-3">
              <p className="text-red-500">{errors.name?.message || null}</p>
            </div>
          </div>

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
            <div className="mt-2 ml-2 h-3">
              <p className="text-red-500">{errors.email?.message || null}</p>
            </div>
          </div>

          <div className="my-5">
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
                  placeholder="Enter password"
                  type="password"
                />
              )}
            />

            {/* Password error message */}
            <div className="mt-2 ml-2 h-3">
              <p className="text-red-500">{errors.password?.message || null}</p>
            </div>
          </div>

          <div className="my-5">
            {/* Confirmation Password */}
            <Label htmlFor="confirmation_password">Confirmation Password</Label>

            <Controller
              name="confirmation_password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  id="confirmation_password"
                  placeholder="Enter password again"
                  type="password"
                />
              )}
            />

            {/* Confirmation Password error message */}
            <div className="mt-2 ml-2 h-3">
              <p className="text-red-500">
                {errors.confirmation_password?.message || null}
              </p>
            </div>
          </div>

          <div className="my-5">
            {/* Role_ids */}
            <Label>Register as</Label>

            <Controller
              name="role_ids"
              control={control}
              defaultValue={[]}
              render={({ field: { value = [], onChange } }) => (
                <>
                  {roles.map((role) => (
                    <div key={role.role_id} className="flex items-center my-1">
                      <Checkbox
                        id={role.role_id.toString()}
                        value={role.role_id.toString()}
                        checked={value.includes(role.role_id.toString())}
                        onCheckedChange={(checked) =>
                          onChange(
                            checked
                              ? [...value, role.role_id.toString()]
                              : value.filter(
                                  (v) => v !== role.role_id.toString()
                                )
                          )
                        }
                      />
                      <Label htmlFor={role.role_id.toString()} className="mx-1">
                        {formatValueFromDb(role.role_name)}
                      </Label>
                    </div>
                  ))}
                </>
              )}
            />

            {/* Role_ids error message */}
            <div className="mt-2 ml-2 h-3">
              <p className="text-red-500">{errors.role_ids?.message || null}</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Registering..." : "Register"}
          </Button>
        </CardFooter>
      </form>
    </>
  );
}

export default RegisterForm;
