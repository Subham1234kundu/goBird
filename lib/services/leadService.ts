import { supabase } from '@/lib/supabase';
import type { CreateLeadData, UpdateLeadData, Lead } from '@/lib/types/lead';

// Create a new lead
export async function createLead(data: CreateLeadData): Promise<{ data: Lead | null; error: string | null }> {
    try {
        const { data: lead, error } = await supabase
            .from('leads')
            .insert([{
                name: data.name,
                email: data.email,
                phone: data.phone,
                message: data.message,
                status: 'New',
                remark: '',
            }])
            .select()
            .single();

        if (error) {
            console.error('Error creating lead:', error);
            return { data: null, error: error.message };
        }

        return { data: lead, error: null };
    } catch (error: any) {
        console.error('Error creating lead:', error);
        return { data: null, error: error.message };
    }
}

// Get all leads with pagination
export async function getAllLeads(page: number = 1, limit: number = 10): Promise<{ data: Lead[]; count: number; error: string | null }> {
    try {
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        const { data, error, count } = await supabase
            .from('leads')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(from, to);

        if (error) {
            console.error('Error fetching leads:', error);
            return { data: [], count: 0, error: error.message };
        }

        return { data: data || [], count: count || 0, error: null };
    } catch (error: any) {
        console.error('Error fetching leads:', error);
        return { data: [], count: 0, error: error.message };
    }
}

// Search leads
export async function searchLeads(query: string): Promise<{ data: Lead[]; error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .or(`name.ilike.%${query}%,email.ilike.%${query}%,phone.ilike.%${query}%`)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error searching leads:', error);
            return { data: [], error: error.message };
        }

        return { data: data || [], error: null };
    } catch (error: any) {
        console.error('Error searching leads:', error);
        return { data: [], error: error.message };
    }
}

// Get a single lead by ID
export async function getLeadById(id: string): Promise<{ data: Lead | null; error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching lead:', error);
            return { data: null, error: error.message };
        }

        return { data, error: null };
    } catch (error: any) {
        console.error('Error fetching lead:', error);
        return { data: null, error: error.message };
    }
}

// Update a lead
export async function updateLead(id: string, data: UpdateLeadData): Promise<{ data: Lead | null; error: string | null }> {
    try {
        const { data: lead, error } = await supabase
            .from('leads')
            .update({
                ...data,
                updated_at: new Date().toISOString(),
            })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating lead:', error);
            return { data: null, error: error.message };
        }

        return { data: lead, error: null };
    } catch (error: any) {
        console.error('Error updating lead:', error);
        return { data: null, error: error.message };
    }
}

// Delete a lead
export async function deleteLead(id: string): Promise<{ success: boolean; error: string | null }> {
    try {
        const { error } = await supabase
            .from('leads')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting lead:', error);
            return { success: false, error: error.message };
        }

        return { success: true, error: null };
    } catch (error: any) {
        console.error('Error deleting lead:', error);
        return { success: false, error: error.message };
    }
}
