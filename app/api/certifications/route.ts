import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch all certifications
export async function GET() {
  try {
    const certifications = await prisma.certification.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(certifications);
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return NextResponse.json({ error: 'Failed to fetch certifications' }, { status: 500 });
  }
}

// POST - Create a new certification
export async function POST(request: NextRequest) {
  try {
    const { title, issuer, date, credentialUrl, imageUrl } = await request.json();

    const certification = await prisma.certification.create({
      data: { title, issuer, date, credentialUrl, imageUrl: imageUrl || '' },
    });

    return NextResponse.json(certification, { status: 201 });
  } catch (error) {
    console.error('Error creating certification:', error);
    return NextResponse.json({ error: 'Failed to create certification' }, { status: 500 });
  }
}
