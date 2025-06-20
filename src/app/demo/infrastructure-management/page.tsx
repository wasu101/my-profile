'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  ServerIcon, 
  VideoCameraIcon, 
  FingerPrintIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  WifiIcon,
  ChartBarIcon,
  CodeBracketIcon,
  SparklesIcon,
  CogIcon,
  InformationCircleIcon,
  ArrowTrendingUpIcon,
  CpuChipIcon
} from "@heroicons/react/24/outline";

interface NetworkMetric {
  hour: string;
  bandwidth: number;
  latency: number;
}

interface SystemPerformance {
  time: string;
  cpu: number;
  memory: number;
  disk: number;
}

export default function InfrastructureDemo() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showTechnologies, setShowTechnologies] = useState(false);
  
  const servers = [
    { name: 'Web Server 01', status: 'online', cpu: 45, memory: 67, disk: 34, uptime: '99.9%' },
    { name: 'Database Server', status: 'online', cpu: 78, memory: 89, disk: 56, uptime: '99.5%' },
    { name: 'Backup Server', status: 'maintenance', cpu: 12, memory: 23, disk: 78, uptime: '95.2%' },
  ];

  const cctvCameras = [
    { location: 'Main Entrance', status: 'active', recording: true, resolution: '4K', fps: 30 },
    { location: 'Parking Lot', status: 'active', recording: true, resolution: '1080p', fps: 25 },
    { location: 'Office Floor 1', status: 'offline', recording: false, resolution: '1080p', fps: 0 },
    { location: 'Office Floor 2', status: 'active', recording: true, resolution: '4K', fps: 30 },
  ];

  const fingerprintDevices = [
    { location: 'Main Door', status: 'online', users: 245, todayAccess: 45 },
    { location: 'Server Room', status: 'online', users: 12, todayAccess: 8 },
    { location: 'Office Entry', status: 'error', users: 189, todayAccess: 0 },
  ];

  const networkMetrics = [
    { hour: '00:00', bandwidth: 45, latency: 12 },
    { hour: '04:00', bandwidth: 23, latency: 8 },
    { hour: '08:00', bandwidth: 78, latency: 15 },
    { hour: '12:00', bandwidth: 92, latency: 18 },
    { hour: '16:00', bandwidth: 85, latency: 14 },
    { hour: '20:00', bandwidth: 67, latency: 11 },
  ];

  // Additional data for more charts
  const systemPerformance = [
    { time: '1h ago', cpu: 65, memory: 78, disk: 45 },
    { time: '2h ago', cpu: 58, memory: 72, disk: 43 },
    { time: '3h ago', cpu: 72, memory: 85, disk: 47 },
    { time: '4h ago', cpu: 45, memory: 65, disk: 41 },
    { time: '5h ago', cpu: 52, memory: 70, disk: 44 },
    { time: '6h ago', cpu: 67, memory: 82, disk: 48 },
  ];

  const accessLogs = [
    { hour: '00:00', successful: 25, failed: 2 },
    { hour: '04:00', successful: 12, failed: 1 },
    { hour: '08:00', successful: 45, failed: 3 },
    { hour: '12:00', successful: 67, failed: 4 },
    { hour: '16:00', successful: 52, failed: 2 },
    { hour: '20:00', successful: 38, failed: 1 },
  ];

  const technologies = [
    {
      category: "Frontend Technologies",
      items: [
        { name: "Next.js 14", description: "React framework with App Router", color: "bg-black text-white" },
        { name: "React 18", description: "Component-based UI library", color: "bg-blue-600 text-white" },
        { name: "TypeScript", description: "Type-safe JavaScript", color: "bg-blue-500 text-white" },
        { name: "Tailwind CSS", description: "Utility-first CSS framework", color: "bg-cyan-500 text-white" }
      ]
    },
    {
      category: "UI Components & Animation",
      items: [
        { name: "shadcn/ui", description: "Modern React components", color: "bg-slate-900 text-white" },
        { name: "Radix UI", description: "Accessible UI primitives", color: "bg-purple-600 text-white" },
        { name: "Framer Motion", description: "Animation library", color: "bg-pink-500 text-white" },
        { name: "Heroicons", description: "SVG icon library", color: "bg-indigo-600 text-white" }
      ]
    },
    {
      category: "Dashboard Features",
      items: [
        { name: "Real-time Monitoring", description: "Live system status updates", color: "bg-green-600 text-white" },
        { name: "Interactive Charts", description: "CSS-based data visualization", color: "bg-orange-600 text-white" },
        { name: "Responsive Layout", description: "Mobile-first design", color: "bg-teal-600 text-white" },
        { name: "State Management", description: "React hooks for data flow", color: "bg-red-600 text-white" }
      ]
    },
    {
      category: "Infrastructure Simulation",
      items: [
        { name: "Server Monitoring", description: "CPU, Memory, Disk usage", color: "bg-yellow-600 text-white" },
        { name: "CCTV Management", description: "Camera status & recording", color: "bg-violet-600 text-white" },
        { name: "Access Control", description: "Fingerprint device tracking", color: "bg-emerald-600 text-white" },
        { name: "Network Analytics", description: "Bandwidth & latency metrics", color: "bg-gray-600 text-white" }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
      case 'active':
        return 'text-green-400';
      case 'offline':
      case 'error':
        return 'text-red-400';
      case 'maintenance':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
      case 'active':
        return <CheckCircleIcon className="w-5 h-5 text-green-400" />;
      case 'offline':
      case 'error':
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />;
      case 'maintenance':
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400" />;
      default:
        return <ExclamationTriangleIcon className="w-5 h-5 text-gray-400" />;
    }
  };

  // Progress Bar Component
  const ProgressBar = ({ value, color }: { value: number; color: string }) => (
    <div className="w-full bg-gray-700 rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all duration-300 ${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );

  // Enhanced Line Chart Component
  const LineChart = ({ data, type = "bandwidth", height = 120 }: { 
    data: (NetworkMetric | SystemPerformance)[]; 
    type?: string; 
    height?: number;
  }) => {
    const getValue = (item: NetworkMetric | SystemPerformance) => {
        switch (type) {
          case 'bandwidth': return 'bandwidth' in item ? item.bandwidth : 0;
          case 'latency': return 'latency' in item ? item.latency : 0;
          case 'cpu': return 'cpu' in item ? item.cpu : 0;
          case 'memory': return 'memory' in item ? item.memory : 0;
          case 'disk': return 'disk' in item ? item.disk : 0;
          default: return 'bandwidth' in item ? item.bandwidth : 0;
        }
      };

    const maxValue = Math.max(...data.map(getValue));
    const minValue = Math.min(...data.map(getValue));
    const range = maxValue - minValue || 1;

    const getColor = () => {
      switch (type) {
        case 'bandwidth': return 'stroke-blue-400 fill-blue-400/20';
        case 'latency': return 'stroke-purple-400 fill-purple-400/20';
        case 'cpu': return 'stroke-red-400 fill-red-400/20';
        case 'memory': return 'stroke-yellow-400 fill-yellow-400/20';
        case 'disk': return 'stroke-green-400 fill-green-400/20';
        default: return 'stroke-blue-400 fill-blue-400/20';
      }
    };

    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = ((maxValue - getValue(item)) / range) * 80 + 10;
      return `${x},${y}`;
    }).join(' ');

    const pathD = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = ((maxValue - getValue(item)) / range) * 80 + 10;
      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    }).join(' ');

    return (
      <div className="relative" style={{ height: `${height}px` }}>
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgb(75 85 99)" strokeWidth="0.2"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
          
          {/* Area under curve */}
          <path 
            d={`${pathD} L 100 90 L 0 90 Z`}
            className={getColor().split(' ')[1]}
          />
          
          {/* Line */}
          <polyline
            points={points}
            fill="none"
            className={getColor().split(' ')[0]}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          
          {/* Data points */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = ((maxValue - getValue(item)) / range) * 80 + 10;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="1.5"
                className={getColor().split(' ')[0].replace('stroke-', 'fill-')}
              />
            );
          })}
        </svg>

        {/* Labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-400 mt-2">
          {data.map((item, index) => (
            <span key={index} className="text-center">
              {'hour' in item ? item.hour : 'time' in item ? item.time : `${index + 1}h`}
            </span>
          ))}
        </div>
      </div>
    );
  };

  // Bar Chart Component
  const BarChart = ({ data }: { data: { hour: string; successful: number; failed: number; }[] }) => {
    const maxValue = Math.max(...data.map(item => Math.max(item.successful || 0, item.failed || 0)));

    return (
      <div className="flex items-end space-x-2 h-32">
        {data.map((item, index) => {
          const successHeight = ((item.successful || 0) / maxValue) * 100;
          const failedHeight = ((item.failed || 0) / maxValue) * 100;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center space-y-1">
              <div className="w-full flex flex-col items-end space-y-1">
                {item.failed > 0 && (
                  <div 
                    className="w-full bg-red-500 rounded-t transition-all duration-500"
                    style={{ height: `${failedHeight}%` }}
                  />
                )}
                <div 
                  className="w-full bg-green-500 rounded-t transition-all duration-500"
                  style={{ height: `${successHeight}%` }}
                />
              </div>
              <span className="text-xs text-gray-400">{item.hour}</span>
            </div>
          );
        })}
      </div>
    );
  };

  // Donut Chart Component
  const DonutChart = ({ percentage, color = "stroke-blue-400", label }: { 
    percentage: number; 
    color?: string; 
    label: string;
  }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

    return (
      <div className="relative w-24 h-24">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="rgb(75 85 99)"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            className={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-lg font-bold">{percentage}%</span>
          <span className="text-xs text-gray-400">{label}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <ServerIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Infrastructure Monitor</h1>
                <p className="text-sm text-gray-400">Real-time System Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Technologies Dialog */}
              <Dialog open={showTechnologies} onOpenChange={setShowTechnologies}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                    <CodeBracketIcon className="w-4 h-4 mr-2" />
                    Tech Stack
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-xl flex items-center gap-2">
                      <SparklesIcon className="w-6 h-6 text-blue-400" />
                      Technologies & Features Used
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Technologies and techniques used in this Infrastructure Management Dashboard
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
                          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                            <CogIcon className="w-5 h-5 text-blue-400" />
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
                                <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
                                  <CardContent className="p-4">
                                    <Badge className={`${item.color} font-bold text-sm px-3 py-1 mb-2`}>
                                      {item.name}
                                    </Badge>
                                    <p className="text-gray-400 text-sm">{item.description}</p>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                        {categoryIndex < technologies.length - 1 && (
                          <Separator className="bg-gray-700" />
                        )}
                      </motion.div>
                    ))}

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700/50 rounded-lg p-6"
                    >
                      <div className="flex items-start gap-3">
                        <InformationCircleIcon className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold mb-2">About This Project</h4>
                          <p className="text-gray-300 text-sm leading-relaxed mb-4">
                            This Infrastructure Management Dashboard demonstrates modern web development capabilities
                            for real-time system monitoring. Built with cutting-edge technologies and best practices
                            for scalable, maintainable applications.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-blue-400 border-blue-400">
                              🚀 Modern Stack
                            </Badge>
                            <Badge variant="outline" className="text-green-400 border-green-400">
                              📊 Real-time Data
                            </Badge>
                            <Badge variant="outline" className="text-purple-400 border-purple-400">
                              📱 Responsive
                            </Badge>
                            <Badge variant="outline" className="text-orange-400 border-orange-400">
                              ⚡ Performance
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Badge variant="outline" className="border-green-500 text-green-400">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Live
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Servers</p>
                    <p className="text-3xl font-bold text-blue-400">3</p>
                    <p className="text-xs text-green-400">↗ 2 online</p>
                  </div>
                  <ServerIcon className="w-10 h-10 text-blue-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">CCTV Cameras</p>
                    <p className="text-3xl font-bold text-purple-400">4</p>
                    <p className="text-xs text-green-400">↗ 3 recording</p>
                  </div>
                  <VideoCameraIcon className="w-10 h-10 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Access Points</p>
                    <p className="text-3xl font-bold text-green-400">3</p>
                    <p className="text-xs text-red-400">↘ 1 error</p>
                  </div>
                  <FingerPrintIcon className="w-10 h-10 text-green-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Network Health</p>
                    <p className="text-3xl font-bold text-yellow-400">95%</p>
                    <p className="text-xs text-gray-400">Last 24h</p>
                  </div>
                  <WifiIcon className="w-10 h-10 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-8 bg-gray-800/30 p-1 rounded-lg w-fit">
          {[
            { id: 'overview', name: 'Overview', icon: ChartBarIcon },
            { id: 'servers', name: 'Servers', icon: ServerIcon },
            { id: 'cctv', name: 'CCTV', icon: VideoCameraIcon },
            { id: 'access', name: 'Access Control', icon: FingerPrintIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.name}
              </Button>
            );
          })}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Network Performance Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ArrowTrendingUpIcon className="w-5 h-5 text-blue-400" />
                      Network Bandwidth (24h)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LineChart data={networkMetrics} type="bandwidth" />
                    <div className="mt-4 flex justify-between text-sm">
                      <span className="text-gray-400">Average: 65 Mbps</span>
                      <span className="text-blue-400">Peak: 92 Mbps</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <WifiIcon className="w-5 h-5 text-purple-400" />
                      Network Latency (24h)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LineChart data={networkMetrics} type="latency" />
                    <div className="mt-4 flex justify-between text-sm">
                      <span className="text-gray-400">Average: 13ms</span>
                      <span className="text-purple-400">Best: 8ms</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* System Performance Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <CpuChipIcon className="w-4 h-4 text-red-400" />
                      CPU Usage (6h)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LineChart data={systemPerformance} type="cpu" height={100} />
                    <p className="text-xs text-gray-400 mt-2">Current: 65%</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <ServerIcon className="w-4 h-4 text-yellow-400" />
                      Memory Usage (6h)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LineChart data={systemPerformance} type="memory" height={100} />
                    <p className="text-xs text-gray-400 mt-2">Current: 78%</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <ServerIcon className="w-4 h-4 text-green-400" />
                      Disk Usage (6h)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LineChart data={systemPerformance} type="disk" height={100} />
                    <p className="text-xs text-gray-400 mt-2">Current: 45%</p>
                  </CardContent>
                </Card>
              </div>

              {/* Access Control & Health Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FingerPrintIcon className="w-5 h-5 text-green-400" />
                      Access Logs (24h)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BarChart data={accessLogs} />
                    <div className="mt-4 flex justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded"></div>
                        <span className="text-gray-400">Successful</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded"></div>
                        <span className="text-gray-400">Failed</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-blue-400" />
                      System Health Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center">
                        <DonutChart percentage={95} color="stroke-green-400" label="Uptime" />
                      </div>
                      <div className="text-center">
                        <DonutChart percentage={78} color="stroke-yellow-400" label="Performance" />
                      </div>
                      <div className="text-center">
                        <DonutChart percentage={88} color="stroke-blue-400" label="Security" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* System Resource Overview */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CpuChipIcon className="w-5 h-5 text-green-400" />
                    System Resource Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {servers.map((server) => (
                      <div key={server.name} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{server.name}</h4>
                          {getStatusIcon(server.status)}
                        </div>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">CPU</span>
                              <span>{server.cpu}%</span>
                            </div>
                            <ProgressBar value={server.cpu} color="bg-blue-500" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">Memory</span>
                              <span>{server.memory}%</span>
                            </div>
                            <ProgressBar value={server.memory} color="bg-purple-500" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">Disk</span>
                              <span>{server.disk}%</span>
                            </div>
                            <ProgressBar value={server.disk} color="bg-green-500" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'servers' && (
            <div className="space-y-6">
              {servers.map((server, index) => (
                <motion.div
                  key={server.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <ServerIcon className="w-8 h-8 text-blue-400" />
                          <div>
                            <h3 className="text-xl font-semibold">{server.name}</h3>
                            <p className="text-gray-400">Uptime: {server.uptime}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(server.status)}
                          <Badge variant="outline" className={getStatusColor(server.status)}>
                            {server.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">CPU Usage</span>
                            <span className="font-semibold">{server.cpu}%</span>
                          </div>
                          <ProgressBar value={server.cpu} color="bg-blue-500" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Memory</span>
                            <span className="font-semibold">{server.memory}%</span>
                          </div>
                          <ProgressBar value={server.memory} color="bg-purple-500" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Disk Usage</span>
                            <span className="font-semibold">{server.disk}%</span>
                          </div>
                          <ProgressBar value={server.disk} color="bg-green-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'cctv' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cctvCameras.map((camera, index) => (
                <motion.div
                  key={camera.location}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <VideoCameraIcon className="w-6 h-6 text-purple-400" />
                          <div>
                            <h3 className="font-semibold">{camera.location}</h3>
                            <p className="text-sm text-gray-400">{camera.resolution} • {camera.fps} FPS</p>
                          </div>
                        </div>
                        {getStatusIcon(camera.status)}
                      </div>
                      <div className="aspect-video bg-gray-900 rounded-lg mb-4 flex items-center justify-center border border-gray-700">
                        <div className="text-center">
                          <VideoCameraIcon className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                          <span className="text-gray-500">Camera Feed</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className={getStatusColor(camera.status)}>
                          {camera.status.toUpperCase()}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${camera.recording ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`}></div>
                          <span className="text-sm text-gray-400">
                            {camera.recording ? 'Recording' : 'Stopped'}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'access' && (
            <div className="space-y-6">
              {fingerprintDevices.map((device, index) => (
                <motion.div
                  key={device.location}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <FingerPrintIcon className="w-8 h-8 text-green-400" />
                          <div>
                            <h3 className="text-xl font-semibold">{device.location}</h3>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-gray-400 text-sm">
                                {device.users} registered users
                              </span>
                              <span className="text-gray-400 text-sm">•</span>
                              <span className="text-blue-400 text-sm">
                                {device.todayAccess} accesses today
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(device.status)}
                          <Badge variant="outline" className={getStatusColor(device.status)}>
                            {device.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}