export interface PressRelease {
    id: string;
    title: string;
    category: string;
    description: string;
    content: string;
    cover_image_url: string | null;
    published_date: string;
    created_at: string;
    updated_at: string;
}

export interface CreatePressReleaseData {
    title: string;
    category: string;
    description: string;
    content: string;
    cover_image_url?: string | null;
}

export interface UpdatePressReleaseData {
    title?: string;
    category?: string;
    description?: string;
    content?: string;
    cover_image_url?: string | null;
}
