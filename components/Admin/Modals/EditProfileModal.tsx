"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, Upload } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/hooks/useAuth";

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void; // Callback when save is successful
}

interface ProfileData {
    full_name: string;
    email: string;
    phone: string;
    avatar_url: string;
}

export default function EditProfileModal({ isOpen, onClose, onSuccess }: EditProfileModalProps) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [profileData, setProfileData] = useState<ProfileData>({
        full_name: "",
        email: "",
        phone: "",
        avatar_url: "",
    });
    const [previewImage, setPreviewImage] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
                console.log("Profile table doesn't exist or profile not found. Please run the SQL migration.");
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
                    console.log("Please run setup-profiles-table.sql in your Supabase SQL Editor");
                    return;
                }

                // Set default values
                setProfileData({
                    full_name: "",
                    email: user.email || "",
                    phone: "",
                    avatar_url: "",
                });
                setPreviewImage("");
                return;
            }

            if (error) {
                console.error("Error fetching profile:", error);
                console.log("Please run setup-profiles-table.sql in your Supabase SQL Editor");
                return;
            }

            if (data) {
                setProfileData({
                    full_name: data.full_name || "",
                    email: data.email || user?.email || "",
                    phone: data.phone || "",
                    avatar_url: data.avatar_url || "",
                });
                setPreviewImage(data.avatar_url || "");
            }
        } catch (err) {
            const error = err as Error;
            console.error("Error in fetchProfile:", error.message || error);
            alert("An unexpected error occurred. Please check the console.");
        }
    }, [user]);

    useEffect(() => {
        if (isOpen && user) {
            fetchProfile();
        }
    }, [isOpen, user, fetchProfile]);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadAvatar = async (): Promise<string | null> => {
        if (!selectedFile || !user) return null;

        setUploading(true);
        try {
            const fileExt = selectedFile.name.split(".").pop();
            const fileName = `${user.id}/${Date.now()}.${fileExt}`;

            // Upload file to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from("profile-avatars")
                .upload(fileName, selectedFile, {
                    upsert: true,
                });

            if (uploadError) throw uploadError;

            // Get public URL
            const { data } = supabase.storage
                .from("profile-avatars")
                .getPublicUrl(fileName);

            return data.publicUrl;
        } catch (error) {
            console.error("Error uploading avatar:", error);
            alert("Failed to upload image. Please try again.");
            return null;
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        if (!user) return;

        setLoading(true);
        try {
            let avatarUrl = profileData.avatar_url;

            // Upload new avatar if selected
            if (selectedFile) {
                const uploadedUrl = await uploadAvatar();
                if (uploadedUrl) {
                    avatarUrl = uploadedUrl;
                } else {
                    setLoading(false);
                    return;
                }
            }

            // Update profile in database
            const { error } = await supabase
                .from("profiles")
                .update({
                    full_name: profileData.full_name,
                    email: profileData.email,
                    phone: profileData.phone,
                    avatar_url: avatarUrl,
                    updated_at: new Date().toISOString(),
                })
                .eq("id", user.id);

            if (error) throw error;

            // Success! - Call parent's onSuccess callback
            setLoading(false);
            onClose(); // Close edit modal
            setSelectedFile(null);

            if (onSuccess) {
                onSuccess(); // Trigger success modal in parent
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile. Please try again.");
            setLoading(false); // Ensure loading is false on error
        }
    };

    const handleClear = () => {
        fetchProfile();
        setSelectedFile(null);
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-40"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-[#1E293B]">Edit Profile</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Avatar */}
                    <div className="flex justify-center mb-6">
                        <label className="cursor-pointer group relative">
                            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                                {previewImage ? (
                                    <Image
                                        src={previewImage}
                                        alt="Profile"
                                        width={96}
                                        height={96}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full bg-blue-100">
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                                                fill="#6366F1"
                                            />
                                        </svg>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
                                    <Upload className="text-white" size={24} />
                                </div>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageSelect}
                                className="hidden"
                            />
                        </label>
                    </div>

                    {/* Full Name */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-[#1E293B] mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={profileData.full_name}
                            onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
                            placeholder="Grobird Technologies"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#FE4B00] focus:ring-1 focus:ring-[#FE4B00]"
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-[#1E293B] mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                            placeholder="admin@grobird.in"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#FE4B00] focus:ring-1 focus:ring-[#FE4B00]"
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-[#1E293B] mb-2">
                            Phone Number
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value="+91"
                                disabled
                                className="w-16 px-3 py-2.5 border border-gray-300 rounded-md text-sm bg-gray-50 text-gray-500"
                            />
                            <input
                                type="tel"
                                value={profileData.phone}
                                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                placeholder="1234567890"
                                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-[#FE4B00] focus:ring-1 focus:ring-[#FE4B00]"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={handleClear}
                            disabled={loading}
                            className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
                        >
                            Clear
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={loading || uploading}
                            className="px-6 py-2.5 text-sm font-medium text-white bg-[#FE4B00] rounded-md hover:bg-[#E54300] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading || uploading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
