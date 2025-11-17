import {
  TrendingUp,
  DollarSign,
  Users,
  Package,
  MapPin,
  Award,
  BarChart3,
  Target,
} from 'lucide-react';
import { Card } from '../../components/tdhecommercepages/Card';
import { KPICard } from '../../components/tdhecommercepages/KPICard';

export function ChairmanDashboard() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="bg-gradient-to-br from-[#C8102E] via-[#D6AF37] to-[#F8C300] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold text-white mb-3">Executive Dashboard</h1>
              <p className="text-xl text-white opacity-90">Strategic Overview & Key Metrics</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-white opacity-80">FY 2024-25 | Q4</p>
              <p className="text-2xl font-bold text-white">₹142.5 Cr Revenue</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            label="Revenue (YTD)"
            value="₹142.5Cr"
            change={24}
            trend="up"
            gradient="gold-glow"
            icon={<DollarSign className="w-12 h-12" />}
          />
          <KPICard
            label="Active Customers"
            value="1.2M"
            change={18}
            trend="up"
            gradient="green-mist"
            icon={<Users className="w-12 h-12" />}
          />
          <KPICard
            label="Market Share"
            value="34.5%"
            change={3.2}
            trend="up"
            gradient="sunrise"
            icon={<Target className="w-12 h-12" />}
          />
          <KPICard
            label="Brand Valuation"
            value="₹850Cr"
            change={12}
            trend="up"
            gradient="spice-red"
            icon={<Award className="w-12 h-12" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-[#0D0D0D] mb-6">Revenue Trends (₹ Crores)</h2>
              <div className="space-y-4">
                {[
                  { month: 'Q1 2024', value: 32, budget: 30, color: '#2A7D46' },
                  { month: 'Q2 2024', value: 35, budget: 32, color: '#F8C300' },
                  { month: 'Q3 2024', value: 38, budget: 35, color: '#D6AF37' },
                  { month: 'Q4 2024', value: 37.5, budget: 36, color: '#C8102E' },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-[#0D0D0D]">{item.month}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-[#6B7280]">
                          Budget: ₹{item.budget}Cr
                        </span>
                        <span className="text-sm font-bold text-[#0D0D0D]">
                          ₹{item.value}Cr
                        </span>
                      </div>
                    </div>
                    <div className="h-8 bg-[#E5E7EB] rounded-lg overflow-hidden relative">
                      <div
                        className="h-full rounded-lg transition-all duration-500"
                        style={{
                          width: `${(item.value / 40) * 100}%`,
                          background: `linear-gradient(90deg, ${item.color} 0%, ${item.color}CC 100%)`,
                        }}
                      />
                      <div
                        className="absolute top-0 h-full w-1 bg-[#0D0D0D]"
                        style={{ left: `${(item.budget / 40) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card gradient="dashboard-warm" className="p-6">
            <h3 className="text-xl font-bold text-[#0D0D0D] mb-6">Strategic Goals</h3>
            <div className="space-y-4">
              {[
                { goal: 'Market Expansion', progress: 85, status: 'On Track' },
                { goal: 'Digital Transformation', progress: 72, status: 'On Track' },
                { goal: 'Supply Chain Optimization', progress: 68, status: 'Attention' },
                { goal: 'Sustainability Initiatives', progress: 45, status: 'Behind' },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-semibold text-[#0D0D0D]">{item.goal}</p>
                    <span className="text-xs font-bold text-[#0D0D0D]">{item.progress}%</span>
                  </div>
                  <div className="h-2 bg-white rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        item.progress >= 80
                          ? 'bg-gradient-to-r from-[#2A7D46] to-[#6FCF97]'
                          : item.progress >= 60
                          ? 'bg-gradient-to-r from-[#F8C300] to-[#FFD95E]'
                          : 'bg-gradient-to-r from-[#E02F2F] to-[#FF6B6B]'
                      }`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#2A7D46] to-[#6FCF97] rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#6B7280]">SKUs</p>
                <p className="text-2xl font-bold text-[#0D0D0D]">48</p>
              </div>
            </div>
            <p className="text-xs text-[#2A7D46] font-semibold">+5 new this quarter</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#F8C300] to-[#FFD95E] rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#0D0D0D]" />
              </div>
              <div>
                <p className="text-sm text-[#6B7280]">Distributors</p>
                <p className="text-2xl font-bold text-[#0D0D0D]">285</p>
              </div>
            </div>
            <p className="text-xs text-[#2A7D46] font-semibold">+28 new partnerships</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D6AF37] to-[#FBE9A6] rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#0D0D0D]" />
              </div>
              <div>
                <p className="text-sm text-[#6B7280]">Growth Rate</p>
                <p className="text-2xl font-bold text-[#0D0D0D]">24%</p>
              </div>
            </div>
            <p className="text-xs text-[#2A7D46] font-semibold">YoY improvement</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#C8102E] to-[#E02F2F] rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#6B7280]">EBITDA Margin</p>
                <p className="text-2xl font-bold text-[#0D0D0D]">22.5%</p>
              </div>
            </div>
            <p className="text-xs text-[#2A7D46] font-semibold">+2.3% from last year</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold text-[#0D0D0D] mb-6">Regional Performance</h3>
            <div className="space-y-4">
              {[
                { region: 'South India', revenue: 52, growth: 28 },
                { region: 'North India', revenue: 35, growth: 22 },
                { region: 'West India', revenue: 28, growth: 18 },
                { region: 'East India', revenue: 27.5, growth: 20 },
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-[#F9FAFB] rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-[#0D0D0D]">{item.region}</p>
                    <div className="text-right">
                      <p className="text-lg font-bold text-[#0D0D0D]">₹{item.revenue}Cr</p>
                      <p className="text-xs text-[#2A7D46] font-semibold">+{item.growth}%</p>
                    </div>
                  </div>
                  <div className="h-2 bg-white rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#C8102E] to-[#F8C300] rounded-full"
                      style={{ width: `${(item.revenue / 52) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold text-[#0D0D0D] mb-6">Top Product Categories</h3>
            <div className="space-y-4">
              {[
                { category: 'Flour & Grains', share: 35, revenue: 49.9 },
                { category: 'Rice', share: 28, revenue: 39.9 },
                { category: 'Spices', share: 22, revenue: 31.4 },
                { category: 'Oil & Ghee', share: 15, revenue: 21.4 },
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-[#F9FAFB] rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-[#0D0D0D]">{item.category}</p>
                    <div className="text-right">
                      <p className="text-lg font-bold text-[#0D0D0D]">₹{item.revenue}Cr</p>
                      <p className="text-xs text-[#6B7280]">{item.share}% market share</p>
                    </div>
                  </div>
                  <div className="h-2 bg-white rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#2A7D46] to-[#6FCF97] rounded-full"
                      style={{ width: `${item.share * 2}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
