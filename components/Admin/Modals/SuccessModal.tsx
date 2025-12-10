"use client";

import Image from "next/image";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message: string;
}

export default function SuccessModal({
    isOpen,
    onClose,
    title = "",
    message
}: SuccessModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
            <div className="relative flex min-h-[124px] w-[396px] flex-col items-center justify-center rounded-lg bg-white shadow-lg p-6">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 hover:opacity-70 transition-opacity"
                >
                    <Image src="/Images/Admin/dashboardImage/cross.png" alt="Close" width={24} height={24} />
                </button>

                <div className="flex flex-col items-center gap-3">
                    <Image src="/Images/Admin/success.png" alt="Success" width={32} height={32} />
                    <div className="flex flex-col items-center gap-1">
                        {title && (
                            <span className="text-[18px] font-semibold text-[#121212]">{title}</span>
                        )}
                        <span className="text-[16px] font-medium text-[#475569] text-center">{message}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
