import { spawn } from 'child_process';
import { writeFile, unlink } from 'fs/promises';
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
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(inputPath, buffer);

    // Process with Python
    const pythonProcess = spawn('python', ['-c', `
from rembg import remove
from PIL import Image

input_path = '${inputPath.replace(/\\/g, '/')}'
output_path = '${outputPath.replace(/\\/g, '/')}'

try:
    input_image = Image.open(input_path)
    output_image = remove(input_image)
    output_image.save(output_path)
    print('Success')
except Exception as e:
    print(f'Error: {str(e)}')
    exit(1)
`]);

    await new Promise((resolve, reject) => {
      let errorOutput = '';
      
      pythonProcess.stdout.on('data', (data) => {
        console.log(`Python output: ${data}`);
      });

      pythonProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
        console.error(`Python error: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          resolve(null);
        } else {
          reject(new Error(`Python process failed with code ${code}. Error: ${errorOutput}`));
        }
      });
    });

    // Clean up input file
    await unlink(inputPath).catch(console.error);

    return `/uploads/${outputFileName}`;
  } catch (error) {
    console.error('Error in background removal:', error);
    throw error;
  }
} 