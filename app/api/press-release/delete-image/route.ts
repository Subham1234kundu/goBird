import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function DELETE(request: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('imageUrl');

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'No image URL provided' },
        { status: 400 }
      );
    }

    // Extract file path from URL
    const urlParts = imageUrl.split('/press-release-images/');
    if (urlParts.length < 2) {
      return NextResponse.json(
        { error: 'Invalid image URL' },
        { status: 400 }
      );
    }
    const filePath = urlParts[1];

    const { error } = await supabaseAdmin.storage
      .from('press-release-images')
      .remove([filePath]);

    if (error) {
      console.error('Error deleting image:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
