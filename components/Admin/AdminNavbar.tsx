"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { useState } from "react";

interface AdminNavbarProps {
    userName?: string;
    userImage?: string;
}

export default function AdminNavbar({ userImage }: AdminNavbarProps) {
    const router = useRouter();
    const { user, logout } = useAuth();
    const [showLogoutMenu, setShowLogoutMenu] = useState(false);

    // Get user initials from email or name
    const getInitials = (email: string) => {
        const name = email.split('@')[0];
        const words = name.trim().split(/[._-]/);
        if (words.length >= 2) {
            return `${words[0][0]}${words[1][0]}`.toUpperCase();
        }
        return words[0][0].toUpperCase();
    };

    const handleLogout = async () => {
        if (confirm("Are you sure you want to logout?")) {
            await logout();
        }
        setShowLogoutMenu(false);
    };

    const displayName = user?.email || "Admin User";

    return (
        <nav className="bg-custom-bg text-white border-b-[0.5px] border-gray-700 px-8 py-2">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <Image
                        src="/Images/navLogo.png"
                        alt="Logo"
                        width={120}
                        height={40}
                        className="object-contain"
                    />
                </div>

                {/* User Profile Section */}
                <div className="relative">
                    <div
                        className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setShowLogoutMenu(!showLogoutMenu)}
                    >
                        {userImage ? (
                            <div className="relative h-10 w-10 overflow-hidden rounded-full">
                                <Image
                                    src={userImage}
                                    alt="User Profile"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#121212]">
                                {getInitials(displayName)}
                            </div>
                        )}
                    </div>

                    {/* Dropdown Menu */}
                    {showLogoutMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                            <button
                                onClick={() => {
                                    router.push('/Admin/profile');
                                    setShowLogoutMenu(false);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Profile
                            </button>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
