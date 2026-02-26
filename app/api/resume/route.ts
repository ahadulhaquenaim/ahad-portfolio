import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch the current resume
export async function GET() {
  try {
    const resume = await prisma.resume.findFirst({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(resume);
  } catch (error) {
    console.error('Error fetching resume:', error);
    return NextResponse.json({ error: 'Failed to fetch resume' }, { status: 500 });
  }
}

// POST - Create or replace resume (keep only one)
export async function POST(request: NextRequest) {
  try {
    const { fileName, fileUrl } = await request.json();

    // Delete all existing resumes (keep only one)
    await prisma.resume.deleteMany();

    const resume = await prisma.resume.create({
      data: { fileName, fileUrl },
    });

    return NextResponse.json(resume, { status: 201 });
  } catch (error) {
    console.error('Error saving resume:', error);
    return NextResponse.json({ error: 'Failed to save resume' }, { status: 500 });
  }
}

// DELETE - Delete the resume
export async function DELETE() {
  try {
    await prisma.resume.deleteMany();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting resume:', error);
    return NextResponse.json({ error: 'Failed to delete resume' }, { status: 500 });
  }
}
