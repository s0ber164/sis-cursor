'use client';

import { useEffect, useState } from 'react';

interface Prop {
  _id: string;
  name: string;
  price: number;
  image_url: string;
  category: string;
  subcategory: string;
  quantity: number;
  dimensions: string;
  createdAt: string;
}

export default function PropsList() {
  const [props, setProps] = useState<Prop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProps = async () => {
      try {
        const response = await fetch('/api/props/list');
        if (!response.ok) {
          throw new Error('Failed to fetch props');
        }
        const data = await response.json();
        setProps(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load props');
      } finally {
        setLoading(false);
      }
    };

    fetchProps();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Props List</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all props in the database
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Price</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Category</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Subcategory</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Quantity</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Dimensions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {props.map((prop) => (
                      <tr key={prop._id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img className="h-10 w-10 rounded-full object-cover" src={prop.image_url} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{prop.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${prop.price.toFixed(2)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{prop.category}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{prop.subcategory}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{prop.quantity}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{prop.dimensions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 