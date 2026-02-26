import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// PUT - Update a certification
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { title, issuer, date, credentialUrl, imageUrl } = await request.json();

    const certification = await prisma.certification.update({
      where: { id },
      data: { title, issuer, date, credentialUrl, imageUrl: imageUrl || '' },
    });

    return NextResponse.json(certification);
  } catch (error) {
    console.error('Error updating certification:', error);
    return NextResponse.json({ error: 'Failed to update certification' }, { status: 500 });
  }
}

// DELETE - Delete a certification
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.certification.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting certification:', error);
    return NextResponse.json({ error: 'Failed to delete certification' }, { status: 500 });
  }
}
