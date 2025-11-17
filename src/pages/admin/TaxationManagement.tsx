import { FileText, TrendingUp, Calendar, Download } from 'lucide-react';
import { Card } from '../../components/tdhecommercepages/Card';
import { Button } from '../../components/tdhecommercepages/Button';
import { Badge } from '../../components/tdhecommercepages/Badge';

const taxRecords = [
  {
    month: 'January 2025',
    gst: 245000,
    sgst: 122500,
    cgst: 122500,
    igst: 85000,
    tds: 35000,
    totalSales: 2450000,
    filed: true,
  },
  {
    month: 'February 2025',
    gst: 298000,
    sgst: 149000,
    cgst: 149000,
    igst: 102000,
    tds: 42000,
    totalSales: 2980000,
    filed: true,
  },
  {
    month: 'March 2025',
    gst: 312000,
    sgst: 156000,
    cgst: 156000,
    igst: 95000,
    tds: 45000,
    totalSales: 3120000,
    filed: false,
  },
];

export function TaxationManagement() {
  const handleDownloadReport = (month: string) => {
    alert(`📄 Downloading tax report for ${month}`);
  };

  const handleFileReturn = (month: string) => {
    alert(`✓ Filing tax return for ${month}`);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="bg-gradient-to-br from-[#D6AF37] to-[#FBE9A6] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-[#0D0D0D] mb-2">Taxation Management</h1>
          <p className="text-lg text-[#0D0D0D] opacity-80">
            GST, TDS, and tax compliance tracking
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card gradient="sunrise" className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-[#0D0D0D] font-medium">Total GST (MTD)</p>
              <FileText className="w-8 h-8 text-[#0D0D0D] opacity-20" />
            </div>
            <p className="text-3xl font-bold text-[#0D0D0D]">₹3.12L</p>
            <p className="text-xs text-[#0D0D0D] opacity-70 mt-1">+8% from last month</p>
          </Card>

          <Card gradient="green-mist" className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-white font-medium">TDS Collected</p>
              <TrendingUp className="w-8 h-8 text-white opacity-20" />
            </div>
            <p className="text-3xl font-bold text-white">₹45K</p>
            <p className="text-xs text-white opacity-70 mt-1">Current quarter</p>
          </Card>

          <Card gradient="spice-red" className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-white font-medium">Pending Returns</p>
              <Calendar className="w-8 h-8 text-white opacity-20" />
            </div>
            <p className="text-3xl font-bold text-white">1</p>
            <p className="text-xs text-white opacity-70 mt-1">Due by 20th March</p>
          </Card>

          <Card gradient="gold-glow" className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-[#0D0D0D] font-medium">Compliance Score</p>
              <FileText className="w-8 h-8 text-[#0D0D0D] opacity-20" />
            </div>
            <p className="text-3xl font-bold text-[#0D0D0D]">98%</p>
            <p className="text-xs text-[#0D0D0D] opacity-70 mt-1">Excellent standing</p>
          </Card>
        </div>

        <Card className="overflow-hidden mb-8">
          <div className="p-6 bg-gradient-to-r from-[#FFFDF2] to-[#FFF4C6] border-b border-[#E5E7EB]">
            <h2 className="text-2xl font-bold text-[#0D0D0D]">Monthly Tax Records</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F9FAFB]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0D0D0D]">
                    Period
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-[#0D0D0D]">
                    Total Sales
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-[#0D0D0D]">
                    GST (18%)
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-[#0D0D0D]">
                    SGST
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-[#0D0D0D]">
                    CGST
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-[#0D0D0D]">
                    IGST
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-[#0D0D0D]">
                    TDS
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[#0D0D0D]">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[#0D0D0D]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {taxRecords.map((record, idx) => (
                  <tr key={idx} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-[#0D0D0D]">{record.month}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="font-bold text-[#0D0D0D]">
                        ₹{(record.totalSales / 100000).toFixed(1)}L
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="font-semibold text-[#0D0D0D]">
                        ₹{(record.gst / 1000).toFixed(0)}K
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-[#6B7280]">₹{(record.sgst / 1000).toFixed(0)}K</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-[#6B7280]">₹{(record.cgst / 1000).toFixed(0)}K</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-[#6B7280]">₹{(record.igst / 1000).toFixed(0)}K</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-[#6B7280]">₹{(record.tds / 1000).toFixed(0)}K</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {record.filed ? (
                        <Badge variant="success" gradient size="sm">
                          Filed
                        </Badge>
                      ) : (
                        <Badge variant="warning" gradient size="sm">
                          Pending
                        </Badge>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadReport(record.month)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        {!record.filed && (
                          <Button
                            variant="primary"
                            gradient
                            size="sm"
                            onClick={() => handleFileReturn(record.month)}
                          >
                            File Return
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold text-[#0D0D0D] mb-4">Tax Breakdown (Current Month)</h3>
            <div className="space-y-4">
              {[
                { label: 'SGST (9%)', value: 156000, color: '#2A7D46' },
                { label: 'CGST (9%)', value: 156000, color: '#F8C300' },
                { label: 'IGST (18%)', value: 95000, color: '#C8102E' },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-[#0D0D0D]">{item.label}</span>
                    <span className="text-sm font-bold text-[#0D0D0D]">
                      ₹{(item.value / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(item.value / 312000) * 100}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold text-[#0D0D0D] mb-4">Upcoming Deadlines</h3>
            <div className="space-y-4">
              {[
                { task: 'GSTR-1 Filing', date: '11th March 2025', priority: 'high' },
                { task: 'GSTR-3B Filing', date: '20th March 2025', priority: 'high' },
                { task: 'TDS Return Q4', date: '31st March 2025', priority: 'medium' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-gradient-to-r from-[#F9FAFB] to-[#E5E7EB] rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-[#0D0D0D]">{item.task}</p>
                      <p className="text-sm text-[#6B7280]">{item.date}</p>
                    </div>
                    <Badge
                      variant={item.priority === 'high' ? 'danger' : 'warning'}
                      gradient
                      size="sm"
                    >
                      {item.priority}
                    </Badge>
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
