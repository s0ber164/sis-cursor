'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload-csv', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setMessage(`Successfully uploaded ${data.count} props`);
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link 
          href="/admin/props" 
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          View All Props
        </Link>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Upload Props CSV</h2>
        
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select CSV File
            </label>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
            />
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="submit"
              disabled={uploading || !file}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 
                disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Upload CSV'}
            </button>

            {message && (
              <p className={`text-sm ${message.includes('Successfully') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
          </div>
        </form>

        <div className="mt-8">
          <h3 className="text-lg font-medium mb-2">CSV Format Requirements:</h3>
          <p className="text-sm text-gray-600 mb-2">
            Your CSV file should include the following columns:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>name (required)</li>
            <li>price (required, numeric)</li>
            <li>image_url (required)</li>
            <li>category (required)</li>
            <li>subcategory (required)</li>
            <li>quantity (required, numeric)</li>
            <li>dimensions (required)</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 