import { put, del } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

// Generate a unique filename by adding timestamp and random string
function generateUniqueFilename(originalFilename: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const lastDotIndex = originalFilename.lastIndexOf('.');
  
  if (lastDotIndex === -1) {
    // No extension
    return `${originalFilename}-${timestamp}-${randomString}`;
  }
  
  const name = originalFilename.substring(0, lastDotIndex);
  const extension = originalFilename.substring(lastDotIndex);
  return `${name}-${timestamp}-${randomString}${extension}`;
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json({ error: 'No filename provided' }, { status: 400 });
    }

    if (!request.body) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Generate unique filename to avoid duplicates
    const uniqueFilename = generateUniqueFilename(filename);

    // Upload to Vercel Blob using request.body stream (App Router)
    const blob = await put(uniqueFilename, request.body, {
      access: 'public',
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
    }

    await del(url);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}
