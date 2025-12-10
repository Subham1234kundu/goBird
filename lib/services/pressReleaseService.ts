import { supabase } from '@/lib/supabase';
import type { CreatePressReleaseData, UpdatePressReleaseData, PressRelease } from '@/lib/types/pressRelease';

// Upload cover image to Supabase storage via API route
export async function uploadCoverImage(file: File): Promise<{ url: string | null; error: string | null }> {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/press-release/upload-image', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Error uploading image:', data.error);
            return { url: null, error: data.error };
        }

        return { url: data.url, error: null };
    } catch (error) {
        const err = error as Error;
        console.error('Error uploading image:', error);
        return { url: null, error: err.message };
    }
}

// Delete cover image from Supabase storage via API route
export async function deleteCoverImage(imageUrl: string): Promise<{ success: boolean; error: string | null }> {
    try {
        const response = await fetch(`/api/press-release/delete-image?imageUrl=${encodeURIComponent(imageUrl)}`, {
            method: 'DELETE',
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Error deleting image:', data.error);
            return { success: false, error: data.error };
        }

        return { success: true, error: null };
    } catch (error) {
        const err = error as Error;
        console.error('Error deleting image:', error);
        return { success: false, error: err.message };
    }
}

// Create a new press release
export async function createPressRelease(data: CreatePressReleaseData): Promise<{ data: PressRelease | null; error: string | null }> {
    try {
        const { data: pressRelease, error } = await supabase
            .from('press_releases')
            .insert([{
                title: data.title,
                category: data.category,
                description: data.description,
                content: data.content,
                cover_image_url: data.cover_image_url || null,
            }])
            .select()
            .single();

        if (error) {
            console.error('Error creating press release:', error);
            return { data: null, error: error.message };
        }

        return { data: pressRelease, error: null };
    } catch (error) {
        const err = error as Error;
        console.error('Error creating press release:', error);
        return { data: null, error: err.message };
    }
}

// Get all press releases with pagination
export async function getAllPressReleases(page: number = 1, limit: number = 10): Promise<{ data: PressRelease[]; count: number; error: string | null }> {
    try {
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        const { data, error, count } = await supabase
            .from('press_releases')
            .select('*', { count: 'exact' })
            .order('published_date', { ascending: false })
            .range(from, to);

        if (error) {
            console.error('Error fetching press releases:', error);
            return { data: [], count: 0, error: error.message };
        }

        return { data: data || [], count: count || 0, error: null };
    } catch (error) {
        const err = error as Error;
        console.error('Error fetching press releases:', error);
        return { data: [], count: 0, error: err.message };
    }
}

// Search press releases
export async function searchPressReleases(query: string): Promise<{ data: PressRelease[]; error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('press_releases')
            .select('*')
            .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
            .order('published_date', { ascending: false });

        if (error) {
            console.error('Error searching press releases:', error);
            return { data: [], error: error.message };
        }

        return { data: data || [], error: null };
    } catch (error) {
        const err = error as Error;
        console.error('Error searching press releases:', error);
        return { data: [], error: err.message };
    }
}

// Get a single press release by ID
export async function getPressReleaseById(id: string): Promise<{ data: PressRelease | null; error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('press_releases')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching press release:', error);
            return { data: null, error: error.message };
        }

        return { data, error: null };
    } catch (error) {
        const err = error as Error;
        console.error('Error fetching press release:', error);
        return { data: null, error: err.message };
    }
}

// Update a press release
export async function updatePressRelease(id: string, data: UpdatePressReleaseData): Promise<{ data: PressRelease | null; error: string | null }> {
    try {
        const { data: pressRelease, error } = await supabase
            .from('press_releases')
            .update({
                ...data,
                updated_at: new Date().toISOString(),
            })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating press release:', error);
            return { data: null, error: error.message };
        }

        return { data: pressRelease, error: null };
    } catch (error) {
        const err = error as Error;
        console.error('Error updating press release:', error);
        return { data: null, error: err.message };
    }
}

// Delete a press release
export async function deletePressRelease(id: string): Promise<{ success: boolean; error: string | null }> {
    try {
        const { error } = await supabase
            .from('press_releases')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting press release:', error);
            return { success: false, error: error.message };
        }

        return { success: true, error: null };
    } catch (error) {
        const err = error as Error;
        console.error('Error deleting press release:', error);
        return { success: false, error: err.message };
    }
}
