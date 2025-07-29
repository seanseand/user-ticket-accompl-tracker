import React, { useState } from "react";
import { GalleryVerticalEnd } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

function CreateAccountForm({ className, ...props }) {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
   e.preventDefault();

 setTimeout(() => {
    alert("User created successfully!");
    setFormData({
        username: "",
        first_name: "",
        last_name: "",
        password: "",
      });
    }, 500);
  };

  return (
    <form
      className={cn("flex flex-col gap-6 max-w-md w-full mx-auto", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Fill in the details below to register
        </p>
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="e.g. jdoe"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            placeholder="e.g. John"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            placeholder="e.g. Doe"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter a strong password"
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Register
      </Button>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to={'/'} className="underline underline-offset-4" >Login here</Link>
        {/* <a href="#" className="underline underline-offset-4"> 
          Login here
        </a> */}
      </div>
    </form>
  );
}

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted relative hidden lg:block">
        <img
          src="\batmanicon.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>


      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start    ">
          <a href="#" className="flex items-center gap-2 font-medium">
            {/* LOGO */}
            Noah Ticket
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <CreateAccountForm />
          </div>
        </div>
      </div>
    </div>
  );
}