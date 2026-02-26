import { NextRequest, NextResponse } from 'next/server';

// GET - Redirect to the public blob URL
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
    }

    // Public blobs are directly accessible, just return the URL
    return NextResponse.json({ downloadUrl: url });
  } catch (error) {
    console.error('Error getting blob URL:', error);
    return NextResponse.json({ error: 'Failed to get blob URL' }, { status: 500 });
  }
}
