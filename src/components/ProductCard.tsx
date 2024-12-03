'use client';

interface ProductCardProps {
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  onAddToList: () => void;
}

export default function ProductCard({ name, price, image_url, quantity, onAddToList }: ProductCardProps) {
  const weeklyPrice = price * 7;

  return (
    <div className="aspect-[3/4] bg-white group relative">
      {/* Image container with 1:1 ratio */}
      <div className="relative w-full pt-[100%] overflow-hidden">
        <img
          src={image_url}
          alt={name}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow space-y-2 border-t border-gray-100">
        <h3 className="text-sm font-normal text-gray-900 tracking-wide uppercase">{name}</h3>
        
        <div className="flex justify-between items-center">
          <p className="text-sm font-light text-gray-900">
            ${weeklyPrice.toFixed(2)}/week
          </p>
          <p className="text-xs font-light text-gray-500">
            {quantity} available
          </p>
        </div>

        <button
          onClick={onAddToList}
          className="w-full py-2 text-sm border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white
            transition-colors duration-200 disabled:border-gray-200 disabled:text-gray-200 disabled:hover:bg-white"
          disabled={quantity === 0}
        >
          {quantity === 0 ? 'Out of Stock' : 'Add to List'}
        </button>
      </div>
    </div>
  );
} 