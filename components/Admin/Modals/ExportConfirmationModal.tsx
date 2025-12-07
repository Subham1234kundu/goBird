"use client";

import Image from "next/image";

interface ExportConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function ExportConfirmationModal({ isOpen, onClose, onConfirm }: ExportConfirmationModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative w-[544px] rounded-lg bg-white p-6 shadow-lg">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-[#181D27]">Export data as CSV?</h3>
                        <p className="mt-1 text-[14px] text-[#535862]">
                            A CSV file containing the current records will be generated.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex-shrink-0"
                    >
                        <Image src="/Images/Admin/dashboardImage/cross.png" alt="Close" width={24} height={24} />
                    </button>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="h-[44px] w-[90px] rounded-sm border border-[#D5D7DA] text-sm font-medium text-[#414651] hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="h-[44px] w-[90px] rounded-sm bg-[#FE4B00] text-sm font-medium text-white hover:bg-[#e04200]"
                    >
                        Export
                    </button>
                </div>
            </div>
        </div>
    );
}
