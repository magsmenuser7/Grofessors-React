import {
  ShoppingCart,
  TrendingUp,
  Users,
  Package,
  AlertTriangle,
  Activity,
  Clock,
  Target,
} from 'lucide-react';
import { KPICard } from '../../components/tdhecommercepages/KPICard';
import { Card } from '../../components/tdhecommercepages/Card';
import { Badge } from '../../components/tdhecommercepages/Badge';

const liveOrders = [
  {
    id: '12345678',
    customer: 'Amit Singh',
    distributor: 'Krishna Distributors',
    status: 'preparing',
    time: '2 min ago',
    value: 420,
  },
  {
    id: '87654321',
    customer: 'Priya Sharma',
    distributor: 'Lakshmi Stores',
    status: 'out_for_delivery',
    time: '5 min ago',
    value: 255,
  },
  {
    id: '45678912',
    customer: 'Rajesh Kumar',
    distributor: 'Sai Traders',
    status: 'pending',
    time: '1 min ago',
    value: 580,
  },
];

const distributorHeatmap = [
  { name: 'Krishna Distributors', location: 'Whitefield', load: 85, orders: 12 },
  { name: 'Lakshmi Stores', location: 'HSR Layout', load: 65, orders: 8 },
  { name: 'Sai Traders', location: 'Koramangala', load: 92, orders: 15 },
  { name: 'Balaji Enterprises', location: 'Indiranagar', load: 45, orders: 6 },
];

const inventoryAlerts = [
  { product: 'Turmeric Powder', distributor: 'Krishna Distributors', stock: 8, critical: true },
  { product: 'Red Chili Powder', distributor: 'Lakshmi Stores', stock: 15, critical: false },
  { product: 'Coriander Powder', distributor: 'Sai Traders', stock: 22, critical: false },
];

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="bg-gradient-to-br from-[#D6AF37] to-[#FBE9A6] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-[#0D0D0D] mb-2">Admin Operations Suite</h1>
          <p className="text-lg text-[#0D0D0D] opacity-80">
            Real-time monitoring and control center
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            label="Total Orders Today"
            value={284}
            change={18}
            trend="up"
            gradient="dashboard-warm"
            icon={<ShoppingCart className="w-12 h-12" />}
          />
          <KPICard
            label="Live Orders"
            value={42}
            gradient="sunrise"
            icon={<Activity className="w-12 h-12" />}
          />
          <KPICard
            label="On-Time Delivery"
            value="94%"
            change={3}
            trend="up"
            gradient="green-mist"
            icon={<Target className="w-12 h-12" />}
          />
          <KPICard
            label="Active Distributors"
            value={28}
            change={5}
            trend="up"
            gradient="gold-glow"
            icon={<Users className="w-12 h-12" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#0D0D0D]">Live Order Stream</h2>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#2A7D46] rounded-full animate-pulse" />
                  <span className="text-sm text-[#6B7280] font-medium">Real-time</span>
                </div>
              </div>

              <div className="space-y-3">
                {liveOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-[#FFFDF2] to-[#FFF4C6] rounded-lg border border-[#E5E7EB] hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#C8102E] to-[#E02F2F] rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0D0D0D]">{order.customer}</p>
                        <p className="text-sm text-[#6B7280]">
                          {order.distributor} • #{order.id.slice(0, 8)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-[#C8102E]">₹{order.value}</p>
                        <p className="text-xs text-[#6B7280]">{order.time}</p>
                      </div>
                      <Badge
                        variant={
                          order.status === 'preparing'
                            ? 'warning'
                            : order.status === 'out_for_delivery'
                            ? 'primary'
                            : 'muted'
                        }
                        gradient
                      >
                        {order.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div>
            <Card gradient="spice-red" className="p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                SLA Breach Alerts
              </h3>
              <div className="space-y-3">
                {[
                  { order: '#12345', issue: 'Prep time exceeded', severity: 'high' },
                  { order: '#67890', issue: 'Delivery delayed', severity: 'medium' },
                ].map((alert, idx) => (
                  <div key={idx} className="bg-white bg-opacity-20 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-white font-semibold">{alert.order}</span>
                      <Badge
                        variant={alert.severity === 'high' ? 'danger' : 'warning'}
                        size="sm"
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-white text-sm">{alert.issue}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-[#0D0D0D] mb-6">Distributor Heatmap</h2>
            <div className="space-y-3">
              {distributorHeatmap.map((dist, idx) => (
                <div key={idx} className="p-4 bg-[#F9FAFB] rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-[#0D0D0D]">{dist.name}</p>
                      <p className="text-sm text-[#6B7280]">{dist.location}</p>
                    </div>
                    <Badge
                      variant={
                        dist.load > 80 ? 'danger' : dist.load > 60 ? 'warning' : 'success'
                      }
                      gradient
                    >
                      {dist.orders} orders
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            dist.load > 80
                              ? 'bg-gradient-to-r from-[#E02F2F] to-[#FF6B6B]'
                              : dist.load > 60
                              ? 'bg-gradient-to-r from-[#F4A300] to-[#FFD95E]'
                              : 'bg-gradient-to-r from-[#2A7D46] to-[#6FCF97]'
                          }`}
                          style={{ width: `${dist.load}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-bold text-[#0D0D0D] min-w-[3rem] text-right">
                      {dist.load}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-[#0D0D0D] mb-6">Inventory Risk Monitor</h2>
            <div className="space-y-3">
              {inventoryAlerts.map((alert, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border-2 ${
                    alert.critical
                      ? 'bg-gradient-to-r from-[#FEE2E2] to-[#FECACA] border-[#E02F2F]'
                      : 'bg-[#F9FAFB] border-[#E5E7EB]'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-[#0D0D0D]">{alert.product}</p>
                      <p className="text-sm text-[#6B7280]">{alert.distributor}</p>
                    </div>
                    {alert.critical && (
                      <Badge variant="danger" gradient size="sm">
                        Critical
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            alert.critical
                              ? 'bg-gradient-to-r from-[#E02F2F] to-[#FF6B6B]'
                              : 'bg-gradient-to-r from-[#F4A300] to-[#FFD95E]'
                          }`}
                          style={{ width: `${(alert.stock / 50) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-bold text-[#0D0D0D] min-w-[3rem] text-right">
                      {alert.stock} left
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card gradient="green-mist" className="p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Fulfillment Speed
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white text-sm">Avg. Prep Time</span>
                <span className="text-2xl font-bold text-white">12 min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white text-sm">Avg. Delivery Time</span>
                <span className="text-2xl font-bold text-white">28 min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white text-sm">Total Time</span>
                <span className="text-2xl font-bold text-white">40 min</span>
              </div>
            </div>
          </Card>

          <Card gradient="gold-glow" className="p-6">
            <h3 className="text-lg font-bold text-[#0D0D0D] mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Peak Hours
            </h3>
            <div className="space-y-3">
              {[
                { time: '8:00 - 10:00 AM', orders: 45 },
                { time: '12:00 - 2:00 PM', orders: 68 },
                { time: '6:00 - 8:00 PM', orders: 82 },
              ].map((peak, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-[#0D0D0D] text-sm font-medium">{peak.time}</span>
                  <span className="text-lg font-bold text-[#0D0D0D]">{peak.orders}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card gradient="sunrise" className="p-6">
            <h3 className="text-lg font-bold text-[#0D0D0D] mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Live Users
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[#0D0D0D] text-sm">Customers</span>
                <span className="text-2xl font-bold text-[#0D0D0D]">1,245</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#0D0D0D] text-sm">Distributors</span>
                <span className="text-2xl font-bold text-[#0D0D0D]">28</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#0D0D0D] text-sm">Logistics</span>
                <span className="text-2xl font-bold text-[#0D0D0D]">15</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
