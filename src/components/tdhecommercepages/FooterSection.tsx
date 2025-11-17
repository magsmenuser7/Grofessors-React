import type { UserRole } from '../../types';

interface FooterProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole, page: string) => void;
}

export function FooterSection({ currentRole, onRoleChange }: FooterProps) {
  return (
    <footer className="bg-white border-t-2 border-[#E5E7EB] mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#C8102E] to-[#E02F2F] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-2xl">TDH</span>
              </div>
              <span className="font-bold text-xl text-[#0D0D0D]">Tenali Double Horse</span>
            </div>
            <p className="text-sm text-[#6B7280]">
              Authentic quality FMCG products delivered fresh through hyper-local fulfillment.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-[#0D0D0D] mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-[#6B7280]">
              <li>
                <a href="#" className="hover:text-[#C8102E] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C8102E] transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C8102E] transition-colors">
                  Distributors
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C8102E] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[#0D0D0D] mb-4">Demo Mode</h3>
            <p className="text-sm text-[#6B7280] mb-3">
              Switch between different user roles to explore the platform
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onRoleChange('customer', 'home')}
                className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                  currentRole === 'customer'
                    ? 'bg-gradient-to-r from-[#C8102E] to-[#E02F2F] text-white shadow-md'
                    : 'bg-[#F9FAFB] text-[#6B7280] hover:bg-[#E5E7EB]'
                }`}
              >
                Customer
              </button>
              <button
                onClick={() => onRoleChange('distributor', 'dashboard')}
                className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                  currentRole === 'distributor'
                    ? 'bg-gradient-to-r from-[#C8102E] to-[#E02F2F] text-white shadow-md'
                    : 'bg-[#F9FAFB] text-[#6B7280] hover:bg-[#E5E7EB]'
                }`}
              >
                Distributor
              </button>
              <button
                onClick={() => onRoleChange('logistics', 'dashboard')}
                className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                  currentRole === 'logistics'
                    ? 'bg-gradient-to-r from-[#C8102E] to-[#E02F2F] text-white shadow-md'
                    : 'bg-[#F9FAFB] text-[#6B7280] hover:bg-[#E5E7EB]'
                }`}
              >
                Logistics
              </button>
              <button
                onClick={() => onRoleChange('admin', 'dashboard')}
                className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                  currentRole === 'admin'
                    ? 'bg-gradient-to-r from-[#C8102E] to-[#E02F2F] text-white shadow-md'
                    : 'bg-[#F9FAFB] text-[#6B7280] hover:bg-[#E5E7EB]'
                }`}
              >
                Admin
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#E5E7EB] text-center text-sm text-[#6B7280]">
          <p>&copy; 2025 Tenali Double Horse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
