import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// PUT - Update a sport
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { title, description, date, imageUrl } = await request.json();

    const sport = await prisma.sport.update({
      where: { id },
      data: { title, description, date, imageUrl: imageUrl || '' },
    });

    return NextResponse.json(sport);
  } catch (error) {
    console.error('Error updating sport:', error);
    return NextResponse.json({ error: 'Failed to update sport' }, { status: 500 });
  }
}

// DELETE - Delete a sport
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.sport.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting sport:', error);
    return NextResponse.json({ error: 'Failed to delete sport' }, { status: 500 });
  }
}
