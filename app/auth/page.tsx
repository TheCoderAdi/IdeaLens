"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

export default function AuthForm() {
  const router = useRouter();
  const [type, setType] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = type === "login" ? "/auth/login" : "/auth/register";
      const data =
        type === "login"
          ? { email, password }
          : { name: username, email, password };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${url}`,
        data
      );
      const token = res.data.token;

      if (token) {
        localStorage.setItem("token", token);
        toast.success(res.data.message);
        router.replace("/");
      } else {
        throw new Error("No token returned");
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-bold text-center">
            {type === "login" ? "Login" : "Register"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {type === "register" && (
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
                required
              />
            )}
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
            />
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : type === "login"
                ? "Login"
                : "Register"}
            </Button>
            <p className="text-center text-sm text-gray-500">
              {type === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <span
                onClick={() => setType(type === "login" ? "register" : "login")}
                className="text-black hover:underline cursor-pointer"
              >
                {type === "login" ? "Register" : "Login"}
              </span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
