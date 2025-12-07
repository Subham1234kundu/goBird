"use client";

import Image from "next/image";

interface DeleteSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DeleteSuccessModal({ isOpen, onClose }: DeleteSuccessModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative flex h-[124px] w-[396px] flex-col items-center justify-center rounded-lg bg-white shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4"
                >
                    <Image src="/Images/Admin/dashboardImage/cross.png" alt="Close" width={24} height={24} />
                </button>

                <div className="flex flex-col items-center gap-2">
                    <Image src="/Images/Admin/success.png" alt="Success" width={32} height={32} />
                    <span className="text-[16px] font-medium text-[#121212]">Data exported successfully.</span>
                </div>
            </div>
        </div>
    );
}
