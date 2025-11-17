import {
  Home,
  Package,
  ShoppingCart,
  User,
  LayoutDashboard,
  Truck,
  Settings,
  FileText,
  MessageSquare,
  Crown,
  AlertTriangle,
} from 'lucide-react';
import type { UserRole } from '../../types';

interface NavigationProps {
  role: UserRole;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ role, currentPage, onNavigate }: NavigationProps) {
  const customerNav = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'products', label: 'Products', icon: <Package className="w-5 h-5" /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingCart className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  const distributorNav = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'orders', label: 'Orders', icon: <Package className="w-5 h-5" /> },
    { id: 'inventory', label: 'Inventory', icon: <ShoppingCart className="w-5 h-5" /> },
    { id: 'performance', label: 'Performance', icon: <User className="w-5 h-5" /> },
  ];

  const logisticsNav = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'pickups', label: 'Pickups', icon: <Package className="w-5 h-5" /> },
    { id: 'deliveries', label: 'Deliveries', icon: <Truck className="w-5 h-5" /> },
    { id: 'performance', label: 'Performance', icon: <User className="w-5 h-5" /> },
  ];

  const adminNav = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'chairman', label: 'Executive', icon: <Crown className="w-5 h-5" /> },
    { id: 'inventory', label: 'Inventory', icon: <Package className="w-5 h-5" /> },
    { id: 'support', label: 'Support', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'taxation', label: 'Taxation', icon: <FileText className="w-5 h-5" /> },
    { id: 'it-monitoring', label: 'IT Monitor', icon: <AlertTriangle className="w-5 h-5" /> },
  ];

  const navItems = {
    customer: customerNav,
    distributor: distributorNav,
    logistics: logisticsNav,
    admin: adminNav,
  }[role];

  return (
    <nav className="bg-white border-b border-[#E5E7EB] sticky md:sticky lg:sticky top-0 z-50 fixed py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#C8102E] to-[#E02F2F] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">TDH</span>
            </div>
            <span className="font-bold text-md md:text-xl  lg:text-xl text-[#0D0D0D]">Tenali Double Horse</span>
          </div>

          <div className="flex items-center gap-1 md:gap-2 lg:gap-2 px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-2 md:px-4 lg:px-4 py-2 rounded-lg font-medium transition-all ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-[#C8102E] to-[#E02F2F] text-white'
                    : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                }`}
              >
                {item.icon}
                <span className="hidden md:inline">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navigation
