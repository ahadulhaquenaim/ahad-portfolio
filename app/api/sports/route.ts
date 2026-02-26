import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch all sports
export async function GET() {
  try {
    const sports = await prisma.sport.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(sports);
  } catch (error) {
    console.error('Error fetching sports:', error);
    return NextResponse.json({ error: 'Failed to fetch sports' }, { status: 500 });
  }
}

// POST - Create a new sport
export async function POST(request: NextRequest) {
  try {
    const { title, description, date, imageUrl } = await request.json();

    const sport = await prisma.sport.create({
      data: { title, description, date, imageUrl: imageUrl || '' },
    });

    return NextResponse.json(sport, { status: 201 });
  } catch (error) {
    console.error('Error creating sport:', error);
    return NextResponse.json({ error: 'Failed to create sport' }, { status: 500 });
  }
}
