import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

interface ForgotProps {
  onSwitchToLogin: () => void;
}

function Forgot({ onSwitchToLogin }: ForgotProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Enter email, 2: Success
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendResetEmail = async () => {
    if (!validateEmail()) return;

    setIsLoading(true);

    // Simulate API call to send password reset email
    setTimeout(() => {
      console.log("Sending password reset email to:", email);
      setStep(2);
      setIsLoading(false);
    }, 2000);
  };

  const handleBackToLogin = () => {
    onSwitchToLogin();
  };

  const handleInputChange = (value: string) => {
    setEmail(value);

    // Clear error when user starts typing
    if (errors.email) {
      setErrors((prev) => ({
        ...prev,
        email: "",
      }));
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CardHeader className="space-y-1 text-center pb-6">
              <CardTitle className="text-2xl font-bold text-slate-900">
                Forgot Password?
              </CardTitle>
              <CardDescription className="text-slate-600">
                Enter your email address and we'll send you a link to reset your
                password
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className={`pl-10 h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>
            </CardContent>

            <CardFooter className="pt-4">
              <Button
                onClick={handleSendResetEmail}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Sending Reset Link...</span>
                  </div>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </CardFooter>
          </>
        );

      case 2:
        return (
          <>
            <CardHeader className="space-y-1 text-center pb-6">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900">
                Reset Link Sent!
              </CardTitle>
              <CardDescription className="text-slate-600">
                We've sent a password reset link to {email}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700 mb-2">
                  <strong>Check your email</strong>
                </p>
                <p className="text-sm text-blue-600">
                  We've sent a password reset link to your email address. Click
                  the link in the email to create a new password.
                </p>
              </div>

              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-600">
                  Didn't receive the email? Check your spam folder or try again
                  in a few minutes.
                </p>
              </div>
            </CardContent>

            <CardFooter className="pt-4 space-y-3">
              <Button
                onClick={handleBackToLogin}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors cursor-pointer"
              >
                Back to Login
              </Button>

              <Button
                onClick={() => {
                  setStep(1);
                  setEmail("");
                  setErrors({});
                }}
                variant="outline"
                className="w-full h-11 border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Try Different Email
              </Button>
            </CardFooter>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md shadow-none border-0">
        {renderStepContent()}

        {step === 1 && (
          <div className="text-center mt-4 pb-6">
            <button
              onClick={handleBackToLogin}
              className="inline-flex items-center text-sm text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Login
            </button>
          </div>
        )}
      </Card>
  );
}

export default Forgot;
