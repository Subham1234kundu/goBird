"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/hooks/useAuth";
import EditProfileModal from "@/components/Admin/Modals/EditProfileModal";
import SuccessModal from "@/components/Admin/Modals/SuccessModal";

export default function ProfileSettings() {
    const { user } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [profileImage, setProfileImage] = useState<string>("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // Fetch profile data on mount
    const fetchProfile = useCallback(async () => {
        if (!user?.id) return;

        try {
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single();

            // If profile doesn't exist, create it
            if (error && error.code === 'PGRST116') {
                console.log("Profile not found, creating new profile...");
                const { error: insertError } = await supabase
                    .from("profiles")
                    .insert({
                        id: user.id,
                        email: user.email,
                        full_name: "",
                        phone: "",
                        avatar_url: "",
                    });

                if (insertError) {
                    console.error("Error creating profile:", insertError);
                    return;
                }

                // Set default values
                setName("");
                setEmail(user.email || "");
                setPhone("");
                setProfileImage("");
                return;
            }

            if (error) {
                console.error("Error fetching profile:", error);
                return;
            }

            if (data) {
                setName(data.full_name || "");
                setEmail(data.email || user?.email || "");
                setPhone(data.phone || "");
                setProfileImage(data.avatar_url || "");
            }
        } catch (err) {
            const error = err as Error;
            console.error("Error in fetchProfile:", error.message || error);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchProfile();
        }
    }, [user, fetchProfile]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;

        try {
            const fileExt = file.name.split(".").pop();
            const fileName = `${user.id}/${Date.now()}.${fileExt}`;

            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from("profile-avatars")
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            // Get public URL
            const { data } = supabase.storage
                .from("profile-avatars")
                .getPublicUrl(fileName);

            // Update profile with new avatar URL
            const { error: updateError } = await supabase
                .from("profiles")
                .update({ avatar_url: data.publicUrl })
                .eq("id", user.id);

            if (updateError) throw updateError;

            setProfileImage(data.publicUrl);
            alert("Profile image updated successfully!");
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image. Please try again.");
        }
    };

    const handleClearPassword = () => {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    const handleSetPassword = async () => {
        // Validation
        if (!oldPassword || !newPassword || !confirmPassword) {
            alert("Please fill in all password fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match");
            return;
        }

        if (newPassword.length < 6) {
            alert("Password must be at least 6 characters long");
            return;
        }

        setPasswordLoading(true);
        try {
            // Update password using Supabase Auth
            const { error } = await supabase.auth.updateUser({
                password: newPassword,
            });

            if (error) throw error;

            setSuccessMessage("Your password has been updated successfully!");
            setShowSuccessModal(true);
            handleClearPassword();
        } catch (err) {
            const error = err as Error;
            console.error("Error updating password:", error);
            alert(error.message || "Failed to update password. Please try again.");
        } finally {
            setPasswordLoading(false);
        }
    };

    return (
        <div className="p-8 bg-[#F9FAFB] min-h-screen">
            {/* Edit Profile Modal */}
            <EditProfileModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                onSuccess={() => {
                    setSuccessMessage("Your profile has been updated successfully!");
                    setShowSuccessModal(true);
                    fetchProfile(); // Refresh profile data after save
                }}
            />

            {/* Success Modal */}
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => {
                    setShowSuccessModal(false);
                    window.location.reload(); // Reload to show updated profile and navbar
                }}
                message={successMessage}
            />

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-[#121212]">Profile Settings</h1>
                    <p className="text-sm text-[#6B6B6B] mt-1">
                        Manage your profile information and security settings.
                    </p>
                </div>
                <button
                    onClick={() => setShowEditModal(true)}
                    className="rounded-sm bg-[#FE4B00] px-6 py-2.5 text-[14px] font-medium text-white hover:bg-[#E54300] transition-colors"
                >
                    Edit Profile
                </button>
            </div>

            {/* Profile Information Section */}
            <div className="bg-white rounded-lg p-8">
                <div className="flex gap-12">
                    {/* Left Side - Title and Description */}
                    <div className="w-64 flex-shrink-0">
                        <h2 className="text-[18px] font-semibold text-[#1E293B] mb-2">
                            Profile Information
                        </h2>
                        <p className="text-[14px] text-[#475569]">
                            This is the main profile that will be visible for everyone
                        </p>
                    </div>

                    {/* Right Side - Form */}
                    <div className="flex-1">
                        {/* User Image */}
                        <div className="mb-6">
                            <label className="cursor-pointer inline-block">
                                {profileImage ? (
                                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 hover:border-[#FE4B00] transition-colors">
                                        <Image
                                            src={profileImage}
                                            alt="Profile"
                                            width={80}
                                            height={80}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 hover:border-[#FE4B00] transition-colors">
                                        <Image
                                            src="/Images/Admin/dashboardImage/user.png"
                                            alt="User"
                                            width={80}
                                            height={80}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>
                            <p className="text-xs text-gray-500 mt-2">Click to upload new image</p>
                        </div>

                        {/* Full Name */}
                        <div className="mb-4">
                            <label className="block text-[16px] font-medium text-[#1E293B] mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                disabled
                                placeholder="Grobird Technologies"
                                className="w-full px-4 py-2.5 border border-[#C2C2C3] rounded-sm text-[14px] text-[#1E293B] placeholder-[#6B6B6B] bg-gray-50 cursor-not-allowed"
                            />
                        </div>

                        {/* Email and Phone in a Row */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[16px] font-medium text-[#1E293B] mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    disabled
                                    placeholder="admin@grobird.in"
                                    className="w-full px-4 py-2.5 border border-[#C2C2C3] rounded-sm text-[14px] text-[#1E293B] placeholder-[#6B6B6B] bg-gray-50 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-[16px] font-medium text-[#1E293B] mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={phone}
                                    disabled
                                    placeholder="+91-1234567890"
                                    className="w-full px-4 py-2.5 border border-[#C2C2C3] rounded-sm text-[14px] text-[#1E293B] placeholder-[#6B6B6B] bg-gray-50 cursor-not-allowed"
                                />
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-3">Click &quot;Edit Profile&quot; button to update your information</p>
                    </div>
                </div>
            </div>

            {/* Change Password Section */}
            <div className="bg-white rounded-lg p-8 mt-6">
                <div className="flex gap-12">
                    {/* Left Side - Title and Description */}
                    <div className="w-64 flex-shrink-0">
                        <h2 className="text-[18px] font-semibold text-[#1E293B] mb-2">
                            Change Password
                        </h2>
                        <p className="text-[14px] text-[#475569]">
                            Update your password to keep your account secure
                        </p>
                    </div>

                    {/* Right Side - Password Forms */}
                    <div className="flex-1">
                        {/* Old Password */}
                        <div className="mb-4">
                            <label className="block text-[16px] font-medium text-[#1E293B] mb-2">
                                Old Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showOldPassword ? "text" : "password"}
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    placeholder="Old Password"
                                    className="w-full px-4 py-2.5 border border-[#C2C2C3] rounded-sm text-[14px] text-[#1E293B] placeholder-[#6B6B6B] focus:outline-none focus:border-[#FE4B00] pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B6B] hover:text-[#121212]"
                                >
                                    {showOldPassword ? (
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" />
                                            <circle cx="10" cy="10" r="3" />
                                        </svg>
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M14.12 14.12A8 8 0 015.88 5.88M2 10s3-6 8-6c1.6 0 3.05.5 4.24 1.31M18 10s-3 6-8 6c-1.6 0-3.05-.5-4.24-1.31" />
                                            <line x1="2" y1="2" x2="18" y2="18" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div className="mb-4">
                            <label className="block text-[16px] font-medium text-[#1E293B] mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="New Password"
                                    className="w-full px-4 py-2.5 border border-[#C2C2C3] rounded-sm text-[14px] text-[#1E293B] placeholder-[#6B6B6B] focus:outline-none focus:border-[#FE4B00] pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B6B] hover:text-[#121212]"
                                >
                                    {showNewPassword ? (
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" />
                                            <circle cx="10" cy="10" r="3" />
                                        </svg>
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M14.12 14.12A8 8 0 015.88 5.88M2 10s3-6 8-6c1.6 0 3.05.5 4.24 1.31M18 10s-3 6-8 6c-1.6 0-3.05-.5-4.24-1.31" />
                                            <line x1="2" y1="2" x2="18" y2="18" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-6">
                            <label className="block text-[16px] font-medium text-[#1E293B] mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Password"
                                    className="w-full px-4 py-2.5 border border-[#C2C2C3] rounded-sm text-[14px] text-[#1E293B] placeholder-[#6B6B6B] focus:outline-none focus:border-[#FE4B00] pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B6B] hover:text-[#121212]"
                                >
                                    {showConfirmPassword ? (
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" />
                                            <circle cx="10" cy="10" r="3" />
                                        </svg>
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M14.12 14.12A8 8 0 015.88 5.88M2 10s3-6 8-6c1.6 0 3.05.5 4.24 1.31M18 10s-3 6-8 6c-1.6 0-3.05-.5-4.24-1.31" />
                                            <line x1="2" y1="2" x2="18" y2="18" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleClearPassword}
                                disabled={passwordLoading}
                                className="px-6 py-2.5 text-[16px] font-medium text-[#7E84A3] hover:text-[#121212] transition-colors disabled:opacity-50"
                            >
                                Clear
                            </button>
                            <button
                                onClick={handleSetPassword}
                                disabled={passwordLoading}
                                className="rounded-sm bg-[#FE4B00] px-6 py-2.5 text-[16px] font-medium text-white hover:bg-[#E54300] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {passwordLoading ? "Updating..." : "Set Password"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
