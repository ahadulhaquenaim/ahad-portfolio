import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch the bio
export async function GET() {
  try {
    const bio = await prisma.bio.findFirst({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(bio);
  } catch (error) {
    console.error('Error fetching bio:', error);
    return NextResponse.json({ error: 'Failed to fetch bio' }, { status: 500 });
  }
}

// POST - Create or update bio (upsert behavior)
export async function POST(request: NextRequest) {
  try {
    const { title, content } = await request.json();

    // Check if bio exists
    const existingBio = await prisma.bio.findFirst();

    let bio;
    if (existingBio) {
      bio = await prisma.bio.update({
        where: { id: existingBio.id },
        data: { title, content },
      });
    } else {
      bio = await prisma.bio.create({
        data: { title, content },
      });
    }

    return NextResponse.json(bio, { status: 201 });
  } catch (error) {
    console.error('Error saving bio:', error);
    return NextResponse.json({ error: 'Failed to save bio' }, { status: 500 });
  }
}
