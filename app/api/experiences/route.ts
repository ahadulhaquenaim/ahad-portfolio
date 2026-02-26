import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch all experiences
export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(experiences);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 });
  }
}

// POST - Create a new experience
export async function POST(request: NextRequest) {
  try {
    const { title, company, location, startDate, endDate, current, description } = await request.json();

    const experience = await prisma.experience.create({
      data: { title, company, location, startDate, endDate: endDate || '', current, description },
    });

    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    console.error('Error creating experience:', error);
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
  }
}
