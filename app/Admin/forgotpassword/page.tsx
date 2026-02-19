"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPassword() {
    const [step, setStep] = useState<'email' | 'reset'>('email');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmitEmail = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('reset');
    };

    const handleSetPassword = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle password reset logic here
        console.log("Password reset");
    };

    return (
        <div className="flex min-h-screen w-full">
            {/* Left Side - Form */}
            <div className="flex w-full flex-col justify-center px-8 lg:w-1/2 xl:px-24">
                <div className="mb-8">
                    <Link
                        href="/admin/login"
                        className="mb-6 inline-block text-sm font-medium text-[#313131] hover:underline xl:text-[14px]"
                    >
                        &lt; Back to login
                    </Link>

                    {step === 'email' ? (
                        <>
                            <h1 className="mb-2 text-3xl font-semibold text-[#18181B] xl:text-[32px]">
                                Forgot your password?
                            </h1>
                            <p className="mt-2 text-base text-[#313131] xl:text-[16px] mb-3">
                                Don’t worry, happens to all of us. Enter your email below to recover your password
                            </p>
                        </>
                    ) : (
                        <>
                            <h1 className="mb-2 text-3xl font-semibold text-[#18181B] xl:text-[32px]">
                                Set new password
                            </h1>
                            <p className="mt-2 text-base text-[#313131] xl:text-[16px] mb-3">
                                Create a strong password.
                            </p>
                        </>
                    )}
                </div>

                {step === 'email' ? (
                    <form onSubmit={handleSubmitEmail} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-base font-medium text-[#121212] xl:text-[16px]">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Example@gmail.com"
                                className="w-full py-2 text-sm text-[#6B6B6B] outline-none placeholder:text-[#6B6B6B] xl:text-[14px] pl-4"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-5 w-full rounded bg-[#FE4B00] py-3 text-base font-medium text-white transition-colors hover:bg-[#e04300] xl:text-[16px]"
                        >
                            Submit
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleSetPassword} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="new-password" className="text-base font-medium text-[#121212] xl:text-[16px]">
                                New Password
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    id="new-password"
                                    placeholder="New Password"
                                    className="w-full py-2 text-sm text-[#6B6B6B] outline-none placeholder:text-[#6B6B6B] xl:text-[14px] pl-4"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-0 top-1/2 -translate-y-1/2"
                                >
                                    <div className="relative h-5 w-5">
                                        <Image
                                            src="/Images/Admin/eye.png"
                                            alt="Toggle Password Visibility"
                                            fill
                                            className="object-contain"
                                        />
                                        {showNewPassword && (
                                            <div className="absolute left-1/2 top-1/2 h-full w-[2px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#6B6B6B]" />
                                        )}
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="confirm-password" className="text-base font-medium text-[#121212] xl:text-[16px]">
                                Confirm Password
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirm-password"
                                    placeholder="Confirm Password"
                                    className="w-full py-2 text-sm text-[#6B6B6B] outline-none placeholder:text-[#6B6B6B] xl:text-[14px] pl-4"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-0 top-1/2 -translate-y-1/2"
                                >
                                    <div className="relative h-5 w-5">
                                        <Image
                                            src="/Images/Admin/eye.png"
                                            alt="Toggle Password Visibility"
                                            fill
                                            className="object-contain"
                                        />
                                        {showConfirmPassword && (
                                            <div className="absolute left-1/2 top-1/2 h-full w-[2px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#6B6B6B]" />
                                        )}
                                    </div>
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-5 w-full rounded bg-[#FE4B00] py-3 text-base font-medium text-white transition-colors hover:bg-[#e04300] xl:text-[16px]"
                        >
                            Set Password
                        </button>
                    </form>
                )}
            </div>

            {/* Right Side - Image */}
            <div className="hidden w-1/2 lg:block relative p-[10px]">
                <div className="relative w-full h-[764px]">
                    <Image
                        src="/Images/Admin/forgot.png"
                        alt="Forgot Password"
                        fill
                        className="object-cover rounded-sm"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
