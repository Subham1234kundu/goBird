"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import DeleteSuccessModal from "@/components/Admin/Modals/DeleteSuccessModal";
import { getAllLeads, deleteLead } from "@/lib/services/leadService";
import { supabase } from "@/lib/supabase";
import type { Lead } from "@/lib/types/lead";

export default function RecentLeadsTable() {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteLeadId, setDeleteLeadId] = useState<string | null>(null);

    // Fetch only 5 most recent leads on component mount
    useEffect(() => {
        fetchRecentLeads();
    }, []);

    // Set up real-time subscription for new leads
    useEffect(() => {
        const channel = supabase
            .channel('dashboard-leads-channel')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'leads'
                },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        // Add new lead to the beginning and keep only 5
                        setLeads(prev => [payload.new as Lead, ...prev].slice(0, 5));
                    } else if (payload.eventType === 'UPDATE') {
                        setLeads(prev => prev.map(lead =>
                            lead.id === payload.new.id ? payload.new as Lead : lead
                        ));
                    } else if (payload.eventType === 'DELETE') {
                        setLeads(prev => prev.filter(lead => lead.id !== payload.old.id));
                        // Fetch again to maintain 5 leads
                        fetchRecentLeads();
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchRecentLeads = async () => {
        setLoading(true);
        const { data, error } = await getAllLeads(1, 5); // Only fetch 5 leads
        if (!error && data) {
            setLeads(data);
        }
        setLoading(false);
    };

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

    if (loading) {
        return (
            <div className="rounded-lg border border-[#E4E4E4] bg-white p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FE4B00] mx-auto"></div>
                <p className="mt-4 text-[#3D3D3D]">Loading recent leads...</p>
            </div>
        );
    }

    return (
        <div className="rounded-lg border border-[#E4E4E4] bg-white">
            <DeleteSuccessModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} />
            <div className="border-b border-[#E4E4E4] p-5">
                <h2 className="text-lg font-semibold text-[#121212]">Top Recent Leads</h2>
            </div>
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
                                    No recent leads found. New contact form submissions will appear here.
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
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${lead.status === "New"
                                                ? "bg-blue-100 text-blue-800"
                                                : lead.status === "Contacted"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : lead.status === "Qualified"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-gray-100 text-gray-800"
                                                }`}
                                        >
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-[#3D3D3D]">{lead.remark || '-'}</td>
                                    <td className="pl-9 py-4">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => {
                                                    setDeleteLeadId(lead.id);
                                                    handleDelete();
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
                                            <button className="hover:opacity-80 transition-opacity">
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
