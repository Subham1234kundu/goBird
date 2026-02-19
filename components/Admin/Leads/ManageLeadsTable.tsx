"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import DeleteSuccessModal from "@/components/Admin/Modals/DeleteSuccessModal";
import DeleteConfirmModal from "@/components/Admin/Modals/DeleteConfirmModal";
import LeadStatusModal from "@/components/Admin/Modals/LeadStatusModal";
import { getAllLeads, deleteLead, searchLeads } from "@/lib/services/leadService";
import { supabase } from "@/lib/supabase";
import type { Lead, LeadStatus } from "@/lib/types/lead";

interface ManageLeadsTableProps {
    currentPage: number;
    leadsPerPage: number;
    searchQuery?: string;
    startDate?: Date | null;
    endDate?: Date | null;
    onTotalCountChange: (total: number) => void;
}

export default function ManageLeadsTable({ currentPage, leadsPerPage, searchQuery = "", startDate = null, endDate = null, onTotalCountChange }: ManageLeadsTableProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteLeadId, setDeleteLeadId] = useState<string | null>(null);
    const [selectedLead, setSelectedLead] = useState<{ id: string; status: LeadStatus } | null>(null);

    // Fetch leads on component mount and when page changes
    const fetchLeads = useCallback(async () => {
        setLoading(true);

        // If search query exists, use search function
        if (searchQuery.trim()) {
            const { data, error } = await searchLeads(searchQuery);

            if (!error && data) {
                // Filter by date range if provided
                let filteredData = data;
                if (startDate || endDate) {
                    filteredData = data.filter(lead => {
                        const leadDate = new Date(lead.created_at);

                        if (startDate && endDate) {
                            const start = new Date(startDate);
                            start.setHours(0, 0, 0, 0);
                            const end = new Date(endDate);
                            end.setHours(23, 59, 59, 999);
                            return leadDate >= start && leadDate <= end;
                        } else if (startDate) {
                            const start = new Date(startDate);
                            start.setHours(0, 0, 0, 0);
                            return leadDate >= start;
                        } else if (endDate) {
                            const end = new Date(endDate);
                            end.setHours(23, 59, 59, 999);
                            return leadDate <= end;
                        }
                        return true;
                    });
                }

                // Apply manual pagination to filtered results
                const startIndex = (currentPage - 1) * leadsPerPage;
                const endIndex = startIndex + leadsPerPage;
                const paginatedData = filteredData.slice(startIndex, endIndex);

                setLeads(paginatedData);
                onTotalCountChange(filteredData.length);
            }
        } else {
            // Normal pagination when no search query
            if (startDate || endDate) {
                // Need to fetch all leads to filter by date
                const { data, error } = await getAllLeads(1, 10000);
                if (!error && data) {
                    const filteredData = data.filter(lead => {
                        const leadDate = new Date(lead.created_at);

                        if (startDate && endDate) {
                            const start = new Date(startDate);
                            start.setHours(0, 0, 0, 0);
                            const end = new Date(endDate);
                            end.setHours(23, 59, 59, 999);
                            return leadDate >= start && leadDate <= end;
                        } else if (startDate) {
                            const start = new Date(startDate);
                            start.setHours(0, 0, 0, 0);
                            return leadDate >= start;
                        } else if (endDate) {
                            const end = new Date(endDate);
                            end.setHours(23, 59, 59, 999);
                            return leadDate <= end;
                        }
                        return true;
                    });

                    const startIndex = (currentPage - 1) * leadsPerPage;
                    const endIndex = startIndex + leadsPerPage;
                    const paginatedData = filteredData.slice(startIndex, endIndex);

                    setLeads(paginatedData);
                    onTotalCountChange(filteredData.length);
                }
            } else {
                const { data, count, error } = await getAllLeads(currentPage, leadsPerPage);
                if (!error && data) {
                    setLeads(data);
                    if (count !== undefined) {
                        onTotalCountChange(count);
                    }
                }
            }
        }

        setLoading(false);
    }, [currentPage, searchQuery, startDate, endDate, leadsPerPage, onTotalCountChange]);

    useEffect(() => {
        fetchLeads();
    }, [fetchLeads]);

    // Set up real-time subscription
    useEffect(() => {
        const channel = supabase
            .channel('leads-channel')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'leads'
                },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        setLeads(prev => [payload.new as Lead, ...prev]);
                    } else if (payload.eventType === 'UPDATE') {
                        setLeads(prev => prev.map(lead =>
                            lead.id === payload.new.id ? payload.new as Lead : lead
                        ));
                    } else if (payload.eventType === 'DELETE') {
                        setLeads(prev => prev.filter(lead => lead.id !== payload.old.id));
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const handleDelete = async () => {
        if (!deleteLeadId) return;

        const { success } = await deleteLead(deleteLeadId);
        if (success) {
            setShowDeleteModal(true);
            setDeleteLeadId(null);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const handleOpenStatusModal = (leadId: string, currentStatus: LeadStatus) => {
        setSelectedLead({ id: leadId, status: currentStatus });
        setShowStatusModal(true);
    };

    const getStatusColors = (status: LeadStatus) => {
        const colorMap: Record<LeadStatus, { bg: string; text: string }> = {
            "New": { bg: "#E5EEFF", text: "#4169E1" },
            "Contacted": { bg: "#D4F4DD", text: "#16A34A" },
            "In Discussion": { bg: "#E5EEFF", text: "#4169E1" },
            "Negotiation": { bg: "#FFE8D6", text: "#EA580C" },
            "Proposal Sent": { bg: "#FFE8D6", text: "#EA580C" },
            "Won / Converted": { bg: "#D4F4DD", text: "#16A34A" },
            "Lost": { bg: "#FFD6D6", text: "#DC2626" },
            "Follow-Up Scheduled": { bg: "#E5EEFF", text: "#4169E1" },
            "Not Qualified": { bg: "#F3F4F6", text: "#6B7280" },
            "Reopened": { bg: "#E5EEFF", text: "#4169E1" },
        };
        return colorMap[status];
    };

    if (loading) {
        return (
            <div className="rounded-lg border border-[#E4E4E4] bg-white p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FE4B00] mx-auto"></div>
                <p className="mt-4 text-[#3D3D3D]">Loading leads...</p>
            </div>
        );
    }

    return (
        <div className="rounded-lg border border-[#E4E4E4] bg-white">
            <DeleteSuccessModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} />
            <DeleteConfirmModal
                isOpen={showDeleteConfirm}
                onClose={() => {
                    setShowDeleteConfirm(false);
                    setDeleteLeadId(null);
                }}
                onConfirm={handleDelete}
                title="Delete Lead"
                message="Are you sure you want to delete this lead? This action cannot be undone."
            />
            {selectedLead && (
                <LeadStatusModal
                    isOpen={showStatusModal}
                    onClose={() => setShowStatusModal(false)}
                    leadId={selectedLead.id}
                    currentStatus={selectedLead.status}
                />
            )}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-[#F9FAFB] text-[#6B6B6B]">
                        <tr className="border-b border-[#E4E4E4]">
                            <th className="px-6 py-4 font-medium">
                                <div className="flex items-center gap-2">
                                    Lead Name
                                    <Image src="/Images/Admin/dashboardImage/arrowDash.png" alt="Sort" width={10} height={10} />
                                </div>
                            </th>
                            <th className="px-6 py-4 font-medium">
                                <div className="flex items-center gap-2">
                                    Date
                                    <Image src="/Images/Admin/dashboardImage/arrowDash.png" alt="Sort" width={10} height={10} />
                                </div>
                            </th>
                            <th className="px-6 py-4 font-medium">
                                <div className="flex items-center gap-2">
                                    Mobile Number
                                    <Image src="/Images/Admin/dashboardImage/arrowDash.png" alt="Sort" width={10} height={10} />
                                </div>
                            </th>
                            <th className="px-6 py-4 font-medium">
                                <div className="flex items-center gap-2">
                                    Message
                                    <Image src="/Images/Admin/dashboardImage/arrowDash.png" alt="Sort" width={10} height={10} />
                                </div>
                            </th>
                            <th className="px-6 py-4 font-medium">
                                <div className="flex items-center gap-2">
                                    Status
                                    <Image src="/Images/Admin/dashboardImage/arrowDash.png" alt="Sort" width={10} height={10} />
                                </div>
                            </th>
                            <th className="px-6 py-4 font-medium">
                                <div className="flex items-center gap-2">
                                    Remark
                                    <Image src="/Images/Admin/dashboardImage/arrowDash.png" alt="Sort" width={10} height={10} />
                                </div>
                            </th>
                            <th className="px-6 py-4 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E4E4E4]">
                        {leads.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-8 text-center text-[#3D3D3D]">
                                    No leads found. Contact form submissions will appear here in real-time.
                                </td>
                            </tr>
                        ) : (
                            leads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-[#121212]">{lead.name}</td>
                                    <td className="px-6 py-4 text-[#3D3D3D]">{formatDate(lead.created_at)}</td>
                                    <td className="px-6 py-4 text-[#3D3D3D]">{lead.phone}</td>
                                    <td className="px-6 py-4 text-[#3D3D3D] max-w-[200px] truncate">
                                        {lead.message}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                                            style={{
                                                backgroundColor: getStatusColors(lead.status).bg,
                                                color: getStatusColors(lead.status).text,
                                            }}
                                        >
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-[#3D3D3D]">{lead.remark || '-'}</td>
                                    <td className="px-2 pl-6 py-4">
                                        <div className="flex items-center justify-between">
                                            <button
                                                onClick={() => {
                                                    setDeleteLeadId(lead.id);
                                                    setShowDeleteConfirm(true);
                                                }}
                                                className="hover:opacity-80 transition-opacity"
                                            >
                                                <Image
                                                    src="/Images/Admin/dashboardImage/delete.png"
                                                    alt="Delete"
                                                    width={24}
                                                    height={24}
                                                />
                                            </button>
                                            <button
                                                onClick={() => handleOpenStatusModal(lead.id, lead.status)}
                                                className="hover:opacity-80 transition-opacity"
                                            >
                                                <Image
                                                    src="/Images/Admin/dashboardImage/threeDot.png"
                                                    alt="Options"
                                                    width={24}
                                                    height={24}
                                                />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
