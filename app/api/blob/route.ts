import { getDownloadUrl } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

// GET - Get a temporary download URL for a private blob
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
    }

    const downloadUrl = await getDownloadUrl(url);

    return NextResponse.json({ downloadUrl });
  } catch (error) {
    console.error('Error getting download URL:', error);
    return NextResponse.json({ error: 'Failed to get download URL' }, { status: 500 });
  }
}
