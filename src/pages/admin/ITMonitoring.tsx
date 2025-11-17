import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  Server,
  Database,
  Wifi,
  Clock,
} from 'lucide-react';
import { Card } from '../../components/tdhecommercepages/Card';
import { Badge } from '../../components/tdhecommercepages/Badge';
import { Button } from '../../components/tdhecommercepages/Button';

const systemErrors = [
  {
    id: 'ERR-5001',
    severity: 'critical',
    service: 'Payment Gateway',
    message: 'Connection timeout to payment processor',
    timestamp: '2 min ago',
    status: 'open',
    affectedUsers: 15,
  },
  {
    id: 'ERR-5002',
    severity: 'warning',
    service: 'Order Processing',
    message: 'High memory usage detected',
    timestamp: '15 min ago',
    status: 'investigating',
    affectedUsers: 0,
  },
  {
    id: 'ERR-5003',
    severity: 'error',
    service: 'Inventory Sync',
    message: 'Failed to sync distributor inventory',
    timestamp: '1 hour ago',
    status: 'open',
    affectedUsers: 3,
  },
];

const systemMetrics = [
  { name: 'API Server', status: 'healthy', uptime: 99.98, responseTime: 45 },
  { name: 'Database', status: 'healthy', uptime: 99.99, responseTime: 12 },
  { name: 'Payment Gateway', status: 'degraded', uptime: 98.5, responseTime: 850 },
  { name: 'Order Service', status: 'healthy', uptime: 99.95, responseTime: 65 },
];

export function ITMonitoring() {
  const handleResolveError = (errorId: string) => {
    alert(`✓ Marking error ${errorId} as resolved`);
  };

  const handleInvestigate = (errorId: string) => {
    alert(`🔍 Opening investigation dashboard for ${errorId}`);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="bg-gradient-to-br from-[#C8102E] to-[#E02F2F] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">IT Error Monitoring</h1>
              <p className="text-lg text-white opacity-90">System health and error tracking</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#2A7D46] rounded-full animate-pulse" />
              <span className="text-white font-medium">Live Monitoring</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card gradient="spice-red" className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-white font-medium">Critical Errors</p>
              <XCircle className="w-8 h-8 text-white opacity-30" />
            </div>
            <p className="text-4xl font-bold text-white">1</p>
            <p className="text-xs text-white opacity-80 mt-1">Requires immediate attention</p>
          </Card>

          <Card gradient="sunrise" className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-[#0D0D0D] font-medium">Warnings</p>
              <AlertTriangle className="w-8 h-8 text-[#0D0D0D] opacity-20" />
            </div>
            <p className="text-4xl font-bold text-[#0D0D0D]">3</p>
            <p className="text-xs text-[#0D0D0D] opacity-70 mt-1">Under investigation</p>
          </Card>

          <Card gradient="green-mist" className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-white font-medium">System Uptime</p>
              <Activity className="w-8 h-8 text-white opacity-30" />
            </div>
            <p className="text-4xl font-bold text-white">99.8%</p>
            <p className="text-xs text-white opacity-80 mt-1">Last 30 days</p>
          </Card>

          <Card gradient="gold-glow" className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-[#0D0D0D] font-medium">Resolved Today</p>
              <CheckCircle className="w-8 h-8 text-[#0D0D0D] opacity-20" />
            </div>
            <p className="text-4xl font-bold text-[#0D0D0D]">12</p>
            <p className="text-xs text-[#0D0D0D] opacity-70 mt-1">Avg resolution: 18min</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-[#0D0D0D] mb-6">System Health</h2>
            <div className="space-y-4">
              {systemMetrics.map((metric, idx) => (
                <div key={idx} className="p-4 bg-[#F9FAFB] rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          metric.status === 'healthy'
                            ? 'bg-gradient-to-br from-[#2A7D46] to-[#6FCF97]'
                            : 'bg-gradient-to-br from-[#F4A300] to-[#FFD95E]'
                        }`}
                      >
                        <Server className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0D0D0D]">{metric.name}</p>
                        <p className="text-xs text-[#6B7280]">
                          Response time: {metric.responseTime}ms
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={metric.status === 'healthy' ? 'success' : 'warning'}
                      gradient
                      size="sm"
                    >
                      {metric.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          metric.status === 'healthy'
                            ? 'bg-gradient-to-r from-[#2A7D46] to-[#6FCF97]'
                            : 'bg-gradient-to-r from-[#F4A300] to-[#FFD95E]'
                        }`}
                        style={{ width: `${metric.uptime}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-[#0D0D0D] min-w-[4rem] text-right">
                      {metric.uptime}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-[#0D0D0D] mb-6">Infrastructure Status</h2>
            <div className="space-y-4">
              {[
                { component: 'Web Servers (4)', status: 'operational', icon: Server },
                { component: 'Database Cluster', status: 'operational', icon: Database },
                { component: 'CDN Network', status: 'operational', icon: Wifi },
                { component: 'Load Balancer', status: 'operational', icon: Activity },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-[#F9FAFB] to-[#E5E7EB] rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#2A7D46] to-[#6FCF97] rounded-lg flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="font-semibold text-[#0D0D0D]">{item.component}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#2A7D46]" />
                    <span className="text-sm font-medium text-[#2A7D46]">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-2xl font-bold text-[#0D0D0D] mb-6">Active Errors & Warnings</h2>
          <div className="space-y-4">
            {systemErrors.map((error) => (
              <div
                key={error.id}
                className={`p-5 rounded-lg border-2 ${
                  error.severity === 'critical'
                    ? 'bg-gradient-to-r from-[#FEE2E2] to-[#FECACA] border-[#E02F2F]'
                    : error.severity === 'error'
                    ? 'bg-gradient-to-r from-[#FEF3C7] to-[#FDE68A] border-[#F4A300]'
                    : 'bg-[#F9FAFB] border-[#E5E7EB]'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        error.severity === 'critical'
                          ? 'bg-gradient-to-br from-[#E02F2F] to-[#FF6B6B]'
                          : error.severity === 'error'
                          ? 'bg-gradient-to-br from-[#F4A300] to-[#FFD95E]'
                          : 'bg-gradient-to-br from-[#6B7280] to-[#9CA3AF]'
                      }`}
                    >
                      {error.severity === 'critical' ? (
                        <XCircle className="w-6 h-6 text-white" />
                      ) : (
                        <AlertTriangle className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg text-[#0D0D0D]">{error.id}</h3>
                        <Badge
                          variant={
                            error.severity === 'critical'
                              ? 'danger'
                              : error.severity === 'error'
                              ? 'warning'
                              : 'muted'
                          }
                          gradient
                          size="sm"
                        >
                          {error.severity}
                        </Badge>
                        <Badge variant="primary" size="sm">
                          {error.status}
                        </Badge>
                      </div>
                      <p className="font-semibold text-[#0D0D0D] mb-2">{error.service}</p>
                      <p className="text-sm text-[#6B7280] mb-2">{error.message}</p>
                      <div className="flex items-center gap-4 text-sm text-[#6B7280]">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {error.timestamp}
                        </div>
                        {error.affectedUsers > 0 && (
                          <span className="text-[#E02F2F] font-semibold">
                            {error.affectedUsers} users affected
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleInvestigate(error.id)}
                    >
                      Investigate
                    </Button>
                    <Button
                      variant="success"
                      gradient
                      size="sm"
                      onClick={() => handleResolveError(error.id)}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Resolve
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
