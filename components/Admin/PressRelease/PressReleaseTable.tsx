"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DeleteConfirmModal from "@/components/Admin/Modals/DeleteConfirmModal";
import { getAllPressReleases, deletePressRelease, deleteCoverImage, searchPressReleases } from "@/lib/services/pressReleaseService";
import type { PressRelease } from "@/lib/types/pressRelease";

const getCategoryStyle = (category: string) => {
    switch (category) {
        case "Product Launch":
            return "bg-[#DBEAFE] text-[#193CB8]";
        case "Collaboration":
            return "bg-[#DCFCE7] text-[#016630]";
        case "Company News":
            return "bg-[#FFEDD4] text-[#9F2D00]";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

interface PressReleaseTableProps {
    currentPage: number;
    pressReleasesPerPage: number;
    searchQuery?: string;
    startDate?: Date | null;
    endDate?: Date | null;
    onTotalCountChange: (total: number) => void;
}

export default function PressReleaseTable({ currentPage, pressReleasesPerPage, searchQuery = "", startDate = null, endDate = null, onTotalCountChange }: PressReleaseTableProps) {
    const router = useRouter();
    const [pressReleases, setPressReleases] = useState<PressRelease[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<{ id: string; coverImageUrl: string | null } | null>(null);

    useEffect(() => {
        fetchPressReleases();
    }, [currentPage, searchQuery, startDate, endDate]);

    const fetchPressReleases = async () => {
        setLoading(true);

        // If search query exists, use search function
        if (searchQuery.trim()) {
            const { data, error: fetchError } = await searchPressReleases(searchQuery);

            if (fetchError) {
                setError(fetchError);
            } else {
                // Filter by date range if provided
                let filteredData = data;
                if (startDate || endDate) {
                    filteredData = data.filter(release => {
                        const releaseDate = new Date(release.published_date);

                        if (startDate && endDate) {
                            const start = new Date(startDate);
                            start.setHours(0, 0, 0, 0);
                            const end = new Date(endDate);
                            end.setHours(23, 59, 59, 999);
                            return releaseDate >= start && releaseDate <= end;
                        } else if (startDate) {
                            const start = new Date(startDate);
                            start.setHours(0, 0, 0, 0);
                            return releaseDate >= start;
                        } else if (endDate) {
                            const end = new Date(endDate);
                            end.setHours(23, 59, 59, 999);
                            return releaseDate <= end;
                        }
                        return true;
                    });
                }

                // Apply manual pagination to filtered results
                const startIndex = (currentPage - 1) * pressReleasesPerPage;
                const endIndex = startIndex + pressReleasesPerPage;
                const paginatedData = filteredData.slice(startIndex, endIndex);

                setPressReleases(paginatedData);
                onTotalCountChange(filteredData.length);
            }
        } else {
            // Normal pagination when no search query
            if (startDate || endDate) {
                // Need to fetch all press releases to filter by date
                const { data, error: fetchError } = await getAllPressReleases(1, 10000);
                if (fetchError) {
                    setError(fetchError);
                } else {
                    const filteredData = data.filter(release => {
                        const releaseDate = new Date(release.published_date);

                        if (startDate && endDate) {
                            const start = new Date(startDate);
                            start.setHours(0, 0, 0, 0);
                            const end = new Date(endDate);
                            end.setHours(23, 59, 59, 999);
                            return releaseDate >= start && releaseDate <= end;
                        } else if (startDate) {
                            const start = new Date(startDate);
                            start.setHours(0, 0, 0, 0);
                            return releaseDate >= start;
                        } else if (endDate) {
                            const end = new Date(endDate);
                            end.setHours(23, 59, 59, 999);
                            return releaseDate <= end;
                        }
                        return true;
                    });

                    const startIndex = (currentPage - 1) * pressReleasesPerPage;
                    const endIndex = startIndex + pressReleasesPerPage;
                    const paginatedData = filteredData.slice(startIndex, endIndex);

                    setPressReleases(paginatedData);
                    onTotalCountChange(filteredData.length);
                }
            } else {
                const { data, count, error: fetchError } = await getAllPressReleases(currentPage, pressReleasesPerPage);

                if (fetchError) {
                    setError(fetchError);
                } else {
                    setPressReleases(data);
                    if (count !== undefined) {
                        onTotalCountChange(count);
                    }
                }
            }
        }

        setLoading(false);
    };

    const handleEdit = (id: string) => {
        router.push(`/Admin/press-release/edit/${id}`);
    };

    const handleDeleteClick = (id: string, coverImageUrl: string | null) => {
        setDeleteTarget({ id, coverImageUrl });
        setShowDeleteConfirm(true);
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;

        const { id, coverImageUrl } = deleteTarget;

        // Delete cover image if exists
        if (coverImageUrl) {
            await deleteCoverImage(coverImageUrl);
        }

        // Delete press release
        const { success, error: deleteError } = await deletePressRelease(id);

        if (deleteError) {
            alert(`Failed to delete: ${deleteError}`);
        } else {
            // Refresh the list
            fetchPressReleases();
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).replace(/\//g, '.');
    };

    if (loading) {
        return (
            <div className="rounded-lg border border-[#E4E4E4] bg-white p-8 text-center">
                <div className="flex justify-center items-center gap-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-[#FE4B00]"></div>
                    <p className="text-[#3D3D3D]">Loading press releases...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
                <p className="text-red-600">Error loading press releases: {error}</p>
            </div>
        );
    }

    if (pressReleases.length === 0) {
        return (
            <div className="rounded-lg border border-[#E4E4E4] bg-white p-12 text-center">
                <div className="flex flex-col items-center gap-4">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                        <rect width="64" height="64" rx="12" fill="#F3F4F6" />
                        <path d="M32 20v24M20 32h24" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    <div>
                        <h3 className="text-lg font-semibold text-[#121212]">No press releases yet</h3>
                        <p className="mt-1 text-sm text-[#3D3D3D]">Get started by creating your first press release</p>
                    </div>
                    <button
                        onClick={() => router.push('/Admin/press-release/create')}
                        className="rounded-sm bg-[#FE4B00] px-6 py-2.5 text-[14px] font-medium text-white hover:bg-[#E54300] transition-colors"
                    >
                        Create Press Release
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-lg border border-[#E4E4E4] bg-white">
            <DeleteConfirmModal
                isOpen={showDeleteConfirm}
                onClose={() => {
                    setShowDeleteConfirm(false);
                    setDeleteTarget(null);
                }}
                onConfirm={handleDelete}
                title="Delete Press Release"
                message="Are you sure you want to delete this press release? This action cannot be undone."
            />
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-[#F9FAFB] text-[#6B6B6B]">
                        <tr className="border-b border-[#E4E4E4]">
                            <th className="px-6 py-4 font-medium">Title</th>
                            <th className="px-6 py-4 font-medium">Category</th>
                            <th className="px-6 py-4 font-medium">Description</th>
                            <th className="px-6 py-4 font-medium">Published Date</th>
                            <th className="px-6 py-4 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E4E4E4]">
                        {pressReleases.map((release) => (
                            <tr key={release.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-[#121212]">{release.title}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryStyle(release.category)}`}>
                                        {release.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-[#3D3D3D] max-w-[300px] truncate">
                                    {release.description}
                                </td>
                                <td className="px-6 py-4 text-[#3D3D3D]">{formatDate(release.published_date)}</td>
                                <td className="pl-9 py-4">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => handleEdit(release.id)}
                                            className="hover:opacity-80 transition-opacity"
                                        >
                                            <Image
                                                src="/Images/Admin/dashboardImage/edit.png"
                                                alt="Edit"
                                                width={24}
                                                height={24}
                                            />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(release.id, release.cover_image_url)}
                                            className="hover:opacity-80 transition-opacity"
                                        >
                                            <Image
                                                src="/Images/Admin/dashboardImage/delete.png"
                                                alt="Delete"
                                                width={24}
                                                height={24}
                                            />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
