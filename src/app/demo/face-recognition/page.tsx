'use client';
import { useState, useEffect } from 'react';
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
import { motion, AnimatePresence } from "framer-motion";
import { 
  CameraIcon, 
  UserIcon, 
  CheckCircleIcon,
  XMarkIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserPlusIcon,
  QrCodeIcon,
  CogIcon,
  CodeBracketIcon,
  SparklesIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  BellIcon,
  KeyIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  PlayIcon,
  StopIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";

export default function FaceRecognitionDemo() {
  const [activeTab, setActiveTab] = useState('scanner');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [userId, setUserId] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [showTechnologies, setShowTechnologies] = useState(false);
  const [accessLogs, setAccessLogs] = useState([
    { id: 1, user: 'Worrakan Nasai', time: '2024-06-21 14:30:25', status: 'success', confidence: 95.8 },
    { id: 2, user: 'John Smith', time: '2024-06-21 14:28:10', status: 'success', confidence: 88.2 },
    { id: 3, user: 'Unknown', time: '2024-06-21 14:25:45', status: 'failed', confidence: 45.1 },
    { id: 4, user: 'Sarah Johnson', time: '2024-06-21 14:20:15', status: 'success', confidence: 92.7 },
  ]);

  const technologies = [
    {
      category: "Computer Vision & AI",
      items: [
        { name: "OpenCV", description: "Computer vision and image processing", color: "bg-blue-600 text-white" },
        { name: "dlib", description: "Face detection and landmarks", color: "bg-green-600 text-white" },
        { name: "face_recognition", description: "Face encoding and matching", color: "bg-purple-600 text-white" },
        { name: "ResNet Model", description: "Deep learning face recognition", color: "bg-red-600 text-white" }
      ]
    },
    {
      category: "Hardware Integration",
      items: [
        { name: "Raspberry Pi", description: "Embedded system controller", color: "bg-pink-600 text-white" },
        { name: "RPi.GPIO", description: "Hardware control interface", color: "bg-orange-600 text-white" },
        { name: "USB Camera", description: "Real-time video capture", color: "bg-teal-600 text-white" },
        { name: "Relay Control", description: "Door lock automation", color: "bg-indigo-600 text-white" }
      ]
    },
    {
      category: "UI Framework & Interface",
      items: [
        { name: "PyQt5", description: "Cross-platform GUI framework", color: "bg-emerald-600 text-white" },
        { name: "QWebEngine", description: "Web content integration", color: "bg-cyan-600 text-white" },
        { name: "Custom Widgets", description: "Virtual keyboard & dialogs", color: "bg-violet-600 text-white" },
        { name: "Touchscreen UI", description: "Kiosk-style interface", color: "bg-amber-600 text-white" }
      ]
    },
    {
      category: "Data & Security",
      items: [
        { name: "Google Sheets API", description: "Cloud data logging", color: "bg-blue-500 text-white" },
        { name: "OAuth2", description: "Secure authentication", color: "bg-green-500 text-white" },
        { name: "QR Code Generation", description: "Registration workflow", color: "bg-purple-500 text-white" },
        { name: "Access Control", description: "Multi-level security", color: "bg-red-500 text-white" }
      ]
    }
  ];

  const systemStats = [
    { label: 'Registered Users', value: '156', icon: UserIcon, color: 'text-blue-500' },
    { label: 'Today\'s Scans', value: '47', icon: CameraIcon, color: 'text-green-500' },
    { label: 'Success Rate', value: '94.2%', icon: CheckCircleIcon, color: 'text-emerald-500' },
    { label: 'System Uptime', value: '99.8%', icon: ShieldCheckIcon, color: 'text-purple-500' },
  ];

  const handleScan = () => {
    setIsScanning(true);
    setResult('');
    setConfidence(0);
    
    // Simulate scanning process
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate
      const confidenceLevel = success ? 85 + Math.random() * 15 : 30 + Math.random() * 40;
      
      setConfidence(confidenceLevel);
      
      if (success && confidenceLevel > 60) {
        setResult('Worrakan Nasai - Access Granted ✓');
        // Add to access logs
        const newLog = {
          id: accessLogs.length + 1,
          user: 'Worrakan Nasai',
          time: new Date().toLocaleString(),
          status: 'success',
          confidence: confidenceLevel
        };
        setAccessLogs(prev => [newLog, ...prev.slice(0, 9)]);
      } else {
        setResult('Face not recognized - Access Denied ✗');
        const newLog = {
          id: accessLogs.length + 1,
          user: 'Unknown',
          time: new Date().toLocaleString(),
          status: 'failed',
          confidence: confidenceLevel
        };
        setAccessLogs(prev => [newLog, ...prev.slice(0, 9)]);
      }
      
      setIsScanning(false);
    }, 3000);
  };

  const handleRegister = () => {
    if (!userId.trim()) return;
    
    setIsRegistering(true);
    setTimeout(() => {
      setIsRegistering(false);
      setUserId('');
      alert(`User "${userId}" registered successfully!`);
    }, 2000);
  };

  const CameraFeed = ({ isActive, type = 'scanner' }: { isActive: boolean; type?: string }) => (
    <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center border-2 border-gray-700 relative overflow-hidden">
      {/* Simulated camera background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
      
      {/* Face detection overlay */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Detection frame */}
          <motion.div
            animate={{ 
              borderColor: isScanning ? ['#ef4444', '#22c55e', '#ef4444'] : '#6b7280',
              scale: isScanning ? [1, 1.05, 1] : 1
            }}
            transition={{ 
              duration: isScanning ? 2 : 0,
              repeat: isScanning ? Infinity : 0
            }}
            className="w-48 h-48 border-4 rounded-lg border-dashed"
          >
            {type === 'scanner' && (
              <div className="w-full h-full flex items-center justify-center">
                <motion.div
                  animate={{ 
                    y: isScanning ? ['-100%', '100%'] : 0,
                    opacity: isScanning ? [0.3, 1, 0.3] : 0
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: isScanning ? Infinity : 0,
                    ease: "linear"
                  }}
                  className="w-full h-1 bg-green-400 shadow-lg shadow-green-400/50"
                />
              </div>
            )}
          </motion.div>
          
          {/* Corner markers */}
          <div className="absolute top-20 left-20 w-6 h-6 border-l-2 border-t-2 border-blue-400"></div>
          <div className="absolute top-20 right-20 w-6 h-6 border-r-2 border-t-2 border-blue-400"></div>
          <div className="absolute bottom-20 left-20 w-6 h-6 border-l-2 border-b-2 border-blue-400"></div>
          <div className="absolute bottom-20 right-20 w-6 h-6 border-r-2 border-b-2 border-blue-400"></div>
        </motion.div>
      )}
      
      {/* Status overlay */}
      <div className="relative z-10 text-center">
        {isActive ? (
          <motion.div
            animate={{ scale: isScanning ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 1, repeat: isScanning ? Infinity : 0 }}
            className={`${isScanning ? 'text-blue-400' : 'text-gray-400'}`}
          >
            <CameraIcon className="w-16 h-16 mx-auto mb-2" />
            <p className="text-sm font-medium">
              {isScanning ? 'Scanning...' : 'Camera Ready'}
            </p>
          </motion.div>
        ) : (
          <div className="text-gray-500">
            <CameraIcon className="w-16 h-16 mx-auto mb-2" />
            <p className="text-sm">Camera Inactive</p>
          </div>
        )}
      </div>
      
      {/* Live indicator */}
      {isActive && (
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-red-500 font-medium">LIVE</span>
        </div>
      )}
    </div>
  );

  const NumericKeypad = ({ onNumberClick, onClear }: { 
    onNumberClick: (num: string) => void;
    onClear: () => void;
  }) => {
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'Clear'];
    
    return (
      <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
        {numbers.map((num, index) => (
          <Button
            key={index}
            variant={num === 'Clear' ? 'destructive' : 'outline'}
            className={`h-12 ${num === '' ? 'invisible' : ''} ${
              num === 'Clear' 
                ? 'bg-red-600 hover:bg-red-700 text-white border-red-600' 
                : 'border-gray-600 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => num === 'Clear' ? onClear() : num && onNumberClick(num)}
            disabled={num === ''}
          >
            {num === 'Clear' ? 'Clear' : num}
          </Button>
        ))}
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
                <CameraIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Face Recognition System</h1>
                <p className="text-sm text-gray-400">AI-Powered Access Control</p>
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
                      Face Recognition Technologies
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Complete technology stack for AI-powered access control system
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
                          <h4 className="font-bold mb-2">System Architecture</h4>
                          <p className="text-gray-300 text-sm leading-relaxed mb-4">
                            This face recognition system combines computer vision, machine learning, and embedded systems
                            to create a secure, real-time access control solution. Built with Python, PyQt5, and optimized
                            for Raspberry Pi deployment with GPIO control for physical door locks.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-blue-400 border-blue-400">
                              🎯 Real-time Processing
                            </Badge>
                            <Badge variant="outline" className="text-green-400 border-green-400">
                              🔒 Secure Access
                            </Badge>
                            <Badge variant="outline" className="text-purple-400 border-purple-400">
                              🤖 AI-Powered
                            </Badge>
                            <Badge variant="outline" className="text-orange-400 border-orange-400">
                              ⚡ Hardware Integration
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
                System Online
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {systemStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">{stat.label}</p>
                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                      </div>
                      <Icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-8 bg-gray-800/30 p-1 rounded-lg w-fit">
          {[
            { id: 'scanner', name: 'Face Scanner', icon: CameraIcon },
            { id: 'register', name: 'Register User', icon: UserPlusIcon },
            { id: 'logs', name: 'Access Logs', icon: ClockIcon },
            { id: 'admin', name: 'Admin Panel', icon: CogIcon },
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

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'scanner' && (
              <div className="grid md:grid-cols-2 gap-8">
                {/* Camera Feed */}
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CameraIcon className="w-5 h-5 text-blue-400" />
                      Live Camera Feed
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CameraFeed isActive={true} type="scanner" />
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleScan}
                        disabled={isScanning}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        {isScanning ? (
                          <>
                            <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />
                            Scanning...
                          </>
                        ) : (
                          <>
                            <PlayIcon className="w-4 h-4 mr-2" />
                            Start Scan
                          </>
                        )}
                      </Button>
                      <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                        <StopIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recognition Result */}
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShieldCheckIcon className="w-5 h-5 text-green-400" />
                      Recognition Result
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {result && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`p-4 rounded-lg border-l-4 ${
                          result.includes('Granted') 
                            ? 'bg-green-500/20 border-green-500 text-green-400' 
                            : 'bg-red-500/20 border-red-500 text-red-400'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {result.includes('Granted') ? (
                            <CheckCircleIcon className="w-6 h-6" />
                          ) : (
                            <XMarkIcon className="w-6 h-6" />
                          )}
                          <span className="font-semibold">
                            {result.includes('Granted') ? 'Access Granted' : 'Access Denied'}
                          </span>
                        </div>
                        <p className="text-sm">{result}</p>
                        {confidence > 0 && (
                          <div className="mt-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Confidence</span>
                              <span>{confidence.toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${confidence}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className={`h-2 rounded-full ${
                                  confidence > 60 ? 'bg-green-500' : 'bg-red-500'
                                }`}
                              />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                    
                    <div className="bg-gray-700/30 rounded-lg p-4">
                      <h3 className="font-semibold mb-3 text-gray-300">System Features</h3>
                      <ul className="space-y-2 text-sm text-gray-400">
                        <li className="flex items-center gap-2">
                          <CheckCircleIcon className="w-4 h-4 text-green-400" />
                          Real-time face detection
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircleIcon className="w-4 h-4 text-green-400" />
                          Multiple face recognition
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircleIcon className="w-4 h-4 text-green-400" />
                          Access control logging
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircleIcon className="w-4 h-4 text-green-400" />
                          Hardware door control
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircleIcon className="w-4 h-4 text-green-400" />
                          Cloud data synchronization
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'register' && (
              <div className="grid md:grid-cols-2 gap-8">
                {/* Registration Camera */}
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserPlusIcon className="w-5 h-5 text-purple-400" />
                      User Registration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CameraFeed isActive={true} type="register" />
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">User ID</label>
                        <Input
                          type="text"
                          placeholder="Enter user ID"
                          value={userId}
                          onChange={(e) => setUserId(e.target.value)}
                          className="bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500"
                        />
                      </div>
                      
                      <Button 
                        onClick={handleRegister}
                        disabled={isRegistering || !userId.trim()}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        {isRegistering ? (
                          <>
                            <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />
                            Registering...
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="w-4 h-4 mr-2" />
                            Register User
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Numeric Keypad */}
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <KeyIcon className="w-5 h-5 text-blue-400" />
                      Virtual Keypad
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <NumericKeypad 
                      onNumberClick={(num) => setUserId(prev => prev + num)}
                      onClear={() => setUserId('')}
                    />
                    <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <QrCodeIcon className="w-5 h-5 text-blue-400" />
                        <span className="text-sm font-medium text-blue-400">Registration Workflow</span>
                      </div>
                      <ol className="text-xs text-gray-400 space-y-1">
                        <li>1. Scan QR code for Google Form</li>
                        <li>2. Complete registration form</li>
                        <li>3. Enter assigned User ID</li>
                        <li>4. Capture face image</li>
                        <li>5. System validates and saves</li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'logs' && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5 text-yellow-400" />
                    Access Logs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {accessLogs.map((log, index) => (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-lg border-l-4 ${
                          log.status === 'success' 
                            ? 'bg-green-500/10 border-green-500' 
                            : 'bg-red-500/10 border-red-500'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              log.status === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'
                            }`}>
                              {log.status === 'success' ? (
                                <CheckCircleIcon className="w-4 h-4 text-green-400" />
                              ) : (
                                <XMarkIcon className="w-4 h-4 text-red-400" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{log.user}</p>
                              <p className="text-sm text-gray-400">{log.time}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className={
                              log.status === 'success' 
                                ? 'text-green-400 border-green-400' 
                                : 'text-red-400 border-red-400'
                            }>
                              {log.status === 'success' ? 'SUCCESS' : 'FAILED'}
                            </Badge>
                            <p className="text-xs text-gray-400 mt-1">
                              {log.confidence.toFixed(1)}% confidence
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'admin' && (
              <div className="grid md:grid-cols-2 gap-8">
                {/* System Status */}
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ComputerDesktopIcon className="w-5 h-5 text-blue-400" />
                      System Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <CameraIcon className="w-8 h-8 text-green-400 mx-auto mb-2" />
                        <p className="text-sm font-medium text-green-400">Camera</p>
                        <p className="text-xs text-gray-400">Online</p>
                      </div>
                      <div className="text-center p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <DevicePhoneMobileIcon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                        <p className="text-sm font-medium text-blue-400">GPIO</p>
                        <p className="text-xs text-gray-400">Ready</p>
                      </div>
                    </div>
                    
                    <Separator className="bg-gray-700" />
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Network Status</span>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                          Connected
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Database Sync</span>
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                          Synced
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Door Lock</span>
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
                          Secured
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* System Controls */}
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CogIcon className="w-5 h-5 text-purple-400" />
                      System Controls
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-3">
                      <Button variant="outline" className="justify-start border-gray-600 text-gray-300 hover:bg-gray-700">
                        <CameraIcon className="w-4 h-4 mr-2" />
                        Camera Settings
                      </Button>
                      <Button variant="outline" className="justify-start border-gray-600 text-gray-300 hover:bg-gray-700">
                        <UserIcon className="w-4 h-4 mr-2" />
                        User Management
                      </Button>
                      <Button variant="outline" className="justify-start border-gray-600 text-gray-300 hover:bg-gray-700">
                        <ShieldCheckIcon className="w-4 h-4 mr-2" />
                        Security Settings
                      </Button>
                      <Button variant="outline" className="justify-start border-gray-600 text-gray-300 hover:bg-gray-700">
                        <BellIcon className="w-4 h-4 mr-2" />
                        Notifications
                      </Button>
                    </div>
                    
                    <Separator className="bg-gray-700" />
                    
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <ExclamationTriangleIcon className="w-5 h-5 text-orange-400" />
                        <span className="text-sm font-medium text-orange-400">Admin Access Required</span>
                      </div>
                      <p className="text-xs text-gray-400">
                        System administration requires ROOT/ADMIN credentials with virtual keyboard authentication.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}