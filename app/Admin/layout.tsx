"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import AdminNavbar from "@/components/Admin/AdminNavbar";
import ProtectedRoute from "@/components/Admin/ProtectedRoute";
import { useAuth } from "@/lib/hooks/useAuth";
import { supabase } from "@/lib/supabase";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [userAvatar, setUserAvatar] = useState<string>("");
  const isAuthPage = pathname.includes("/login") || pathname.includes("/forgotpassword");

  // Fetch user avatar from profiles table
  useEffect(() => {
    const fetchUserAvatar = async () => {
      if (!user?.id) return;

      console.log("🔍 Fetching avatar for user:", user.id);

      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", user.id)
        .single();

      console.log("📦 Database response:", { data, error });

      if (data?.avatar_url) {
        console.log("✅ Avatar URL found:", data.avatar_url);
        setUserAvatar(data.avatar_url);
      } else {
        console.log("❌ No avatar URL in database");
      }
    };

    if (user && !isAuthPage) {
      fetchUserAvatar();
    }
  }, [user, isAuthPage]);

  const handleLogout = async () => {
    if (confirm("Are you sure you want to logout?")) {
      await logout();
    }
  };

  if (isAuthPage) {
    return <>{children}</>;
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/Admin/dashboard",
      icon: "/Images/Admin/dashboardImage/dashboard.png",
    },
    {
      name: "Leads",
      href: "/Admin/leads",
      icon: "/Images/Admin/dashboardImage/lead.png",
    },
    {
      name: "Google Analysis",
      href: "/Admin/google-analytics",
      icon: "/Images/Admin/dashboardImage/googleAnalytics.png",
    },
    {
      name: "Press Release",
      href: "/Admin/press-release",
      icon: "/Images/Admin/dashboardImage/pressRelease.png",
    },
  ];

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen w-full flex-col">
        {/* Navbar */}
        <AdminNavbar userName="Admin User" userImage={userAvatar} />

        <div className="flex flex-1">
          {/* Sidebar */}
          <div className="flex w-[250px] flex-col border-r border-[#E5E5E5] bg-white py-6">

            <nav className="flex flex-col gap-2 px-4 flex-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-md px-4 py-3 transition-colors ${isActive ? "bg-[#F5F5F5]" : "hover:bg-[#F5F5F5]"
                      }`}
                  >
                    <div className="relative h-[14px] w-[14px]">
                      <Image
                        src={item.icon}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-[12.25px] font-medium text-[#121212]">
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Logout Button */}
            <div className="px-4 mt-auto">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 rounded-md px-4 py-3 w-full transition-colors hover:bg-red-50 text-red-600"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span className="text-[12.25px] font-medium">
                  Logout
                </span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white">
            {children}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
