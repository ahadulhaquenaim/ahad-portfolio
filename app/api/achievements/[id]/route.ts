import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// PUT - Update an achievement
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { title, description, date, imageUrl } = await request.json();

    const achievement = await prisma.achievement.update({
      where: { id },
      data: { title, description, date, imageUrl: imageUrl || '' },
    });

    return NextResponse.json(achievement);
  } catch (error) {
    console.error('Error updating achievement:', error);
    return NextResponse.json({ error: 'Failed to update achievement' }, { status: 500 });
  }
}

// DELETE - Delete an achievement
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.achievement.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting achievement:', error);
    return NextResponse.json({ error: 'Failed to delete achievement' }, { status: 500 });
  }
}
