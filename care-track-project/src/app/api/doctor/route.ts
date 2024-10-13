import { NextResponse } from 'next/server';
import { getAllDoctor } from '@/server/user';

export async function GET() {
  try {
    const doctors = await getAllDoctor();
    return NextResponse.json(doctors);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  }
}