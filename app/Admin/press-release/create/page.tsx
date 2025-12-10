"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createPressRelease, uploadCoverImage } from "@/lib/services/pressReleaseService";
import RichTextEditor from "@/components/Admin/RichTextEditor";
import SuccessModal from "@/components/Admin/Modals/SuccessModal";

export default function CreatePressRelease() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [coverImagePreview, setCoverImagePreview] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);

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

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith("image/")) {
            setCoverImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePublish = async () => {
        // Validation
        if (!title.trim()) {
            setError("Please enter a title");
            return;
        }
        if (!category) {
            setError("Please select a category");
            return;
        }
        if (!content.trim()) {
            setError("Please enter content");
            return;
        }

        setLoading(true);
        setError("");

        try {
            let coverImageUrl: string | null = null;

            // Upload cover image if provided
            if (coverImage) {
                const { url, error: uploadError } = await uploadCoverImage(coverImage);
                if (uploadError) {
                    setError(`Failed to upload image: ${uploadError}`);
                    setLoading(false);
                    return;
                }
                coverImageUrl = url;
            }

            // Generate description from first 150 characters of content
            const description = content.substring(0, 150) + (content.length > 150 ? "..." : "");

            // Create press release
            const { error: createError } = await createPressRelease({
                title,
                category,
                description,
                content,
                cover_image_url: coverImageUrl,
            });

            if (createError) {
                setError(`Failed to create press release: ${createError}`);
                setLoading(false);
                return;
            }

            // Success - show success modal
            setLoading(false);
            setShowSuccessModal(true);
        } catch (err) {
            const error = err as Error;
            setError(`An error occurred: ${error.message}`);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Success Modal */}
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => {
                    setShowSuccessModal(false);
                    router.push('/Admin/press-release');
                }}
                message="Your press release has been published successfully!"
            />
            {/* Header */}
            <div className="border-b border-[#E4E4E4] px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="hover:opacity-70 transition-opacity"
                        disabled={loading}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 className="text-xl font-semibold text-[#121212]">Create New Press Release</h1>
                </div>
                <button
                    onClick={handlePublish}
                    disabled={loading}
                    className="rounded-sm bg-[#FE4B00] px-6 py-2.5 text-[14px] font-medium text-white hover:bg-[#E54300] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Publishing..." : "Publish"}
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mx-8 mt-4 rounded bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* Main Content */}
            <div className="flex">
                {/* Left Sidebar - Form */}
                <div className="w-[280px] border-r border-[#E4E4E4] p-6 space-y-6">
                    {/* Press Release Details */}
                    <div>
                        <h3 className="text-sm font-medium text-[#121212] mb-4">Press Release Details</h3>

                        {/* Title */}
                        <div className="mb-4">
                            <label className="block text-sm text-[#3D3D3D] mb-2">
                                Title<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                disabled={loading}
                                className="w-full px-3 py-2 border border-[#E4E4E4] rounded-sm text-sm placeholder-[#9CA3AF] focus:outline-none focus:border-[#FE4B00] disabled:opacity-50"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm text-[#3D3D3D] mb-2">
                                Category<span className="text-red-500">*</span>
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                disabled={loading}
                                className="w-full px-3 py-2 border border-[#E4E4E4] rounded-sm text-sm text-[#9CA3AF] focus:outline-none focus:border-[#FE4B00] appearance-none bg-white disabled:opacity-50"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%239CA3AF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 12px center'
                                }}
                            >
                                <option value="">Select</option>
                                <option value="Product Launch">Product Launch</option>
                                <option value="Collaboration">Collaboration</option>
                                <option value="Company News">Company News</option>
                            </select>
                        </div>
                    </div>

                    {/* Cover Image */}
                    <div>
                        <h3 className="text-sm font-medium text-[#121212] mb-4">Cover Image</h3>
                        <div
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            className="border-2 border-dashed border-[#E4E4E4] rounded-lg p-6 text-center cursor-pointer hover:border-[#FE4B00] transition-colors"
                        >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={loading}
                                className="hidden"
                                id="cover-image-upload"
                            />
                            <label htmlFor="cover-image-upload" className="cursor-pointer">
                                {coverImagePreview ? (
                                    <div className="relative w-full h-32">
                                        <Image
                                            src={coverImagePreview}
                                            alt="Cover preview"
                                            fill
                                            className="object-cover rounded"
                                        />
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <div className="flex justify-center">
                                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                                <rect width="40" height="40" rx="8" fill="#F3F4F6" />
                                                <path d="M20 14V26M14 20H26" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                        <p className="text-xs text-[#9CA3AF]">
                                            Click to browse or<br />drag and drop your files
                                        </p>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>
                </div>

                {/* Right Side - Rich Text Editor */}
                <div className="flex-1 p-6">
                    <RichTextEditor
                        content={content}
                        onChange={setContent}
                        disabled={loading}
                        maxLength={8000}
                    />
                </div>
            </div>
        </div>
    );
}
