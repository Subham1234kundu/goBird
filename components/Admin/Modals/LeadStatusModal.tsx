"use client";

import { LeadStatus } from "@/lib/types/lead";
import { updateLead } from "@/lib/services/leadService";

interface LeadStatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    leadId: string;
    currentStatus: LeadStatus;
}



const statusOptions: LeadStatus[] = [
    "New",
    "Contacted",
    "In Discussion",
    "Negotiation",
    "Proposal Sent",
    "Won / Converted",
    "Lost",
    "Follow-Up Scheduled",
    "Not Qualified",
    "Reopened",
];

export default function LeadStatusModal({ isOpen, onClose, leadId, currentStatus }: LeadStatusModalProps) {
    if (!isOpen) return null;

    const handleStatusChange = async (newStatus: LeadStatus) => {
        try {
            await updateLead(leadId, { status: newStatus });
            onClose(); // Close modal after successful update
        } catch (error) {
            console.error("Error updating lead status:", error);
        }
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
                    className="bg-white rounded-2xl shadow-xl w-[280px] p-6 pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h3 className="mb-4" style={{ fontSize: "12px", color: "#71717A" }}>
                        Select Status
                    </h3>

                    <div className="space-y-1">
                        {statusOptions.map((status) => {
                            const isSelected = status === currentStatus;

                            return (
                                <button
                                    key={status}
                                    onClick={() => handleStatusChange(status)}
                                    className={`w-full text-left px-3 py-2.5 rounded-lg transition-all hover:bg-gray-50 ${isSelected ? "bg-gray-100" : ""
                                        }`}
                                    style={{
                                        fontSize: "14px",
                                        color: "#333333",
                                    }}
                                >
                                    {status}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
