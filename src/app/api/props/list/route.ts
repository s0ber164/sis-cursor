import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('propsRental');
    
    const props = await db
      .collection('props')
      .find({})
      .toArray();

    return NextResponse.json(props);
  } catch (error) {
    console.error('List props error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch props' },
      { status: 500 }
    );
  }
} 