"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { getInsightById, updateInsight, uploadInsightImage, deleteInsightImage } from "@/lib/services/insightService";
import RichTextEditor from "@/components/Admin/RichTextEditor";
import SuccessModal from "@/components/Admin/Modals/SuccessModal";
import type { Insight } from "@/lib/types/insight";

function EditInsightContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const insightId = searchParams.get("id");
    
    const [insight, setInsight] = useState<Insight | null>(null);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [readTime, setReadTime] = useState("");
    const [content, setContent] = useState("");
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [coverImagePreview, setCoverImagePreview] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        if (!insightId) {
            setError("No insight ID provided.");
            setLoading(false);
            return;
        }
        fetchInsight();
    }, [insightId]);

    const fetchInsight = async () => {
        const { data, error: fetchError } = await getInsightById(insightId!);
        if (fetchError) {
            setError(fetchError);
        } else if (data) {
            setInsight(data);
            setTitle(data.title);
            setCategory(data.category);
            setReadTime(data.read_time || "");
            setContent(data.content);
            setCoverImagePreview(data.cover_image_url || "");
        }
        setLoading(false);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCoverImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdate = async () => {
        if (!title.trim() || !category || !content.trim()) {
            setError("Please fill in all required fields.");
            return;
        }

        setSaving(true);
        setError("");

        try {
            let coverImageUrl = insight?.cover_image_url || null;

            // Handle image change
            if (coverImage) {
                // Delete old image if it exists
                if (insight?.cover_image_url) {
                    await deleteInsightImage(insight.cover_image_url);
                }
                
                // Upload new image
                const { url, error: uploadError } = await uploadInsightImage(coverImage);
                if (uploadError) {
                    setError(`Failed to upload image: ${uploadError}`);
                    setSaving(false);
                    return;
                }
                coverImageUrl = url;
            }

            // Generate description
            const plainText = content.replace(/<[^>]*>/g, '');
            const description = plainText.substring(0, 150) + (plainText.length > 150 ? "..." : "");

            const { error: updateError } = await updateInsight(insightId!, {
                title,
                category,
                description,
                content,
                read_time: readTime,
                cover_image_url: coverImageUrl
            });

            if (updateError) {
                setError(`Update failed: ${updateError}`);
            } else {
                setShowSuccessModal(true);
            }
        } catch (err) {
            setError("An error occurred during the update.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-white italic text-gray-400">
            Fetching insight data...
        </div>
    );

    return (
        <div className="min-h-screen bg-white">
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => {
                    setShowSuccessModal(false);
                    router.push('/Admin/insights');
                }}
                message="Your insight has been updated successfully!"
            />
            {/* Header */}
            <div className="border-b border-[#E4E4E4] px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="hover:opacity-70 transition-opacity">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 className="text-xl font-semibold text-[#121212]">Edit Insight</h1>
                </div>
                <button
                    onClick={handleUpdate}
                    disabled={saving}
                    className="rounded-sm bg-[#FE4B00] px-6 py-2.5 text-[14px] font-medium text-white hover:bg-[#E54300] transition-colors disabled:opacity-50"
                >
                    {saving ? "Updating..." : "Update Insight"}
                </button>
            </div>

            {error && (
                <div className="mx-8 mt-4 rounded bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            <div className="flex">
                <div className="w-[320px] border-r border-[#E4E4E4] p-6 space-y-6">
                    <div>
                        <h3 className="text-sm font-medium text-[#121212] mb-4">Metadata</h3>
                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-[#E4E4E4] rounded-sm text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-3 py-2 border border-[#E4E4E4] rounded-sm text-sm"
                            >
                                <option value="Branding">Branding</option>
                                <option value="Technology">Technology</option>
                                <option value="Design">Design</option>
                                <option value="Cloud">Cloud</option>
                                <option value="Development">Development</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Read Time</label>
                            <input
                                type="text"
                                value={readTime}
                                onChange={(e) => setReadTime(e.target.value)}
                                className="w-full px-3 py-2 border border-[#E4E4E4] rounded-sm text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-[#121212] mb-4">Cover Image</h3>
                        <div className="border-2 border-dashed border-[#E4E4E4] rounded-lg p-6 text-center cursor-pointer">
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="edit-img" />
                            <label htmlFor="edit-img" className="cursor-pointer">
                                {coverImagePreview ? (
                                    <div className="relative w-full h-32">
                                        <Image src={coverImagePreview} alt="" fill className="object-cover rounded" />
                                    </div>
                                ) : (
                                    <p className="text-xs text-[#9CA3AF]">Click to replace image</p>
                                )}
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex-1 p-6">
                    <RichTextEditor
                        content={content}
                        onChange={setContent}
                        disabled={saving}
                        maxLength={15000}
                    />
                </div>
            </div>
        </div>
    );
}

export default function EditInsight() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center italic text-gray-400">Loading editor...</div>}>
            <EditInsightContent />
        </Suspense>
    );
}
