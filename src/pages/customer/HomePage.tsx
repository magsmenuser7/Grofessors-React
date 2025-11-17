import { ArrowRight, Star, Truck, Shield, Clock } from 'lucide-react';
import { Button } from '../../components/tdhecommercepages/Button';
import { Card } from '../../components/tdhecommercepages/Card';
import { ProductCard } from '../../components/tdhecommercepages/ProductCard';
import type { Product } from '../../types';

const featuredProducts: Product[] = [
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
];

const categories = [
  'Flour & Grains',
  'Rice',
  'Spices',
  'Pulses',
  'Oil & Ghee',
  'Ready to Cook',
];

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const handleAddToCart = (product: Product) => {
    alert(`✓ ${product.name} added to cart!\nPrice: ₹${product.price}`);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <section className="relative bg-gradient-to-br from-[#F8C300] to-[#FFD95E] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-[#0D0D0D] mb-6 leading-tight">
              Authentic Quality,
              <br />
              <span className="text-[#C8102E]">Delivered Fresh</span>
            </h1>
            <p className="text-xl text-[#0D0D0D] mb-8 opacity-90">
              Premium FMCG products delivered from your local distributor in minutes. Quality you can trust, service you can rely on.
            </p>
            <Button variant="primary" gradient size="lg" onClick={() => onNavigate('products')}>
              Order Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-white opacity-10 rounded-full" />
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-white opacity-10 rounded-full" />
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#2A7D46] to-[#6FCF97] rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-lg text-[#0D0D0D] mb-2">Hyper-Local Delivery</h3>
            <p className="text-[#6B7280]">Get your orders from nearby distributors in 30-60 minutes</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#D6AF37] to-[#FBE9A6] rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-[#0D0D0D]" />
            </div>
            <h3 className="font-bold text-lg text-[#0D0D0D] mb-2">Authentic Quality</h3>
            <p className="text-[#6B7280]">100% genuine Tenali Double Horse products</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#C8102E] to-[#E02F2F] rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-lg text-[#0D0D0D] mb-2">Real-Time Tracking</h3>
            <p className="text-[#6B7280]">Track your order from preparation to delivery</p>
          </Card>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-[#0D0D0D] mb-8">Shop by Category</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-3 bg-white border-2 border-[#C8102E] text-[#C8102E] rounded-lg font-semibold hover:bg-[#C8102E] hover:text-white transition-all"
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-[#0D0D0D]">Featured Products</h2>
          <Button variant="outline" onClick={() => onNavigate('products')}>
            View All
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#C8102E] to-[#E02F2F] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-[#F8C300] text-[#F8C300]" />
            ))}
          </div>
          <h2 className="text-3xl font-bold mb-4">Trusted by 10,000+ Families</h2>
          <p className="text-xl mb-8 opacity-90">
            Experience the convenience of hyper-local delivery with authentic Tenali Double Horse products
          </p>
          <Button variant="secondary" gradient size="lg" onClick={() => onNavigate('products')}>
            Start Shopping
          </Button>
        </div>
      </section>
    </div>
  );
}
