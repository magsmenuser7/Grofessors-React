import { Package, Clock, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { KPICard } from '../../components/tdhecommercepages/KPICard';
import { Card } from '../../components/tdhecommercepages/Card';
import { Button } from '../../components/tdhecommercepages/Button';
import { OrderCard } from '../../components/tdhecommercepages/OrderCard';
import type { Order } from '../../types';

const mockOrders: Order[] = [
  {
    id: '12345678',
    customerId: 'c1',
    status: 'pending',
    items: [
      { productId: '1', productName: 'Premium Atta', quantity: 2, price: 120 },
      { productId: '2', productName: 'Basmati Rice', quantity: 1, price: 180 },
    ],
    total: 420,
    address: '123, MG Road, Koramangala',
    createdAt: new Date().toISOString(),
  },
  {
    id: '87654321',
    customerId: 'c2',
    status: 'preparing',
    items: [
      { productId: '3', productName: 'Turmeric Powder', quantity: 3, price: 85 },
    ],
    total: 255,
    address: '456, Brigade Road, Indiranagar',
    createdAt: new Date(Date.now() - 1800000).toISOString(),
  },
];

export function DistributorDashboard() {
  const handleAcceptOrder = (orderId: string) => {
    alert(`✓ Order #${orderId.slice(0, 8)} accepted!\nStarting preparation...`);
  };

  const handleRejectOrder = (orderId: string) => {
    alert(`✗ Order #${orderId.slice(0, 8)} rejected`);
  };

  const handleMarkReady = (orderId: string) => {
    alert(`✓ Order #${orderId.slice(0, 8)} marked as ready for pickup!`);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="bg-gradient-to-br from-[#C8102E] to-[#E02F2F] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-2">Distributor Dashboard</h1>
          <p className="text-lg text-white opacity-90">Manage your orders and inventory</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            label="Today's Orders"
            value={24}
            change={12}
            trend="up"
            gradient="dashboard-warm"
            icon={<Package className="w-12 h-12" />}
          />
          <KPICard
            label="Pending Orders"
            value={5}
            gradient="sunrise"
            icon={<Clock className="w-12 h-12" />}
          />
          <KPICard
            label="Avg. Prep Time"
            value="12 min"
            change={-8}
            trend="down"
            gradient="green-mist"
            icon={<TrendingUp className="w-12 h-12" />}
          />
          <KPICard
            label="Inventory Alerts"
            value={3}
            gradient="spice-red"
            icon={<AlertCircle className="w-12 h-12" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#0D0D0D]">Incoming Orders</h2>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#2A7D46] rounded-full animate-pulse" />
                  <span className="text-sm text-[#6B7280] font-medium">Live Updates</span>
                </div>
              </div>

              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <Card key={order.id} className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-semibold text-lg text-[#0D0D0D]">
                          Order #{order.id.slice(0, 8)}
                        </p>
                        <p className="text-sm text-[#6B7280]">
                          {new Date(order.createdAt).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {order.status === 'pending' && (
                          <>
                            <Button variant="danger" size="sm" onClick={() => handleRejectOrder(order.id)}>
                              Reject
                            </Button>
                            <Button variant="success" gradient size="sm" onClick={() => handleAcceptOrder(order.id)}>
                              <CheckCircle className="w-4 h-4" />
                              Accept
                            </Button>
                          </>
                        )}
                        {order.status === 'preparing' && (
                          <Button variant="primary" gradient size="sm" onClick={() => handleMarkReady(order.id)}>
                            Mark Ready
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2 mb-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-[#0D0D0D]">
                            {item.productName} x{item.quantity}
                          </span>
                          <span className="font-semibold text-[#0D0D0D]">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-[#E5E7EB] flex justify-between items-center">
                      <span className="text-sm text-[#6B7280]">{order.address}</span>
                      <span className="text-lg font-bold text-[#C8102E]">₹{order.total}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>

          <div>
            <Card gradient="spice-red" className="p-6 mb-6">
              <h3 className="text-lg font-bold text-white mb-4">Low Stock Alerts</h3>
              <div className="space-y-3">
                {[
                  { name: 'Turmeric Powder', stock: 8, unit: '500g' },
                  { name: 'Red Chili Powder', stock: 15, unit: '500g' },
                  { name: 'Coriander Powder', stock: 22, unit: '250g' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white bg-opacity-20 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-semibold">{item.name}</span>
                      <span className="text-white text-sm">{item.unit}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-white bg-opacity-30 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#F8C300] to-[#FFD95E]"
                          style={{ width: `${(item.stock / 50) * 100}%` }}
                        />
                      </div>
                      <span className="text-white text-sm font-bold">{item.stock}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card gradient="gold-glow" className="p-6">
              <h3 className="text-lg font-bold text-[#0D0D0D] mb-4">Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-[#0D0D0D] font-medium">Order Acceptance</span>
                    <span className="text-sm font-bold text-[#0D0D0D]">96%</span>
                  </div>
                  <div className="h-2 bg-[#0D0D0D] bg-opacity-10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#2A7D46] to-[#6FCF97] w-[96%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-[#0D0D0D] font-medium">On-Time Prep</span>
                    <span className="text-sm font-bold text-[#0D0D0D]">88%</span>
                  </div>
                  <div className="h-2 bg-[#0D0D0D] bg-opacity-10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#F8C300] to-[#FFD95E] w-[88%]" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
