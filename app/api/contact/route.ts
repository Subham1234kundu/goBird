import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const supabaseAdmin = getSupabaseAdmin();
        const body = await request.json();

        const { name, email, phone, message } = body;

        // Validation
        if (!name || !email || !phone || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Insert lead into database
        const { data, error } = await supabaseAdmin
            .from('leads')
            .insert([{
                name,
                email,
                phone,
                message,
                status: 'New',
                remark: '',
            }])
            .select()
            .single();

        if (error) {
            console.error('Error creating lead:', error);
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        const err = error as Error;
        console.error('Error in contact API:', error);
        return NextResponse.json(
            { error: err.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
