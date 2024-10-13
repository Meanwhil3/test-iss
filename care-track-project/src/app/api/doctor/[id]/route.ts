import { NextResponse } from 'next/server';
import { getSelectDoctor } from '@/server/user';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    const { id } = params;
    try {
      const doctor = await getSelectDoctor(parseInt(id));
      // console.log(doctor)
      return NextResponse.json(doctor);
    } catch {
      return NextResponse.json(
        { error: 'Failed to fetch doctor' },
        { status: 500 }
      );
    }
  }