'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { 
  UsersIcon, 
  ChartBarIcon, 
  BellIcon,
  ShieldCheckIcon,
  HomeIcon,
  CogIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ChartPieIcon,
  InboxIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  CodeBracketIcon,
  SparklesIcon,
  InformationCircleIcon,
  ArrowTrendingUpIcon,
  EyeIcon,
  PlusIcon
} from "@heroicons/react/24/outline";

export default function AdminDashboardDemo() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [showTechnologies, setShowTechnologies] = useState(false);

  const technologies = [
    {
      category: "Frontend Technologies",
      items: [
        { name: "Next.js 14", description: "React framework with App Router", color: "bg-neutral-800 text-white" },
        { name: "React 18", description: "Component-based UI library", color: "bg-neutral-700 text-white" },
        { name: "TypeScript", description: "Type-safe JavaScript", color: "bg-neutral-600 text-white" },
        { name: "Tailwind CSS", description: "Utility-first CSS framework", color: "bg-neutral-500 text-white" }
      ]
    },
    {
      category: "UI Components & Animation",
      items: [
        { name: "shadcn/ui", description: "Modern React components", color: "bg-stone-800 text-white" },
        { name: "Radix UI", description: "Accessible UI primitives", color: "bg-stone-700 text-white" },
        { name: "Framer Motion", description: "Animation library", color: "bg-stone-600 text-white" },
        { name: "Heroicons", description: "SVG icon library", color: "bg-stone-500 text-white" }
      ]
    },
    {
      category: "Dashboard Features",
      items: [
        { name: "Real-time Updates", description: "Live data monitoring", color: "bg-slate-800 text-white" },
        { name: "State Management", description: "React hooks for data flow", color: "bg-slate-700 text-white" },
        { name: "Responsive Layout", description: "Mobile-first design", color: "bg-slate-600 text-white" },
        { name: "Data Visualization", description: "Charts and analytics", color: "bg-slate-500 text-white" }
      ]
    },
    {
      category: "Admin Features",
      items: [
        { name: "User Management", description: "CRUD operations for users", color: "bg-gray-800 text-white" },
        { name: "Activity Logs", description: "System monitoring & logs", color: "bg-gray-700 text-white" },
        { name: "Access Control", description: "Role-based permissions", color: "bg-gray-600 text-white" },
        { name: "Analytics Dashboard", description: "Business intelligence", color: "bg-gray-500 text-white" }
      ]
    }
  ];

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: HomeIcon },
    { id: 'users', name: 'Users', icon: UsersIcon },
    { id: 'analytics', name: 'Analytics', icon: ChartPieIcon },
    { id: 'reports', name: 'Reports', icon: DocumentTextIcon },
    { id: 'teams', name: 'Teams', icon: UserGroupIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'settings', name: 'Settings', icon: CogIcon },
  ];

  const stats = [
    { 
      label: 'Total Users', 
      value: '1,234', 
      change: '+12%', 
      icon: UsersIcon, 
      trend: 'up',
      description: 'Active registered users'
    },
    { 
      label: 'Revenue', 
      value: '$45.2K', 
      change: '+18%', 
      icon: ChartBarIcon, 
      trend: 'up',
      description: 'Monthly recurring revenue'
    },
    { 
      label: 'System Health', 
      value: '98.5%', 
      change: '+2%', 
      icon: ShieldCheckIcon, 
      trend: 'up',
      description: 'Server uptime percentage'
    },
    { 
      label: 'Support Tickets', 
      value: '23', 
      change: '-15%', 
      icon: BellIcon, 
      trend: 'down',
      description: 'Open support requests'
    },
  ];

  const users = [
    { name: 'Sarah Johnson', email: 'sarah@company.com', role: 'Admin', status: 'Online', lastActive: '2 min ago', avatar: 'SJ' },
    { name: 'Michael Chen', email: 'michael@company.com', role: 'Editor', status: 'Away', lastActive: '1 hour ago', avatar: 'MC' },
    { name: 'Emily Davis', email: 'emily@company.com', role: 'Viewer', status: 'Offline', lastActive: '2 days ago', avatar: 'ED' },
    { name: 'David Wilson', email: 'david@company.com', role: 'Editor', status: 'Online', lastActive: '5 min ago', avatar: 'DW' },
    { name: 'Lisa Anderson', email: 'lisa@company.com', role: 'Admin', status: 'Online', lastActive: 'Just now', avatar: 'LA' },
  ];

  const activities = [
    { 
      type: 'user', 
      message: 'New user registration', 
      details: 'sarah@company.com joined the platform',
      time: '2 minutes ago',
      status: 'success'
    },
    { 
      type: 'system', 
      message: 'Database backup completed', 
      details: 'Automatic backup finished successfully',
      time: '15 minutes ago',
      status: 'info'
    },
    { 
      type: 'security', 
      message: 'Login attempt blocked', 
      details: 'Suspicious activity from IP 192.168.1.100',
      time: '1 hour ago',
      status: 'warning'
    },
    { 
      type: 'update', 
      message: 'System update deployed', 
      details: 'Version 2.1.0 deployed to production',
      time: '3 hours ago',
      status: 'info'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Online': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Away': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Offline': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return '👤';
      case 'system': return '⚙️';
      case 'security': return '🔒';
      case 'update': return '📦';
      default: return '📝';
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'success': return 'border-l-emerald-500 bg-emerald-50';
      case 'warning': return 'border-l-amber-500 bg-amber-50';
      case 'info': return 'border-l-blue-500 bg-blue-50';
      case 'error': return 'border-l-red-500 bg-red-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex">
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-white/80 backdrop-blur border-r border-gray-200/60 flex flex-col"
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Admin</h2>
                  <p className="text-xs text-gray-500">Dashboard</p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
            >
              {isSidebarOpen ? <XMarkIcon className="w-4 h-4" /> : <Bars3Icon className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <li key={item.id}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start h-10 ${!isSidebarOpen ? 'px-3' : 'px-3'} ${
                      isActive 
                        ? 'bg-gray-900 text-white hover:bg-gray-800' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/60'
                    }`}
                    onClick={() => setActiveMenu(item.id)}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {isSidebarOpen && <span className="ml-3 text-sm font-medium">{item.name}</span>}
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-100">
          <Button
            variant="ghost"
            className={`w-full justify-start h-10 text-gray-500 hover:text-gray-700 hover:bg-gray-100/60 ${!isSidebarOpen ? 'px-3' : 'px-3'}`}
          >
            <ArrowRightOnRectangleIcon className="w-4 h-4 flex-shrink-0" />
            {isSidebarOpen && <span className="ml-3 text-sm font-medium">Logout</span>}
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white/80 backdrop-blur border-b border-gray-200/60 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              <p className="text-gray-500 text-sm">Monitor your system performance and user activity</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pl-9 pr-4 py-2 w-64 bg-white/60 border-gray-200 focus:border-gray-300 text-sm"
                />
              </div>
              
              {/* Technologies Dialog */}
              <Dialog open={showTechnologies} onOpenChange={setShowTechnologies}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="border-gray-200 text-gray-600 hover:bg-gray-50">
                    <CodeBracketIcon className="w-4 h-4 mr-2" />
                    Tech Stack
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-gray-200">
                  <DialogHeader>
                    <DialogTitle className="text-xl flex items-center gap-2 text-gray-900">
                      <SparklesIcon className="w-6 h-6 text-gray-600" />
                      Technologies & Features Used
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Technologies and features implemented in this admin dashboard
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-8">
                    {technologies.map((tech, categoryIndex) => (
                      <motion.div
                        key={categoryIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: categoryIndex * 0.1 }}
                      >
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900">
                            <CogIcon className="w-5 h-5 text-gray-600" />
                            {tech.category}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {tech.items.map((item, itemIndex) => (
                              <motion.div
                                key={itemIndex}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: (categoryIndex * 0.1) + (itemIndex * 0.05) }}
                              >
                                <Card className="bg-gray-50/50 border-gray-200 hover:border-gray-300 transition-colors">
                                  <CardContent className="p-4">
                                    <Badge className={`${item.color} font-medium text-sm px-3 py-1 mb-2`}>
                                      {item.name}
                                    </Badge>
                                    <p className="text-gray-600 text-sm">{item.description}</p>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                        {categoryIndex < technologies.length - 1 && (
                          <Separator className="bg-gray-200" />
                        )}
                      </motion.div>
                    ))}

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-6"
                    >
                      <div className="flex items-start gap-3">
                        <InformationCircleIcon className="w-6 h-6 text-gray-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold mb-2 text-gray-900">About This Dashboard</h4>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            This admin dashboard demonstrates modern web development practices with a focus on clean design,
                            user experience, and maintainable code. Built with performance and accessibility in mind.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-gray-700 border-gray-300">
                              🎨 Clean Design
                            </Badge>
                            <Badge variant="outline" className="text-gray-700 border-gray-300">
                              📊 Data Visualization
                            </Badge>
                            <Badge variant="outline" className="text-gray-700 border-gray-300">
                              📱 Responsive
                            </Badge>
                            <Badge variant="outline" className="text-gray-700 border-gray-300">
                              ⚡ Performance
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="outline" size="sm" className="border-gray-200 text-gray-600 hover:bg-gray-50">
                <BellIcon className="w-4 h-4" />
              </Button>
              <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white font-medium text-sm">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/60 backdrop-blur border-gray-200/60 hover:bg-white/80 transition-all duration-200">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                          <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
                          <div className="flex items-center mt-2">
                            <ArrowTrendingUpIcon className={`w-3 h-3 mr-1 ${
                              stat.trend === 'up' ? 'text-emerald-600' : 'text-red-500'
                            }`} />
                            <span className={`text-sm font-medium ${
                              stat.trend === 'up' ? 'text-emerald-600' : 'text-red-500'
                            }`}>
                              {stat.change}
                            </span>
                            <span className="text-gray-500 text-sm ml-1">this month</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">{stat.description}</p>
                        </div>
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-gray-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* User Management */}
            <div className="lg:col-span-2">
              <Card className="bg-white/60 backdrop-blur border-gray-200/60">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900">Team Members</CardTitle>
                      <p className="text-sm text-gray-500">Manage user access and permissions</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-gray-200 text-gray-600 hover:bg-gray-50">
                        <EyeIcon className="w-4 h-4 mr-2" />
                        View All
                      </Button>
                      <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white">
                        <PlusIcon className="w-4 h-4 mr-2" />
                        Add User
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {users.map((user, index) => (
                    <motion.div
                      key={user.email}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-medium text-sm">
                          {user.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                          <p className="text-xs text-gray-400">{user.lastActive}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <Badge variant="outline" className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{user.role}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                          <EllipsisVerticalIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-white/60 backdrop-blur border-gray-200/60">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
                    <p className="text-sm text-gray-500">Latest system events</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-gray-200 text-gray-600 hover:bg-gray-50">
                    <InboxIcon className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {activities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 rounded-lg border-l-4 ${getActivityColor(activity.status)}`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-sm">{getActivityIcon(activity.type)}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-600 mt-1">{activity.details}</p>
                        <p className="text-xs text-gray-400 mt-2">{activity.time}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Analytics Placeholder */}
          <Card className="bg-white/60 backdrop-blur border-gray-200/60">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Analytics Overview</CardTitle>
              <p className="text-sm text-gray-500">System performance and user engagement metrics</p>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-50/50 rounded-lg flex items-center justify-center border border-gray-100">
                <div className="text-center">
                  <ChartBarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">Analytics Dashboard</p>
                  <p className="text-sm text-gray-500">Interactive charts and metrics would be displayed here</p>
                  <Button variant="outline" size="sm" className="mt-4 border-gray-200 text-gray-600 hover:bg-gray-50">
                    <EyeIcon className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}