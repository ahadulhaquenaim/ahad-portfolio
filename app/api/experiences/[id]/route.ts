import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// PUT - Update an experience
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { title, company, location, startDate, endDate, current, description } = await request.json();

    const experience = await prisma.experience.update({
      where: { id },
      data: { title, company, location, startDate, endDate: endDate || '', current, description },
    });

    return NextResponse.json(experience);
  } catch (error) {
    console.error('Error updating experience:', error);
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 });
  }
}

// DELETE - Delete an experience
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.experience.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting experience:', error);
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 });
  }
}
