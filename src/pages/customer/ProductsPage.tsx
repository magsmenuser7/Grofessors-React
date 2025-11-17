import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '../../components/tdhecommercepages/ProductCard';
import type { Product } from '../../types';

const allProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Atta',
    description: 'Stone ground whole wheat flour for soft rotis',
    price: 120,
    image: 'https://images.pexels.com/photos/1756055/pexels-photo-1756055.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Flour',
    stock: 50,
    unit: 'kg',
  },
  {
    id: '2',
    name: 'Basmati Rice',
    description: 'Premium aged basmati rice with authentic aroma',
    price: 180,
    image: 'https://images.pexels.com/photos/315938/pexels-photo-315938.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Rice',
    stock: 35,
    unit: 'kg',
  },
  {
    id: '3',
    name: 'Turmeric Powder',
    description: 'Pure turmeric powder for authentic flavor',
    price: 85,
    image: 'https://images.pexels.com/photos/7658392/pexels-photo-7658392.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Spices',
    stock: 8,
    unit: '500g',
  },
  {
    id: '4',
    name: 'Pulses Mix',
    description: 'Healthy mix of lentils and pulses',
    price: 95,
    image: 'https://images.pexels.com/photos/4519881/pexels-photo-4519881.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Pulses',
    stock: 42,
    unit: 'kg',
  },
  {
    id: '5',
    name: 'Mustard Oil',
    description: 'Pure cold-pressed mustard oil',
    price: 165,
    image: 'https://images.pexels.com/photos/4198024/pexels-photo-4198024.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Oil',
    stock: 28,
    unit: 'liter',
  },
  {
    id: '6',
    name: 'Red Chili Powder',
    description: 'Authentic spicy red chili powder',
    price: 75,
    image: 'https://images.pexels.com/photos/4198465/pexels-photo-4198465.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Spices',
    stock: 15,
    unit: '500g',
  },
  {
    id: '7',
    name: 'Maida Flour',
    description: 'Fine quality all-purpose flour',
    price: 65,
    image: 'https://images.pexels.com/photos/1756055/pexels-photo-1756055.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Flour',
    stock: 55,
    unit: 'kg',
  },
  {
    id: '8',
    name: 'Coriander Powder',
    description: 'Freshly ground coriander for aromatic dishes',
    price: 55,
    image: 'https://images.pexels.com/photos/7658392/pexels-photo-7658392.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Spices',
    stock: 22,
    unit: '250g',
  },
];

const categories = ['All', 'Flour', 'Rice', 'Spices', 'Pulses', 'Oil'];

export function ProductsPage() {
  const handleAddToCart = (product: Product) => {
    alert(`✓ ${product.name} added to cart!\nPrice: ₹${product.price}`);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="bg-gradient-to-br from-[#F8C300] to-[#FFD95E] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-[#0D0D0D] mb-6">Our Products</h1>
          <p className="text-lg text-[#0D0D0D] opacity-90">
            Premium quality FMCG products delivered fresh from your local distributor
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-[#E5E7EB] rounded-lg hover:border-[#C8102E] transition-colors">
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-5 py-2 rounded-full font-semibold transition-all ${
                category === 'All'
                  ? 'bg-gradient-to-r from-[#C8102E] to-[#E02F2F] text-white'
                  : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#C8102E]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>
    </div>
  );
}
