"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProfileSettings() {
    const [name, setName] = useState("Grobird Technologies");
    const [email, setEmail] = useState("admin@grobird.in");
    const [phone, setPhone] = useState("+91-1234567890");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [profileImage, setProfileImage] = useState<string>("");

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClearPassword = () => {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    const handleSetPassword = () => {
        // Handle password change logic
        console.log("Password change requested");
    };

    return (
        <div className="p-8 bg-[#F9FAFB] min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-[#121212]">Profile Settings</h1>
                    <p className="text-sm text-[#6B6B6B] mt-1">
                        Manage all press releases create, edit, or remove updates easily.
                    </p>
                </div>
                <button className="rounded-sm bg-[#FE4B00] px-6 py-2.5 text-[14px] font-medium text-white hover:bg-[#E54300] transition-colors">
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
                            {profileImage ? (
                                <div className="w-8 h-8 rounded-full overflow-hidden">
                                    <Image
                                        src={profileImage}
                                        alt="Profile"
                                        width={32}
                                        height={32}
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="w-8 h-8 rounded-full overflow-hidden">
                                    <Image
                                        src="/Images/Admin/dashboardImage/user.png"
                                        alt="User"
                                        width={32}
                                        height={32}
                                        className="object-cover"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Full Name */}
                        <div className="mb-4">
                            <label className="block text-[16px] font-medium text-[#1E293B] mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Grobird Technologies"
                                className="w-full px-4 py-2.5 border border-[#C2C2C3] rounded-sm text-[14px] text-[#1E293B] placeholder-[#6B6B6B] focus:outline-none focus:border-[#FE4B00]"
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
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@grobird.in"
                                    className="w-full px-4 py-2.5 border border-[#C2C2C3] rounded-sm text-[14px] text-[#1E293B] placeholder-[#6B6B6B] focus:outline-none focus:border-[#FE4B00]"
                                />
                            </div>
                            <div>
                                <label className="block text-[16px] font-medium text-[#1E293B] mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+91-1234567890"
                                    className="w-full px-4 py-2.5 border border-[#C2C2C3] rounded-sm text-[14px] text-[#1E293B] placeholder-[#6B6B6B] focus:outline-none focus:border-[#FE4B00]"
                                />
                            </div>
                        </div>
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
                            This is the main profile that will be visible for everyone
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
                                className="px-6 py-2.5 text-[16px] font-medium text-[#7E84A3] hover:text-[#121212] transition-colors"
                            >
                                Clear
                            </button>
                            <button
                                onClick={handleSetPassword}
                                className="rounded-sm bg-[#FE4B00] px-6 py-2.5 text-[16px] font-medium text-white hover:bg-[#E54300] transition-colors"
                            >
                                Set Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
