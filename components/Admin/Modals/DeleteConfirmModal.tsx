"use client";

import Image from "next/image";

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
}

export default function DeleteConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title = "Delete Confirmation",
    message = "Are you sure you want to delete this item? This action cannot be undone."
}: DeleteConfirmModalProps) {
    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative w-[420px] rounded-lg bg-white shadow-xl p-6">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 hover:opacity-70 transition-opacity"
                >
                    <Image src="/Images/Admin/dashboardImage/cross.png" alt="Close" width={24} height={24} />
                </button>

                {/* Content */}
                <div className="flex flex-col items-center gap-4 mt-2">
                    {/* Warning Icon */}
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2">
                            <path d="M12 9v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                        </svg>
                    </div>

                    {/* Title and Message */}
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h3 className="text-[18px] font-semibold text-[#121212]">{title}</h3>
                        <p className="text-[14px] text-[#475569] max-w-[340px]">{message}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-2 w-full">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-2.5 text-[14px] font-medium text-[#121212] border border-[#E4E4E4] rounded-sm hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="flex-1 px-6 py-2.5 text-[14px] font-medium text-white bg-[#DC2626] rounded-sm hover:bg-[#B91C1C] transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
