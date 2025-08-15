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
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Phone, Lock } from "lucide-react";
import { loginUser, storeAuthData } from "@/lib/api";

interface LoginProps {
  onSwitchToRegister: () => void;
  onSwitchToForgotPassword: () => void;
}

function Login({ onSwitchToRegister, onSwitchToForgotPassword }: LoginProps) {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!mobileNumber || !password) {
      alert("Please enter both mobile number and password");
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginUser({
        mobile_number: mobileNumber,
        password: password,
      });

      if (response.data) {
        // Store authentication data
        storeAuthData(response.data.tokens, response.data.user);
        
        alert("Login successful! Welcome back.");
        console.log("Login successful:", response.data);
        
        // Clear form
        setMobileNumber("");
        setPassword("");
        setRememberMe(false);
      } else if (response.error) {
        // Handle validation errors
        const error = response.error;
        if (error?.mobile_number && Array.isArray(error.mobile_number)) {
          alert(`Mobile number error: ${error.mobile_number[0]}`);
        } else if (error?.password && Array.isArray(error.password)) {
          alert(`Password error: ${error.password[0]}`);
        } else if (error?.non_field_errors && Array.isArray(error.non_field_errors)) {
          alert(`Error: ${error.non_field_errors[0]}`);
        } else {
          alert("Login failed. Please check your credentials and try again.");
        }
        console.error("Login error:", error);
      }
    } catch (error) {
      alert("Network error. Please check your connection and try again.");
      console.error("Network error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    onSwitchToForgotPassword();
  };

  const handleSignUp = () => {
    onSwitchToRegister();
  };

  return (
      <Card className="w-full max-w-md shadow-none border-0">
        <CardHeader className="space-y-1 text-center pb-8">
          <CardTitle className="text-2xl font-bold text-slate-900">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-slate-600">
            Please login to access your account.
          </CardDescription>
        </CardHeader>

        <div>
          <CardContent className="space-y-6">
            {/* Mobile Number Field */}
            <div className="space-y-2">
              <Label
                htmlFor="mobile"
                className="text-sm font-medium text-slate-700"
              >
                Mobile Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="pl-10 h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-slate-700"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />

                <Label
                  htmlFor="remember"
                  className="text-sm text-slate-600 cursor-pointer select-none"
                >
                  Remember me
                </Label>
              </div>

              {/* Updated Forgot Password Link */}
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                Forgot password?
              </button>
            </div>
          </CardContent>

          <CardFooter className="pt-4">
            <Button
              onClick={handleLogin}
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </CardFooter>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-6 pb-4">
          <p className="text-sm text-slate-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={handleSignUp}
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
            >
              Sign Up
            </button>
          </p>
        </div>
      </Card>
  );
}

export default Login;
