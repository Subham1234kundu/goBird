"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";

export default function AdminLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login, user } = useAuth();
    const router = useRouter();

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            router.push('/Admin/dashboard');
        }
    }, [user, router]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Basic validation
        if (!email || !password) {
            setError("Please enter both email and password");
            setLoading(false);
            return;
        }

        // Attempt login
        const { data, error: loginError } = await login(email, password);

        if (loginError) {
            setError(loginError);
            setLoading(false);
        } else if (data) {
            // Redirect to dashboard on success
            router.push('/Admin/dashboard');
        }
    };

    return (
        <div className="flex min-h-screen w-full">
            {/* Left Side - Login Form */}
            <div className="flex w-full flex-col justify-center px-8 lg:w-1/2 xl:px-24">
                <div className="mb-8 flex flex-col items-center">
                    <Image
                        src="/Images/Admin/loginLogo.png"
                        alt="Logo"
                        width={250}
                        height={50}
                        className="mb-6"
                    />
                    <h1 className="mb-2 text-3xl font-semibold text-[#121212] xl:text-[32px]">
                        Admin Login
                    </h1>
                    <p className="mt-2 text-base text-[#3D3D3D] xl:text-[16px] mb-3">
                        Transforming Ideas into Scalable Digital Solutions
                    </p>
                </div>

                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="rounded bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-base font-medium text-[#121212] xl:text-[16px]">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full py-2 text-sm text-[#6B6B6B] outline-none placeholder:text-[#6B6B6B] xl:text-[14px] pl-4 border border-gray-200 rounded"
                            disabled={loading}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-base font-medium text-[#121212] xl:text-[16px]">
                            Password
                        </label>
                        <div className="relative flex items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full py-2 text-sm text-[#6B6B6B] outline-none placeholder:text-[#6B6B6B] xl:text-[14px] pl-4 border border-gray-200 rounded pr-10"
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                                disabled={loading}
                            >
                                <div className="relative h-5 w-5">
                                    <Image
                                        src="/Images/Admin/eye.png"
                                        alt="Toggle Password Visibility"
                                        fill
                                        className="object-contain"
                                    />
                                    {showPassword && (
                                        <div className="absolute left-1/2 top-1/2 h-full w-[2px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#6B6B6B]" />
                                    )}
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="remember"
                                className="h-4 w-4 accent-[#6B6B6B]"
                                disabled={loading}
                            />
                            <label htmlFor="remember" className="text-sm text-[#3D3D3D]">
                                Remember me
                            </label>
                        </div>
                        <Link
                            href="/Admin/forgotpassword"
                            className="text-sm font-medium text-[#3D3D3D] hover:underline xl:text-[14px]"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-5 w-full rounded bg-[#FE4B00] py-3 text-base font-medium text-white transition-colors hover:bg-[#e04300] xl:text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Logging in..." : "Login Now"}
                    </button>
                </form>
            </div>

            {/* Right Side - Image */}
            <div className="hidden w-1/2 lg:block relative p-[10px] ">
                <div className="relative w-full h-[764px] ">
                    <Image
                        src="/Images/Admin/sideImage.png"
                        alt="Side Image"
                        fill
                        className="object-cover rounded-sm"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
