'use client';
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  TicketIcon, 
  PlusIcon, 
  UserIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  ChatBubbleLeftIcon,
  DocumentTextIcon 
} from "@heroicons/react/24/outline";

export default function TicketSystemDemo() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const statusOptions = [
    { id: 'all', name: 'All Tickets', count: 15 },
    { id: 'open', name: 'Open', count: 8 },
    { id: 'in-progress', name: 'In Progress', count: 4 },
    { id: 'resolved', name: 'Resolved', count: 2 },
    { id: 'closed', name: 'Closed', count: 1 },
  ];

  const tickets = [
    {
      id: 'TK-001',
      title: 'Login Issue - Cannot access dashboard',
      description: 'User unable to login after password reset',
      status: 'open',
      priority: 'high',
      assignee: 'John Doe',
      reporter: 'Jane Smith',
      created: '2 hours ago',
      updated: '30 mins ago',
      category: 'Authentication'
    },
    {
      id: 'TK-002',
      title: 'Server Performance Slow',
      description: 'Database queries taking too long to execute',
      status: 'in-progress',
      priority: 'medium',
      assignee: 'Mike Johnson',
      reporter: 'Admin',
      created: '1 day ago',
      updated: '2 hours ago',
      category: 'Performance'
    },
    {
      id: 'TK-003',
      title: 'Email Notification Not Working',
      description: 'Users not receiving email notifications for updates',
      status: 'open',
      priority: 'low',
      assignee: 'Sarah Wilson',
      reporter: 'Tom Brown',
      created: '3 hours ago',
      updated: '1 hour ago',
      category: 'Email System'
    },
    {
      id: 'TK-004',
      title: 'Mobile App Crash on iOS',
      description: 'App crashes when opening profile page on iOS devices',
      status: 'resolved',
      priority: 'high',
      assignee: 'Alex Chen',
      reporter: 'User123',
      created: '2 days ago',
      updated: '4 hours ago',
      category: 'Mobile'
    },
    {
      id: 'TK-005',
      title: 'Feature Request: Dark Mode',
      description: 'Request to add dark mode theme to the application',
      status: 'in-progress',
      priority: 'low',
      assignee: 'UI Team',
      reporter: 'Multiple Users',
      created: '1 week ago',
      updated: '1 day ago',
      category: 'Feature Request'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'in-progress':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'resolved':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'closed':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-400';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'low':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <ExclamationTriangleIcon className="w-4 h-4" />;
      case 'in-progress':
        return <ArrowPathIcon className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircleIcon className="w-4 h-4" />;
      case 'closed':
        return <XCircleIcon className="w-4 h-4" />;
      default:
        return <TicketIcon className="w-4 h-4" />;
    }
  };

  const filteredTickets = selectedStatus === 'all' 
    ? tickets 
    : tickets.filter(ticket => ticket.status === selectedStatus);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <TicketIcon className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Ticket Management System</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => setShowCreateModal(true)}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              New Ticket
            </Button>
            <UserIcon className="w-6 h-6" />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {statusOptions.map((status, index) => (
            <motion.div
              key={status.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`cursor-pointer transition-all ${
                  selectedStatus === status.id 
                    ? 'bg-blue-500/20 border-blue-500' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
                onClick={() => setSelectedStatus(status.id)}
              >
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-400">{status.count}</p>
                  <p className="text-sm text-gray-400">{status.name}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          {filteredTickets.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono text-blue-400">{ticket.id}</span>
                        <Badge className={getStatusColor(ticket.status)}>
                          {getStatusIcon(ticket.status)}
                          <span className="ml-1 capitalize">{ticket.status}</span>
                        </Badge>
                        <Badge className={getPriorityColor(ticket.priority)}>
                          {ticket.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{ticket.title}</h3>
                      <p className="text-gray-400 text-sm mb-3">{ticket.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Category: {ticket.category}</span>
                        <span>Reporter: {ticket.reporter}</span>
                        <span>Assignee: {ticket.assignee}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <ClockIcon className="w-3 h-3" />
                        Created {ticket.created}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <ArrowPathIcon className="w-3 h-3" />
                        Updated {ticket.updated}
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline">
                          <ChatBubbleLeftIcon className="w-4 h-4 mr-1" />
                          Comment
                        </Button>
                        <Button size="sm" variant="outline">
                          <DocumentTextIcon className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Create Ticket Modal Placeholder */}
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gray-900 p-6 rounded-lg max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">Create New Ticket</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    className="w-full p-2 bg-white/10 border border-white/20 rounded"
                    placeholder="Enter ticket title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    className="w-full p-2 bg-white/10 border border-white/20 rounded h-24"
                    placeholder="Describe the issue..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Priority</label>
                    <select className="w-full p-2 bg-white/10 border border-white/20 rounded">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select className="w-full p-2 bg-white/10 border border-white/20 rounded">
                      <option value="bug">Bug</option>
                      <option value="feature">Feature Request</option>
                      <option value="support">Support</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button className="flex-1">Create Ticket</Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6 text-center">
              <TicketIcon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Ticket Management</h3>
              <p className="text-gray-400">Create, assign, and track tickets efficiently</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6 text-center">
              <ChatBubbleLeftIcon className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Real-time Updates</h3>
              <p className="text-gray-400">Get instant notifications on ticket changes</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6 text-center">
              <DocumentTextIcon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Detailed Reports</h3>
              <p className="text-gray-400">Generate comprehensive ticket analytics</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}