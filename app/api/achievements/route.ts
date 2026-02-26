import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch all achievements
export async function GET() {
  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(achievements);
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return NextResponse.json({ error: 'Failed to fetch achievements' }, { status: 500 });
  }
}

// POST - Create a new achievement
export async function POST(request: NextRequest) {
  try {
    const { title, description, date, imageUrl } = await request.json();

    const achievement = await prisma.achievement.create({
      data: { title, description, date, imageUrl: imageUrl || '' },
    });

    return NextResponse.json(achievement, { status: 201 });
  } catch (error) {
    console.error('Error creating achievement:', error);
    return NextResponse.json({ error: 'Failed to create achievement' }, { status: 500 });
  }
}
