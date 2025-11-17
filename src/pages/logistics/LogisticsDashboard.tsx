import { Truck, Package, MapPin, Clock, CheckCircle, Camera } from 'lucide-react';
import { KPICard } from '../../components/tdhecommercepages/KPICard';
import { Card } from '../../components/tdhecommercepages/Card';
import { Button } from '../../components/tdhecommercepages/Button';
import { Badge } from '../../components/tdhecommercepages/Badge';

const pickupList = [
  {
    id: '1',
    orderId: '12345678',
    distributor: 'Krishna Distributors',
    address: '45, Industrial Area, Whitefield',
    items: 3,
    status: 'ready',
  },
  {
    id: '2',
    orderId: '87654321',
    distributor: 'Lakshmi Stores',
    address: '78, Market Road, HSR Layout',
    items: 2,
    status: 'ready',
  },
];

export function LogisticsDashboard() {
  const handleNavigate = (address: string) => {
    alert(`🗺️ Opening navigation to:\n${address}`);
  };

  const handleMarkPickedUp = (orderId: string, distributor: string) => {
    alert(`✓ Picked up order #${orderId.slice(0, 8)}\nFrom: ${distributor}\n\nStarting delivery...`);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="bg-gradient-to-br from-[#2A7D46] to-[#6FCF97] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-2">Logistics Dashboard</h1>
          <p className="text-lg text-white opacity-90">Manage pickups and deliveries</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            label="Today's Deliveries"
            value={18}
            change={15}
            trend="up"
            gradient="dashboard-warm"
            icon={<Truck className="w-12 h-12" />}
          />
          <KPICard
            label="Pending Pickups"
            value={2}
            gradient="sunrise"
            icon={<Package className="w-12 h-12" />}
          />
          <KPICard
            label="In Transit"
            value={4}
            gradient="spice-red"
            icon={<MapPin className="w-12 h-12" />}
          />
          <KPICard
            label="Avg. Delivery Time"
            value="28 min"
            change={-12}
            trend="down"
            gradient="green-mist"
            icon={<Clock className="w-12 h-12" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#0D0D0D]">Ready for Pickup</h2>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#2A7D46] rounded-full animate-pulse" />
                  <span className="text-sm text-[#6B7280] font-medium">Live</span>
                </div>
              </div>

              <div className="space-y-4">
                {pickupList.map((pickup) => (
                  <Card key={pickup.id} className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#F8C300] to-[#FFD95E] rounded-lg flex items-center justify-center">
                          <Package className="w-6 h-6 text-[#0D0D0D]" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg text-[#0D0D0D]">
                            {pickup.distributor}
                          </p>
                          <p className="text-sm text-[#6B7280] mb-2">
                            Order #{pickup.orderId.slice(0, 8)}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                            <MapPin className="w-4 h-4" />
                            {pickup.address}
                          </div>
                        </div>
                      </div>
                      <Badge variant="success" gradient>
                        {pickup.items} items
                      </Badge>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => handleNavigate(pickup.address)}>
                        <MapPin className="w-4 h-4" />
                        Navigate
                      </Button>
                      <Button variant="primary" gradient size="sm" className="flex-1" onClick={() => handleMarkPickedUp(pickup.orderId, pickup.distributor)}>
                        <CheckCircle className="w-4 h-4" />
                        Mark Picked Up
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>

          <div>
            <Card gradient="green-mist" className="p-6 mb-6">
              <h3 className="text-lg font-bold text-white mb-4">Active Route</h3>
              <div className="space-y-4">
                {[
                  { step: 'Pickup 1', location: 'Krishna Distributors', status: 'current' },
                  { step: 'Pickup 2', location: 'Lakshmi Stores', status: 'pending' },
                  { step: 'Delivery 1', location: 'MG Road', status: 'pending' },
                  { step: 'Delivery 2', location: 'HSR Layout', status: 'pending' },
                ].map((stop, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        stop.status === 'current'
                          ? 'bg-white text-[#2A7D46]'
                          : 'bg-white bg-opacity-30 text-white'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-semibold ${
                          stop.status === 'current' ? 'text-white' : 'text-white text-opacity-70'
                        }`}
                      >
                        {stop.step}
                      </p>
                      <p
                        className={`text-sm ${
                          stop.status === 'current' ? 'text-white' : 'text-white text-opacity-60'
                        }`}
                      >
                        {stop.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card gradient="gold-glow" className="p-6">
              <h3 className="text-lg font-bold text-[#0D0D0D] mb-4">Today's Performance</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#0D0D0D] font-medium">Completed</span>
                  <span className="text-2xl font-bold text-[#0D0D0D]">18/22</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#0D0D0D] font-medium">On-Time Rate</span>
                  <span className="text-2xl font-bold text-[#2A7D46]">94%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#0D0D0D] font-medium">Distance</span>
                  <span className="text-2xl font-bold text-[#0D0D0D]">45 km</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-8">
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-[#0D0D0D] mb-6">Delivery Proof Capture</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-dashed border-[#E5E7EB] rounded-lg p-8 text-center hover:border-[#C8102E] transition-colors cursor-pointer">
                <Camera className="w-12 h-12 text-[#6B7280] mx-auto mb-4" />
                <p className="text-[#0D0D0D] font-medium mb-2">Take Photo</p>
                <p className="text-sm text-[#6B7280]">Capture delivery proof</p>
              </div>
              <div className="border-2 border-dashed border-[#E5E7EB] rounded-lg p-8 text-center hover:border-[#C8102E] transition-colors cursor-pointer">
                <CheckCircle className="w-12 h-12 text-[#6B7280] mx-auto mb-4" />
                <p className="text-[#0D0D0D] font-medium mb-2">Get Signature</p>
                <p className="text-sm text-[#6B7280]">Customer signature</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
