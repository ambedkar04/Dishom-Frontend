import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { updateUserProfile } from "@/lib/api";
import {
  Camera,
  Save,
  Edit3,
  MapPin,
  GraduationCap,
  User,
  Phone,
  Mail,
  Calendar,
  BookOpen,
  Award,
} from "lucide-react";

type FormData = {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  alternatePhone: string;
  village: string;
  state: string;
  district: string;
  pincode: string;
  currentClass: string;
  studentId: string;
};

const Profile = () => {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    // Personal Information
    fullName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    phone: "",
    alternatePhone: "",

    // Address Information
    village: "",
    state: "",
    district: "",
    pincode: "",

    // Educational Information
    currentClass: "",
    studentId: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.full_name || "",
        dateOfBirth: user.profile?.date_of_birth || "",
        gender: user.profile?.gender || "",
        email: user.email || "",
        phone: user.mobile_number || "",
        alternatePhone: user.profile?.alternate_phone || "",
        village: user.profile?.village || "",
        state: user.profile?.state || "",
        district: user.profile?.district || "",
        pincode: user.profile?.pincode || "",
        currentClass: user.profile?.current_class || "",
        studentId: user.profile?.student_id || "",
      });
      if (user.profile?.profile_image) {
        setProfileImage(user.profile.profile_image);
      }
    }
  }, [user]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          setProfileImage(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      const response = await updateUserProfile(formData);
      if (response.data) {
        setUser(response.data); // Update user in context
        setIsEditing(false);
        alert("Profile updated successfully!");
        // Reload to see changes if context update isn't enough
        window.location.reload();
      } else {
        alert("Failed to update profile. Please try again.");
        console.error("Profile update error:", response.error);
      }
    } catch (error) {
      alert("An error occurred while updating your profile.");
      console.error("Network error:", error);
    }
  };

  const classOptions = [
    "BCECE",
    "DCECE",
    "UG - Sem -01",
    "UG - Sem -02",
    "UG - Sem -03",
    "UG - Sem -04",
    "PG - Sem -01",
    "PG - Sem -02",
    "PG - Sem -03",
    "PG - Sem -04",
    "Other",
  ];

  const stateOptions = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  interface InputFieldProps {
    label: string;
    field: keyof FormData;
    type?: string;
    options?: string[];
    placeholder?: string;
    icon?: React.ReactNode;
  }

  const InputField: React.FC<InputFieldProps> = ({
    label,
    field,
    type = "text",
    options,
    placeholder = "",
    icon,
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        {icon}
        {label}
      </label>
      {options ? (
        <select
          value={formData[field]}
          onChange={(e) => handleInputChange(field, e.target.value)}
          disabled={!isEditing}
          required
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
        >
          <option value="">{placeholder || `Select ${label}`}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={formData[field]}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
          disabled={!isEditing}
          required
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-white" />
                  )}
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-lg transition-colors">
                    <Camera className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {formData.fullName || "Student"}{" "}
                </h1>
                <p className="text-gray-600 mt-1">
                  {formData.currentClass || "Class not specified"}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  AADHAAR/ABC: {formData.studentId || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => {
                      handleSave();
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    console.log("Edit Profile clicked");
                    setIsEditing(true);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <User className="w-6 h-6 text-blue-500" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField
                label="Full Name *"
                field="fullName"
                placeholder="Enter first name"
              />
              <InputField
                label="Date of Birth *"
                field="dateOfBirth"
                type="date"
                icon={<Calendar className="w-4 h-4" />}
              />
              <InputField
                label="Gender *"
                field="gender"
                options={["Male", "Female", "Other"]}
                placeholder="Select gender"
              />
              <InputField
                label="Email Address *"
                field="email"
                type="email"
                placeholder="Enter email"
                icon={<Mail className="w-4 h-4" />}
              />
              <InputField
                label="Phone Number *"
                field="phone"
                type="tel"
                placeholder="Enter phone number"
                icon={<Phone className="w-4 h-4" />}
              />
              <InputField
                label="Father Mobile Number *"
                field="alternatePhone"
                type="tel"
                placeholder="Enter father's mobile number"
              />
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <MapPin className="w-6 h-6 text-green-500" />
              Address Information
            </h2>
            <div className="space-y-6">
              <InputField
                label="Village/Town *"
                field="village"
                placeholder="Enter village/town name"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InputField
                  label="State *"
                  field="state"
                  options={stateOptions}
                />
                <InputField
                  label="District *"
                  field="district"
                  placeholder="Enter district"
                />
                <InputField
                  label="PIN Code *"
                  field="pincode"
                  placeholder="Enter PIN code"
                />
              </div>
            </div>
          </div>

          {/* Educational Information */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-purple-500" />
              Educational Information
            </h2>
            <div className="space-y-6">
              <InputField
                label="Current Class"
                field="currentClass"
                options={classOptions}
                icon={<BookOpen className="w-4 h-4" />}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InputField
                  label="AADHAAR / ABC Card No. *"
                  field="studentId"
                  placeholder="Enter AADHAAR or ABC card number"
                />
              </div>
            </div>
          </div>

          {/* Password Update */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <Award className="w-6 h-6 text-red-500" />
              Password Update
            </h2>
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 8 characters long
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              {isEditing && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-yellow-800 mb-2">
                    Password Requirements:
                  </h4>
                  <ul className="text-xs text-yellow-700 space-y-1">
                    <li>• At least 8 characters long</li>
                    <li>• Contains at least one uppercase letter</li>
                    <li>• Contains at least one lowercase letter</li>
                    <li>• Contains at least one number</li>
                    <li>
                      • Contains at least one special character (!@#$%^&*)
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
