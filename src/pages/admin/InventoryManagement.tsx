import { Package, AlertTriangle, TrendingUp, TrendingDown, Plus } from 'lucide-react';
import { Card } from '../../components/tdhecommercepages/Card';
import { Button } from '../../components/tdhecommercepages/Button';
import { Badge } from '../../components/tdhecommercepages/Badge';

const inventoryData = [
  {
    id: '1',
    name: 'Premium Atta',
    category: 'Flour',
    factoryStock: 5000,
    distributorStock: 850,
    reorderLevel: 1000,
    lastUpdated: '2 hours ago',
    trend: 'down',
    change: -15,
  },
  {
    id: '2',
    name: 'Basmati Rice',
    category: 'Rice',
    factoryStock: 3500,
    distributorStock: 620,
    reorderLevel: 800,
    lastUpdated: '1 hour ago',
    trend: 'up',
    change: 8,
  },
  {
    id: '3',
    name: 'Turmeric Powder',
    category: 'Spices',
    factoryStock: 450,
    distributorStock: 180,
    reorderLevel: 500,
    lastUpdated: '30 min ago',
    trend: 'down',
    change: -25,
  },
];

export function InventoryManagement() {
  const handleUpdateStock = (productName: string) => {
    alert(`Opening stock update form for: ${productName}`);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="bg-gradient-to-br from-[#D6AF37] to-[#FBE9A6] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-[#0D0D0D] mb-2">Inventory Management</h1>
              <p className="text-lg text-[#0D0D0D] opacity-80">
                Factory & distributor stock tracking
              </p>
            </div>
            <Button variant="primary" gradient onClick={() => alert('Add new product')}>
              <Plus className="w-5 h-5" />
              Add Product
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-[#6B7280] font-medium">Total SKUs</p>
              <Package className="w-8 h-8 text-[#C8102E] opacity-20" />
            </div>
            <p className="text-3xl font-bold text-[#0D0D0D]">48</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-[#6B7280] font-medium">Low Stock Items</p>
              <AlertTriangle className="w-8 h-8 text-[#F4A300] opacity-20" />
            </div>
            <p className="text-3xl font-bold text-[#F4A300]">8</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-[#6B7280] font-medium">Factory Stock Value</p>
              <TrendingUp className="w-8 h-8 text-[#2A7D46] opacity-20" />
            </div>
            <p className="text-3xl font-bold text-[#0D0D0D]">₹45.2L</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-[#6B7280] font-medium">Distributor Stock</p>
              <TrendingDown className="w-8 h-8 text-[#6B7280] opacity-20" />
            </div>
            <p className="text-3xl font-bold text-[#0D0D0D]">₹12.8L</p>
          </Card>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-[#F9FAFB] to-[#E5E7EB]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0D0D0D]">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0D0D0D]">
                    Category
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-[#0D0D0D]">
                    Factory Stock
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-[#0D0D0D]">
                    Distributor Stock
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[#0D0D0D]">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[#0D0D0D]">
                    Trend
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[#0D0D0D]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {inventoryData.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-[#0D0D0D]">{item.name}</p>
                      <p className="text-xs text-[#6B7280]">Updated {item.lastUpdated}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="muted" size="sm">
                        {item.category}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="font-bold text-[#0D0D0D]">{item.factoryStock.toLocaleString()}</p>
                      <p className="text-xs text-[#6B7280]">kg</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="font-bold text-[#0D0D0D]">{item.distributorStock}</p>
                      <p className="text-xs text-[#6B7280]">kg</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.factoryStock < item.reorderLevel ? (
                        <Badge variant="danger" gradient size="sm">
                          Low Stock
                        </Badge>
                      ) : (
                        <Badge variant="success" gradient size="sm">
                          In Stock
                        </Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {item.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-[#2A7D46]" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-[#E02F2F]" />
                        )}
                        <span
                          className={`text-sm font-semibold ${
                            item.trend === 'up' ? 'text-[#2A7D46]' : 'text-[#E02F2F]'
                          }`}
                        >
                          {item.change}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdateStock(item.name)}
                      >
                        Update
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
