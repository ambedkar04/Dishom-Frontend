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
import { Eye, EyeOff, Phone, Lock, User } from "lucide-react";
import { registerUser } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";


interface RegisterProps {
  onSwitchToLogin: () => void;
}

function Register({ onSwitchToLogin }: RegisterProps) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    if (!agreeTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await registerUser({
        full_name: formData.fullName,
        mobile_number: formData.mobileNumber,
        password: formData.password,
        confirm_password: formData.confirmPassword,
      });

      if (response.data) {
        // Update auth context and log user in
        login(response.data.user, response.data.tokens);

        // Redirect to profile page
        navigate("/profile");
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
          alert("Registration failed. Please check your information and try again.");
        }
        console.error("Registration error:", error);
      }
    } catch (error) {
      alert("Network error. Please check your connection and try again.");
      console.error("Network error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-none border-0">
        <CardHeader className="space-y-1 text-center pb-8">
          <CardTitle className="text-2xl font-bold text-slate-900">
            Create Account
          </CardTitle>
          <CardDescription className="text-slate-600">
            Join us today and start your learning journey
          </CardDescription>
        </CardHeader>

        <div>
          <CardContent className="space-y-4">
            {/* Full Name Field */}
            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className="text-sm font-medium text-slate-700"
              >
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="pl-10 h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>



            {/* Mobile Number Field */}
            <div className="space-y-2">
              <Label
                htmlFor="mobileNumber"
                className="text-sm font-medium text-slate-700"
              >
                Mobile Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
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
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleInputChange}
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

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-slate-700"
              >
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 h-11 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                className="border-slate-300"
              />
              <Label
                htmlFor="terms"
                className="text-sm text-slate-600 cursor-pointer select-none leading-tight"
              >
                I agree to the{" "}
                <button
                  type="button"
                  onClick={() => console.log("Show terms and conditions")}
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Terms and Conditions
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  onClick={() => console.log("Show privacy policy")}
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Privacy Policy
                </button>
              </Label>
            </div>
          </CardContent>

          <CardFooter className="pt-4">
            <Button
              onClick={handleRegister}
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !agreeTerms}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </CardFooter>
        </div>

        {/* Login Link */}
        <div className="text-center mt-6 pb-4">
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
            >
              Login
            </button>
          </p>
        </div>
      </Card>
  );
}

export default Register;
