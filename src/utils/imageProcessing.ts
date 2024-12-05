import { spawn } from 'child_process';
import { writeFile, unlink, stat } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function removeBackground(imageUrl: string): Promise<string> {
  try {
    // Generate unique filenames for input and output
    const inputFileName = `${uuidv4()}.jpg`;
    const outputFileName = `${uuidv4()}_nobg.png`;
    const inputPath = path.join(process.cwd(), 'public', 'uploads', inputFileName);
    const outputPath = path.join(process.cwd(), 'public', 'uploads', outputFileName);
    
    // Download and save the image
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(inputPath, buffer);

    // Process with rembg
    await new Promise((resolve, reject) => {
      const process = spawn('rembg', [
        'i',
        inputPath,
        outputPath
      ]);
      
      process.stderr.on('data', (data) => {
        console.error(`rembg error: ${data.toString()}`);
      });

      process.stdout.on('data', (data) => {
        console.log(`rembg output: ${data.toString()}`);
      });

      process.on('error', (err) => {
        console.error('rembg process error:', err);
        reject(err);
      });

      process.on('close', (code) => {
        console.log(`rembg process exited with code ${code}`);
        if (code === 0) {
          resolve(code);
        } else {
          reject(new Error(`rembg process exited with code ${code}`));
        }
      });
    });

    // Verify the output file exists and has content
    const stats = await stat(outputPath);
    if (stats.size === 0) {
      throw new Error('rembg produced an empty output file');
    }

    // Clean up input file
    await unlink(inputPath);

    // Return the path to the processed image
    return `/uploads/${outputFileName}`;
  } catch (error) {
    console.error('Error removing background:', error);
    throw error; // Re-throw the error instead of silently returning the original URL
  }
} 