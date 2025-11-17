import { Package, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';
import type { Order, OrderStatus } from '../../types';

interface OrderCardProps {
  order: Order;
  onClick?: () => void;
}

const statusConfig: Record<
  OrderStatus,
  { label: string; variant: 'success' | 'warning' | 'danger' | 'primary' | 'muted'; icon: React.ReactNode }
> = {
  pending: {
    label: 'Pending',
    variant: 'warning',
    icon: <Clock className="w-4 h-4" />,
  },
  accepted: {
    label: 'Accepted',
    variant: 'primary',
    icon: <CheckCircle className="w-4 h-4" />,
  },
  preparing: {
    label: 'Preparing',
    variant: 'warning',
    icon: <Package className="w-4 h-4" />,
  },
  ready_for_pickup: {
    label: 'Ready for Pickup',
    variant: 'primary',
    icon: <Package className="w-4 h-4" />,
  },
  picked_up: {
    label: 'Picked Up',
    variant: 'primary',
    icon: <Truck className="w-4 h-4" />,
  },
  out_for_delivery: {
    label: 'Out for Delivery',
    variant: 'primary',
    icon: <Truck className="w-4 h-4" />,
  },
  delivered: {
    label: 'Delivered',
    variant: 'success',
    icon: <CheckCircle className="w-4 h-4" />,
  },
  cancelled: {
    label: 'Cancelled',
    variant: 'danger',
    icon: <XCircle className="w-4 h-4" />,
  },
};

export function OrderCard({ order, onClick }: OrderCardProps) {
  const config = statusConfig[order.status];

  return (
    <div className="cursor-pointer" onClick={onClick}>
      <Card hover>
        <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-[#6B7280] font-medium">Order #{order.id.slice(0, 8)}</p>
            <p className="text-xs text-[#6B7280] mt-1">
              {new Date(order.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>
          <Badge variant={config.variant} gradient>
            <span className="flex items-center gap-1">
              {config.icon}
              {config.label}
            </span>
          </Badge>
        </div>
        

        <div className="space-y-2 mb-4">
          {order.items.slice(0, 2).map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-[#0D0D0D]">
                {item.productName} x{item.quantity}
              </span>
              <span className="font-semibold text-[#0D0D0D]">₹{item.price * item.quantity}</span>
            </div>
          ))}
          {order.items.length > 2 && (
            <p className="text-xs text-[#6B7280]">+{order.items.length - 2} more items</p>
          )}
        </div>

        <div className="pt-4 border-t border-[#E5E7EB] flex justify-between items-center">
          <span className="text-sm font-medium text-[#6B7280]">Total</span>
          <span className="text-xl font-bold text-[#C8102E]">₹{order.total}</span>
      </div>
      </div>
    </Card>
  </div>
  );    
}

