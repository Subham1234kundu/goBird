"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getAllInsights, deleteInsight, deleteInsightImage } from "@/lib/services/insightService";
import type { Insight } from "@/lib/types/insight";
import { formatDate } from "@/lib/utils/dateFormatter";
import DeleteConfirmModal from "@/components/Admin/Modals/DeleteConfirmModal";

export default function AdminInsights() {
    const router = useRouter();
    const [insights, setInsights] = useState<Insight[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [insightToDelete, setInsightToDelete] = useState<Insight | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        fetchInsights();
    }, []);

    const fetchInsights = async () => {
        setLoading(true);
        const { data, error: fetchError } = await getAllInsights(1, 100);
        if (fetchError) {
            setError(fetchError);
        } else {
            setInsights(data);
        }
        setLoading(false);
    };

    const handleDeleteClick = (insight: Insight) => {
        setInsightToDelete(insight);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!insightToDelete) return;
        
        setIsDeleting(true);
        try {
            // Delete cover image if it exists
            if (insightToDelete.cover_image_url) {
                await deleteInsightImage(insightToDelete.cover_image_url);
            }

            // Delete record
            const { success, error: delError } = await deleteInsight(insightToDelete.id);
            if (success) {
                setInsights(prev => prev.filter(i => i.id !== insightToDelete.id));
                setDeleteModalOpen(false);
                setInsightToDelete(null);
            } else {
                setError(`Failed to delete: ${delError}`);
            }
        } catch (err) {
            setError("An unexpected error occurred during deletion.");
        } finally {
            setIsDeleting(false);
        }
    };

    const filteredInsights = insights.filter(i => 
        i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-white">
            <DeleteConfirmModal
                isOpen={deleteModalOpen}
                isLoading={isDeleting}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Insight"
                message={`Are you sure you want to delete "${insightToDelete?.title}"? This action cannot be undone.`}
            />

            {/* Header */}
            <div className="px-8 py-6 flex items-center justify-between border-b border-[#E4E4E4]">
                <div>
                    <h1 className="text-2xl font-bold text-[#121212]">Insights Management</h1>
                    <p className="text-sm text-[#666666]">View and manage all published insights.</p>
                </div>
                <button
                    onClick={() => router.push('/Admin/insights/create')}
                    className="bg-[#FE4B00] text-white px-6 py-2.5 rounded-sm text-sm font-medium hover:bg-[#E54300] transition-colors flex items-center gap-2"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                    Create New Insight
                </button>
            </div>

            {/* Search and Feedback */}
            <div className="px-8 py-4 space-y-4">
                {error && (
                    <div className="rounded bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}
                
                <div className="max-w-md relative">
                    <input
                        type="text"
                        placeholder="Search by title or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-[#E4E4E4] rounded-sm text-sm focus:outline-none focus:border-[#FE4B00]"
                    />
                    <svg 
                        className="absolute left-3 top-2.5 text-[#9CA3AF]" 
                        width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                    </svg>
                </div>
            </div>

            {/* Content Table */}
            <div className="px-8 pb-10">
                <div className="border border-[#E4E4E4] rounded-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-[#F9FAFB] border-b border-[#E4E4E4]">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Insight</th>
                                <th className="px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Read Time</th>
                                <th className="px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E4E4E4]">
                            {loading ? (
                                [1, 2, 3].map(i => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={5} className="px-6 py-8 h-20 bg-gray-50/50"></td>
                                    </tr>
                                ))
                            ) : filteredInsights.length > 0 ? (
                                filteredInsights.map((insight) => (
                                    <tr key={insight.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-12 h-12 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                                                    {insight.cover_image_url ? (
                                                        <Image src={insight.cover_image_url} alt="" fill className="object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">NO IMG</div>
                                                    )}
                                                </div>
                                                <p className="font-medium text-[#121212] line-clamp-1">{insight.title}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-[#4B5563]">{insight.category}</td>
                                        <td className="px-6 py-4 text-sm text-[#4B5563]">{insight.read_time || "5 min read"}</td>
                                        <td className="px-6 py-4 text-sm text-[#4B5563]">{formatDate(insight.published_date)}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-3 text-[#6B7280]">
                                                <button 
                                                    onClick={() => router.push(`/Admin/insights/edit?id=${insight.id}`)}
                                                    className="hover:text-[#FE4B00] transition-colors"
                                                >
                                                    Edit
                                                </button>
                                                <span className="w-px h-3 bg-gray-300"></span>
                                                <button 
                                                    onClick={() => handleDeleteClick(insight)}
                                                    className="hover:text-red-600 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-[#9CA3AF] text-sm italic">
                                        No insights found. {searchTerm && "Try adjusting your search."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
