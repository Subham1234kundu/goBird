export interface Insight {
    id: string;
    title: string;
    category: string;
    description: string;
    content: string;
    cover_image_url: string | null;
    read_time: string | null;
    published_date: string;
    created_at: string;
    updated_at: string;
}

export interface CreateInsightData {
    title: string;
    category: string;
    description: string;
    content: string;
    cover_image_url?: string | null;
    read_time?: string | null;
}

export interface UpdateInsightData {
    title?: string;
    category?: string;
    description?: string;
    content?: string;
    cover_image_url?: string | null;
    read_time?: string | null;
}
