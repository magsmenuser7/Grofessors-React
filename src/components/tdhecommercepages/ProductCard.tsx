import { ShoppingCart } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card hover className="group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.stock < 10 && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 bg-gradient-to-r from-[#F4A300] to-[#FFD95E] text-[#0D0D0D] text-xs font-semibold rounded-full">
              Low Stock
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-[#0D0D0D] mb-2">{product.name}</h3>
        <p className="text-sm text-[#6B7280] mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-[#C8102E]">₹{product.price}</p>
            <p className="text-xs text-[#6B7280]">per {product.unit}</p>
          </div>
          <Button
            variant="primary"
            gradient
            size="sm"
            onClick={() => onAddToCart?.(product)}
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
}
