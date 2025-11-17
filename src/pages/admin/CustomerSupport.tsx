import { MessageSquare, Clock, CheckCircle, AlertCircle, User, Phone, Mail } from 'lucide-react';
import { Card } from '../../components/tdhecommercepages/Card';
import { Button } from '../../components/tdhecommercepages/Button';
import { Badge } from '../../components/tdhecommercepages/Badge';

const supportTickets = [
  {
    id: 'TKT-1001',
    customer: 'Amit Singh',
    email: 'amit.singh@email.com',
    phone: '+91 98765 43210',
    issue: 'Order not delivered',
    orderId: '#12345678',
    priority: 'high',
    status: 'open',
    createdAt: '2 hours ago',
    category: 'Delivery',
  },
  {
    id: 'TKT-1002',
    customer: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43211',
    issue: 'Product quality concern',
    orderId: '#87654321',
    priority: 'medium',
    status: 'in_progress',
    createdAt: '5 hours ago',
    category: 'Quality',
  },
  {
    id: 'TKT-1003',
    customer: 'Rajesh Kumar',
    email: 'rajesh.k@email.com',
    phone: '+91 98765 43212',
    issue: 'Payment issue',
    orderId: '#45678912',
    priority: 'high',
    status: 'open',
    createdAt: '1 hour ago',
    category: 'Payment',
  },
];

export function CustomerSupport() {
  const handleResolveTicket = (ticketId: string) => {
    alert(`✓ Ticket ${ticketId} marked as resolved!`);
  };

  const handleContactCustomer = (customer: string, phone: string) => {
    alert(`📞 Calling ${customer}\n${phone}`);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="bg-gradient-to-br from-[#2A7D46] to-[#6FCF97] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-2">Customer Support</h1>
          <p className="text-lg text-white opacity-90">Manage customer inquiries and issues</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-[#6B7280] font-medium">Open Tickets</p>
              <AlertCircle className="w-8 h-8 text-[#E02F2F] opacity-20" />
            </div>
            <p className="text-3xl font-bold text-[#E02F2F]">12</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-[#6B7280] font-medium">In Progress</p>
              <Clock className="w-8 h-8 text-[#F4A300] opacity-20" />
            </div>
            <p className="text-3xl font-bold text-[#F4A300]">8</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-[#6B7280] font-medium">Resolved Today</p>
              <CheckCircle className="w-8 h-8 text-[#2A7D46] opacity-20" />
            </div>
            <p className="text-3xl font-bold text-[#2A7D46]">24</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-[#6B7280] font-medium">Avg Response Time</p>
              <MessageSquare className="w-8 h-8 text-[#C8102E] opacity-20" />
            </div>
            <p className="text-3xl font-bold text-[#0D0D0D]">12 min</p>
          </Card>
        </div>

        <div className="space-y-4">
          {supportTickets.map((ticket) => (
            <Card key={ticket.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#C8102E] to-[#E02F2F] rounded-full flex items-center justify-center text-white font-bold">
                    {ticket.customer.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg text-[#0D0D0D]">{ticket.customer}</h3>
                      <Badge
                        variant={
                          ticket.priority === 'high'
                            ? 'danger'
                            : ticket.priority === 'medium'
                            ? 'warning'
                            : 'muted'
                        }
                        gradient
                        size="sm"
                      >
                        {ticket.priority}
                      </Badge>
                      <Badge
                        variant={
                          ticket.status === 'open'
                            ? 'warning'
                            : ticket.status === 'in_progress'
                            ? 'primary'
                            : 'success'
                        }
                        size="sm"
                      >
                        {ticket.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#6B7280] mb-2">
                      Ticket: {ticket.id} • {ticket.createdAt} • {ticket.category}
                    </p>
                    <p className="font-semibold text-[#0D0D0D] mb-2">{ticket.issue}</p>
                    <p className="text-sm text-[#6B7280]">Order: {ticket.orderId}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                        <Mail className="w-4 h-4" />
                        {ticket.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                        <Phone className="w-4 h-4" />
                        {ticket.phone}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleContactCustomer(ticket.customer, ticket.phone)}
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </Button>
                  <Button
                    variant="success"
                    gradient
                    size="sm"
                    onClick={() => handleResolveTicket(ticket.id)}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Resolve
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
