import { MapPin, Phone, Clock, CheckCircle } from 'lucide-react';
import { Card } from '../../components/tdhecommercepages/Card';
import { ProgressBar } from '../../components/tdhecommercepages/ProgressBar';
import { Badge } from '../../components/tdhecommercepages/Badge';

const trackingSteps = ['Order Placed', 'Preparing', 'Out for Delivery', 'Delivered'];

export function OrderTrackingPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="bg-gradient-to-br from-[#F8C300] to-[#FFD95E] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-[#0D0D0D] mb-2">Track Your Order</h1>
          <p className="text-lg text-[#0D0D0D] opacity-90">Order #12345678</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="p-8 mb-8">
          <div className="mb-8">
            <ProgressBar steps={trackingSteps} currentStep={2} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Estimated Delivery</p>
              <p className="text-2xl font-bold text-[#0D0D0D]">20-30 minutes</p>
            </div>
            <Badge variant="primary" gradient size="lg">
              <Clock className="w-4 h-4" />
              Out for Delivery
            </Badge>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="font-bold text-lg text-[#0D0D0D] mb-4">Delivery Address</h3>
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-[#C8102E] flex-shrink-0 mt-1" />
              <div>
                <p className="text-[#0D0D0D] font-medium">Home</p>
                <p className="text-sm text-[#6B7280] mt-1">
                  123, MG Road, Koramangala
                  <br />
                  Bangalore, Karnataka 560034
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-lg text-[#0D0D0D] mb-4">Delivery Partner</h3>
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#C8102E] to-[#E02F2F] rounded-full flex items-center justify-center text-white font-bold">
                  RK
                </div>
                <div>
                  <p className="text-[#0D0D0D] font-medium">Rajesh Kumar</p>
                  <p className="text-sm text-[#6B7280]">Logistics Partner</p>
                </div>
              </div>
              <button className="p-3 bg-[#2A7D46] text-white rounded-full hover:bg-[#236838] transition-colors">
                <Phone className="w-5 h-5" />
              </button>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="font-bold text-lg text-[#0D0D0D] mb-4">Order Timeline</h3>
          <div className="space-y-6">
            {[
              {
                time: '2:45 PM',
                status: 'Out for Delivery',
                description: 'Your order is on the way',
                active: true,
              },
              {
                time: '2:30 PM',
                status: 'Ready for Pickup',
                description: 'Package prepared by distributor',
                active: false,
              },
              {
                time: '2:15 PM',
                status: 'Order Accepted',
                description: 'Your order has been accepted',
                active: false,
              },
              {
                time: '2:10 PM',
                status: 'Order Placed',
                description: 'Order confirmed successfully',
                active: false,
              },
            ].map((event, index) => (
              <div key={index} className="flex gap-4">
                <div className="relative">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      event.active
                        ? 'bg-gradient-to-br from-[#F8C300] to-[#FFD95E]'
                        : 'bg-gradient-to-br from-[#2A7D46] to-[#6FCF97]'
                    }`}
                  >
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  {index < 3 && (
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-[#E5E7EB]" />
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-[#0D0D0D]">{event.status}</p>
                    <p className="text-sm text-[#6B7280]">{event.time}</p>
                  </div>
                  <p className="text-sm text-[#6B7280]">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
