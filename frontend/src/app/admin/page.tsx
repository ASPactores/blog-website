"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z
  .object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

export default function Admin() {
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onLoginSubmit = (data: LoginFormValues) => {
    console.log("Login Data:", data);
  };

  const onSignupSubmit = (data: SignupFormValues) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...signupData } = data;
    console.log("Signup Data:", signupData);
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen gap-4">
      <Card className="sm:w-[500px] w-[90%] shadow-lg px-4 py-10 bg-white rounded-lg">
        <CardHeader>
          <CardTitle className="text-center">Admin Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-4">
              <TabsTrigger value="login" className="w-full">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="w-full">
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form
                onSubmit={handleLoginSubmit(onLoginSubmit)}
                className="space-y-4"
                noValidate
              >
                <div className="flex flex-col space-y-5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    aria-invalid={!!loginErrors.email}
                    {...loginRegister("email")}
                  />
                  {loginErrors.email && (
                    <p className="text-red-500 text-sm">
                      {loginErrors.email.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    aria-invalid={!!loginErrors.password}
                    {...loginRegister("password")}
                  />
                  {loginErrors.password && (
                    <p className="text-red-500 text-sm">
                      {loginErrors.password.message}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full mt-5">
                  Login
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form
                onSubmit={handleSignupSubmit(onSignupSubmit)}
                className="space-y-4"
                noValidate
              >
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    type="text"
                    placeholder="Enter your first name"
                    aria-invalid={!!signupErrors.first_name}
                    {...signupRegister("first_name")}
                  />
                  {signupErrors.first_name && (
                    <p className="text-red-500 text-sm">
                      {signupErrors.first_name.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    type="text"
                    placeholder="Enter your last name"
                    aria-invalid={!!signupErrors.last_name}
                    {...signupRegister("last_name")}
                  />
                  {signupErrors.last_name && (
                    <p className="text-red-500 text-sm">
                      {signupErrors.last_name.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    aria-invalid={!!signupErrors.email}
                    {...signupRegister("email")}
                  />
                  {signupErrors.email && (
                    <p className="text-red-500 text-sm">
                      {signupErrors.email.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    aria-invalid={!!signupErrors.password}
                    {...signupRegister("password")}
                  />
                  {signupErrors.password && (
                    <p className="text-red-500 text-sm">
                      {signupErrors.password.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    aria-invalid={!!signupErrors.confirmPassword}
                    {...signupRegister("confirmPassword")}
                  />
                  {signupErrors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {signupErrors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <Button type="submit" className="w-full mt-5">
                  Sign Up
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}
