"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowRight, Mail, ArrowLeft, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [canResend, setCanResend] = useState(true);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!canResend && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    if (countdown === 0) {
      setCanResend(true);
      setCountdown(30);
    }
    return () => clearInterval(timer);
  }, [canResend, countdown]);

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("code sent");
    setIsCodeSent(true);
    setCanResend(false);
  };

  const handleResendCode = () => {
    console.log("code sent");
    setCanResend(false);
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
              Reset your password
            </h1>
            <p className="text-muted-foreground text-center max-w-sm">
              Enter your email address and we'll send you instructions to reset
              your password
            </p>
          </div>

          <form onSubmit={handleSendCode} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-10 bg-orbit-dark/30 border-orbit-primary/20"
                  required
                />
              </div>
            </div>

            {isCodeSent && (
              <div className="bg-orbit-primary/10 border border-orbit-primary/20 rounded-lg p-4 flex items-start gap-3">
                <Check className="w-5 h-5 text-orbit-secondary mt-0.5" />
                <div className="space-y-1">
                  <p className="text-orbit-secondary font-medium">
                    Reset instructions sent!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Please check your email for instructions to reset your
                    password.
                  </p>
                  {!canResend && (
                    <p className="text-sm text-muted-foreground">
                      You can resend the code in {countdown} seconds
                    </p>
                  )}
                </div>
              </div>
            )}

            {!isCodeSent ? (
              <Button
                type="submit"
                className="w-full bg-orbit-primary hover:bg-orbit-primary/90 h-12"
              >
                Send Reset Instructions
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleResendCode}
                disabled={!canResend}
                className="w-full bg-orbit-primary/20 hover:bg-orbit-primary/30 h-12 disabled:opacity-50"
              >
                Resend Instructions
                <Mail className="w-4 h-4 ml-2" />
              </Button>
            )}

            <div className="text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-orbit-primary/20"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>

              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 text-orbit-secondary hover:text-orbit-primary transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Link>
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
