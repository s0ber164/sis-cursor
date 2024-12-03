import { NextResponse } from 'next/server';
import { parse } from 'csv-parse/sync';
import clientPromise from '@/lib/mongodb';
import { removeBackground } from '@/utils/imageProcessing';
import { mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    // Read file content
    const text = await file.text();
    
    // Parse CSV
    const records = parse(text, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    }) as Record<string, string>[];

    // Validate required fields
    const requiredFields = ['name', 'price', 'image_url', 'category', 'subcategory', 'quantity', 'dimensions'];
    
    for (const record of records) {
      const missingFields = requiredFields.filter(field => !record[field]);
      if (missingFields.length > 0) {
        return NextResponse.json(
          { error: `Missing required fields: ${missingFields.join(', ')}` },
          { status: 400 }
        );
      }
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('propsRental');
    const collection = db.collection('props');

    // Process records and remove backgrounds
    const processedRecords = await Promise.all(
      records.map(async (record) => {
        // Process image through rembg
        const processedImageUrl = await removeBackground(record.image_url);
        
        return {
          name: record.name,
          price: parseFloat(record.price),
          image_url: processedImageUrl,
          category: record.category,
          subcategory: record.subcategory,
          quantity: parseInt(record.quantity),
          dimensions: record.dimensions,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      })
    );

    // Insert records
    const result = await collection.insertMany(processedRecords);

    return NextResponse.json({
      message: 'Upload successful',
      count: result.insertedCount,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process CSV file' },
      { status: 500 }
    );
  }
} 