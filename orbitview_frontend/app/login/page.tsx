"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowRight, Lock, PersonStanding } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { backendServer } from "@/data/backendServer";

export default function LoginPage() {
  const [username_or_email, setUsername_or_Email] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [save_info, setSave_info] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${backendServer}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username_or_email,
          password,
          save_info,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      // Handle successful login here (e.g., store token, redirect)
      console.log("Login successful:", data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orbit-dark via-orbit-primary/10 to-orbit-secondary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-orbit-dark/50 border-orbit-primary/20">
        <div className="p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Image
                src="/logo.png"
                alt="OrbitView Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-2xl font-bold text-orbit-white">
                OrbitView
              </span>
            </div>
            <h1 className="text-3xl font-bold text-center mb-2">
              Welcome back
            </h1>
            <p className="text-muted-foreground text-center">
              Enter your credentials to access your account
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username_or_email">Username or Email</Label>
              <div className="relative">
                <PersonStanding className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="username_or_email"
                  type="text"
                  value={username_or_email}
                  onChange={(e) => setUsername_or_Email(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-10 bg-orbit-dark/30 border-orbit-primary/20"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 bg-orbit-dark/30 border-orbit-primary/20"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-orbit-primary/20 bg-orbit-dark/30"
                  disabled={isLoading}
                  onChange={() => setSave_info(!save_info)}
                />
                <span className="text-sm text-muted-foreground">
                  Remember me
                </span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-orbit-secondary hover:text-orbit-primary transition"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-orbit-primary hover:bg-orbit-primary/90 h-12"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <div className="text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-orbit-primary/20"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="border-orbit-primary/20 hover:bg-orbit-primary/10"
                  disabled={isLoading}
                >
                  <Image
                    src="https://www.google.com/favicon.ico"
                    alt="Google"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="border-orbit-primary/20 hover:bg-orbit-primary/10"
                  disabled={isLoading}
                >
                  <Image
                    src="https://github.com/favicon.ico"
                    alt="GitHub"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  GitHub
                </Button>
              </div>
            </div>

            <p className="text-center text-muted-foreground">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-orbit-secondary hover:text-orbit-primary transition font-medium"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </Card>
    </div>
  );
}
