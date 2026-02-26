import { prisma } from '@/lib/prisma';
import { getDownloadUrl } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch the current profile image
export async function GET() {
  try {
    const profileImage = await prisma.profileImage.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    if (!profileImage) {
      return NextResponse.json(null);
    }

    // If it's a private blob URL, get a temporary download URL
    let displayUrl = profileImage.imageUrl;
    if (profileImage.imageUrl?.includes('blob.vercel-storage.com')) {
      try {
        displayUrl = await getDownloadUrl(profileImage.imageUrl);
      } catch (e) {
        console.error('Error getting download URL:', e);
      }
    }

    return NextResponse.json({
      ...profileImage,
      displayUrl,
    });
  } catch (error) {
    console.error('Error fetching profile image:', error);
    return NextResponse.json({ error: 'Failed to fetch profile image' }, { status: 500 });
  }
}

// POST - Create or update profile image
export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();

    // Delete all existing profile images (keep only one)
    await prisma.profileImage.deleteMany();

    const profileImage = await prisma.profileImage.create({
      data: { imageUrl },
    });

    return NextResponse.json(profileImage, { status: 201 });
  } catch (error) {
    console.error('Error saving profile image:', error);
    return NextResponse.json({ error: 'Failed to save profile image' }, { status: 500 });
  }
}

// DELETE - Remove profile image
export async function DELETE() {
  try {
    await prisma.profileImage.deleteMany();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting profile image:', error);
    return NextResponse.json({ error: 'Failed to delete profile image' }, { status: 500 });
  }
}
