import { NextResponse } from 'next/server';
import { getAllDoctor } from '@/server/user';

export async function GET() {
  try {
    const appointments = await getAllDoctor();
    return NextResponse.json(appointments);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}