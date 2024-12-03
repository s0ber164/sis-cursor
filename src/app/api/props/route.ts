import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('propsRental');
    
    const props = await db
      .collection('props')
      .find({})
      .limit(10)
      .toArray();

    return NextResponse.json(props);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch props' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('propsRental');
    const data = await request.json();

    const result = await db.collection('props').insertOne(data);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create prop' },
      { status: 500 }
    );
  }
} 