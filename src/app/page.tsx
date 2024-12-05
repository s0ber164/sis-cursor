'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';

interface Prop {
  _id: string;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  category: string;
  subcategory: string;
  dimensions: string;
}

export default function Home() {
  const [props, setProps] = useState<Prop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProps = async () => {
      try {
        const response = await fetch('/api/props/list');
        if (!response.ok) {
          throw new Error('Failed to fetch props');
        }
        const data = await response.json();
        setProps(data);
      } catch (error) {
        console.error('Error fetching props:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProps();
  }, []);

  const handleAddToList = (propId: string) => {
    // TODO: Implement add to list functionality
    console.log('Adding prop to list:', propId);
  };

  return (
    <div className="space-y-16 bg-white">
      {/* Hero Section */}
      <div className="relative py-24 px-6">
        <div className="relative mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-light tracking-tight text-gray-900 sm:text-5xl">
            Film & TV Props Rental
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600 font-light">
            Find the perfect props for your next production. From period-accurate furniture to modern electronics,
            we have everything you need to bring your vision to life.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-8">
            <a
              href="#props"
              className="px-6 py-2.5 text-sm border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white
                transition-colors duration-200"
            >
              Browse Props
            </a>
            <a href="/about" className="text-sm text-gray-900 hover:text-gray-600 transition-colors duration-200">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Props Grid Section */}
      <div id="props" className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-light text-gray-900 mb-12 tracking-wide">Available Props</h2>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-gray-900 border-r-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {props.map((prop) => (
              <ProductCard
                key={prop._id}
                name={prop.name}
                price={prop.price}
                image_url={prop.image_url}
                quantity={prop.quantity}
                dimensions={prop.dimensions}
                onAddToList={() => handleAddToList(prop._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
