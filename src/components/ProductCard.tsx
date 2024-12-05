'use client';

interface ProductCardProps {
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  dimensions: string;
  onAddToList: () => void;
}

export default function ProductCard({ name, price, image_url, quantity, dimensions, onAddToList }: ProductCardProps) {
  const weeklyPrice = price * 7;

  return (
    <div className="aspect-[2/3] h-[500px] bg-white group relative rounded-2xl overflow-hidden border border-gray-100">
      {/* Image container with 1:1 ratio */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#aaaaaa]">
        <img
          src={image_url}
          alt={name}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 h-[calc(100%-100%*1)] flex flex-col">
        <div className="mb-4">
          <h3 className="text-sm font-bold text-gray-900 tracking-wide uppercase line-clamp-1">{name}</h3>
          <p className="text-xs font-light text-gray-500 line-clamp-1 mt-1">{dimensions}</p>
          <p className="text-xs font-light text-gray-500 mt-1">{quantity} available</p>
          <p className="text-sm font-light text-gray-900 mt-1">
            ${weeklyPrice.toFixed(2)}/week
          </p>
        </div>

        <div className="mt-auto">
          <button
            onClick={onAddToList}
            className="w-full py-2 text-sm border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white
              transition-colors duration-200 disabled:border-gray-200 disabled:text-gray-200 disabled:hover:bg-white
              rounded-lg"
            disabled={quantity === 0}
          >
            {quantity === 0 ? 'Out of Stock' : 'Add to List'}
          </button>
        </div>
      </div>
    </div>
  );
} 