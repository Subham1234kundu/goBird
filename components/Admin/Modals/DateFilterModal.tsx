"use client";

import { useState } from "react";

interface DateFilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (option: string) => void;
    onCustom: () => void;
    currentFilter: string;
}

export default function DateFilterModal({ isOpen, onClose, onSelect, onCustom, currentFilter }: DateFilterModalProps) {
    if (!isOpen) return null;

    const options = [
        { label: "Yesterday", value: "yesterday" },
        { label: "Last 7 Days", value: "last7days" },
        { label: "Last 15 Days", value: "last15days" },
        { label: "Last 30 Days", value: "last30days" },
        { label: "Custom", value: "custom" },
    ];

    const handleOptionClick = (value: string) => {
        if (value === "custom") {
            onCustom();
        } else {
            onSelect(value);
        }
        onClose();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/20 z-40"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                <div
                    className="bg-white rounded-2xl shadow-xl w-[240px] p-6 pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h3 className="text-base font-medium text-[#3D3D3D] mb-4">
                        Select Status
                    </h3>

                    <div className="space-y-1">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleOptionClick(option.value)}
                                className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors text-[#333333] ${currentFilter === option.value
                                        ? "bg-gray-100"
                                        : "hover:bg-gray-50"
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
