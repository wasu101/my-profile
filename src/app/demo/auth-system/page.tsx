'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { motion, AnimatePresence } from "framer-motion";
import { 
  LockClosedIcon, 
  UserIcon, 
  EyeIcon,
  EyeSlashIcon,
  ShieldCheckIcon,
  KeyIcon,
  CodeBracketIcon,
  SparklesIcon,
  CogIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  XMarkIcon,
  ClockIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  FingerPrintIcon
} from "@heroicons/react/24/outline";

export default function AuthSystemDemo() {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTechnologies, setShowTechnologies] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const technologies = [
    {
      category: "Authentication Technologies",
      items: [
        { name: "JSON Web Tokens (JWT)", description: "Secure token-based authentication", color: "bg-purple-600 text-white" },
        { name: "OAuth 2.0", description: "Third-party authentication protocol", color: "bg-blue-600 text-white" },
        { name: "bcrypt", description: "Password hashing algorithm", color: "bg-red-600 text-white" },
        { name: "2FA/MFA", description: "Multi-factor authentication", color: "bg-green-600 text-white" }
      ]
    },
    {
      category: "Frontend Technologies",
      items: [
        { name: "Next.js 14", description: "React framework with App Router", color: "bg-black text-white" },
        { name: "React Hook Form", description: "Form validation library", color: "bg-pink-600 text-white" },
        { name: "Framer Motion", description: "Animation library", color: "bg-violet-600 text-white" },
        { name: "TypeScript", description: "Type-safe JavaScript", color: "bg-blue-500 text-white" }
      ]
    },
    {
      category: "Security Features",
      items: [
        { name: "CSRF Protection", description: "Cross-site request forgery prevention", color: "bg-orange-600 text-white" },
        { name: "Rate Limiting", description: "Brute force attack prevention", color: "bg-yellow-600 text-white" },
        { name: "Session Management", description: "Secure session handling", color: "bg-teal-600 text-white" },
        { name: "Input Validation", description: "XSS and injection prevention", color: "bg-indigo-600 text-white" }
      ]
    },
    {
      category: "UI/UX Features",
      items: [
        { name: "Form Validation", description: "Real-time input validation", color: "bg-emerald-600 text-white" },
        { name: "Loading States", description: "User feedback during operations", color: "bg-gray-600 text-white" },
        { name: "Error Handling", description: "Graceful error management", color: "bg-red-500 text-white" },
        { name: "Responsive Design", description: "Mobile-first approach", color: "bg-cyan-600 text-white" }
      ]
    }
  ];

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    // Validation
    const newErrors: Record<string, string> = {};
    if (!validateEmail(loginData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!validatePassword(loginData.password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
    }, 2000);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    // Validation
    const newErrors: Record<string, string> = {};
    if (registerData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (!validateEmail(registerData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!validatePassword(registerData.password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setActiveTab('login');
      setLoginData({ email: registerData.email, password: registerData.password });
    }, 2000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ email: '', password: '' });
    setRegisterData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
  };

  const handleOAuthLogin = (provider: string) => {
    setIsLoading(true);
    // Simulate OAuth login
    console.log(`Logging in with ${provider}`);
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
    }, 1500);
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        {/* Header */}
        <header className="bg-gray-900/50 backdrop-blur border-b border-gray-800 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <ShieldCheckIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Auth Dashboard</h1>
                  <p className="text-sm text-gray-400">Secure Authentication System</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Technologies Dialog */}
                <Dialog open={showTechnologies} onOpenChange={setShowTechnologies}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                      <CodeBracketIcon className="w-4 h-4 mr-2" />
                      Technologies
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700 text-white">
                    <DialogHeader>
                      <DialogTitle className="text-xl flex items-center gap-2">
                        <SparklesIcon className="w-6 h-6 text-blue-400" />
                        Authentication Technologies & Features
                      </DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Technologies and security features implemented in this authentication system
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
                            <h4 className="font-bold mb-2">About This Demo</h4>
                            <p className="text-gray-300 text-sm leading-relaxed mb-4">
                              This authentication system demo showcases modern security practices and user experience patterns.
                              Features include JWT token management, OAuth integration, form validation, and secure session handling
                              with a focus on both security and usability.
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline" className="text-blue-400 border-blue-400">
                                🔐 Secure
                              </Badge>
                              <Badge variant="outline" className="text-green-400 border-green-400">
                                ✅ Validated
                              </Badge>
                              <Badge variant="outline" className="text-purple-400 border-purple-400">
                                📱 Responsive
                              </Badge>
                              <Badge variant="outline" className="text-orange-400 border-orange-400">
                                🚀 Modern
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button onClick={handleLogout} variant="outline" className="border-red-700 text-red-400 hover:bg-red-800">
                  <KeyIcon className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/50 rounded-lg p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <CheckCircleIcon className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-green-400 mb-1">Authentication Successful!</h1>
                  <p className="text-gray-300">Welcome back! You are now securely logged in.</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                      <CheckCircleIcon className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                      <ShieldCheckIcon className="w-3 h-3 mr-1" />
                      Secure Session
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* User Profile */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserIcon className="w-5 h-5 text-purple-400" />
                    User Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">D</span>
                    </div>
                    <div>
                      <p className="font-semibold">Demo User</p>
                      <p className="text-sm text-gray-400">demo@example.com</p>
                    </div>
                  </div>
                  <Separator className="bg-gray-700" />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldCheckIcon className="w-4 h-4 text-green-400" />
                        <span className="text-sm">Role</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                        Administrator
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ClockIcon className="w-4 h-4 text-blue-400" />
                        <span className="text-sm">Last Login</span>
                      </div>
                      <span className="text-sm text-gray-400">Just now</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FingerPrintIcon className="w-4 h-4 text-purple-400" />
                        <span className="text-sm">2FA Status</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                        Enabled
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Session Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <KeyIcon className="w-5 h-5 text-blue-400" />
                    Session Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-400 mb-2">JWT Token</p>
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
                      <p className="text-xs font-mono text-green-400 break-all">
                        eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRlbW8gVXNlciIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Expires In</p>
                      <p className="text-lg font-bold text-yellow-400">23h 59m</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-400">Session ID</p>
                      <p className="text-xs font-mono text-blue-400">sess_abc123</p>
                    </div>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircleIcon className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium text-blue-400">Secure Connection</span>
                    </div>
                    <p className="text-xs text-gray-400">SSL/TLS encrypted • HTTPS enabled</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Security Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheckIcon className="w-5 h-5 text-green-400" />
                    Security Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <CheckCircleIcon className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-green-400">Password</p>
                      <p className="text-xs text-gray-400">Strong</p>
                    </div>
                    <div className="text-center p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <DevicePhoneMobileIcon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-blue-400">2FA</p>
                      <p className="text-xs text-gray-400">Active</p>
                    </div>
                  </div>
                  <Separator className="bg-gray-700" />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Login Attempts</span>
                      <span className="text-sm text-green-400">0 failed</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Device Trust</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                        Trusted
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Location</span>
                      <span className="text-sm text-gray-400">Bangkok, TH</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
                    <UserIcon className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
                    <ShieldCheckIcon className="w-4 h-4 mr-2" />
                    Security Settings
                  </Button>
                  <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
                    <DevicePhoneMobileIcon className="w-4 h-4 mr-2" />
                    Manage Devices
                  </Button>
                  <Button variant="outline" className="border-gray-600 hover:bg-gray-700">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    Activity Log
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <LockClosedIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Authentication System
          </h1>
          <p className="text-gray-400">Secure login with JWT & OAuth integration</p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
              JWT Tokens
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">
              OAuth 2.0
            </Badge>
          </div>
        </motion.div>

        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur">
          <CardContent className="p-6">
            {/* Tab Navigation */}
            <div className="flex space-x-2 mb-6 bg-gray-900/50 p-1 rounded-lg">
              <Button
                variant={activeTab === 'login' ? "default" : "ghost"}
                onClick={() => setActiveTab('login')}
                className={`flex-1 ${
                  activeTab === 'login' 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                Sign In
              </Button>
              <Button
                variant={activeTab === 'register' ? "default" : "ghost"}
                onClick={() => setActiveTab('register')}
                className={`flex-1 ${
                  activeTab === 'register' 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                Sign Up
              </Button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'login' && (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleLogin}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Email Address
                    </label>
                    <div className="relative">
                      <EnvelopeIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        className={`bg-gray-900/50 border-gray-600 pl-10 text-white placeholder:text-gray-500 ${
                          errors.email ? 'border-red-500' : 'focus:border-blue-500'
                        }`}
                        required
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <XMarkIcon className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Password
                    </label>
                    <div className="relative">
                      <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        className={`bg-gray-900/50 border-gray-600 pl-10 pr-10 text-white placeholder:text-gray-500 ${
                          errors.password ? 'border-red-500' : 'focus:border-blue-500'
                        }`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="w-5 h-5" />
                        ) : (
                          <EyeIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <XMarkIcon className="w-3 h-3" />
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-600 text-blue-600" />
                      <span className="ml-2 text-sm text-gray-400">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-blue-400 hover:text-blue-300">
                      Forgot password?
                    </a>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Signing In...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </motion.form>
              )}

              {activeTab === 'register' && (
                <motion.form
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleRegister}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Full Name
                    </label>
                    <div className="relative">
                      <UserIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <Input
                        type="text"
                        placeholder="Enter your full name"
                        value={registerData.name}
                        onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                        className={`bg-gray-900/50 border-gray-600 pl-10 text-white placeholder:text-gray-500 ${
                          errors.name ? 'border-red-500' : 'focus:border-blue-500'
                        }`}
                        required
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <XMarkIcon className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Email Address
                    </label>
                    <div className="relative">
                      <EnvelopeIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                        className={`bg-gray-900/50 border-gray-600 pl-10 text-white placeholder:text-gray-500 ${
                          errors.email ? 'border-red-500' : 'focus:border-blue-500'
                        }`}
                        required
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <XMarkIcon className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Password
                    </label>
                    <div className="relative">
                      <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                        className={`bg-gray-900/50 border-gray-600 pl-10 pr-10 text-white placeholder:text-gray-500 ${
                          errors.password ? 'border-red-500' : 'focus:border-blue-500'
                        }`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="w-5 h-5" />
                        ) : (
                          <EyeIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <XMarkIcon className="w-3 h-3" />
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                        className={`bg-gray-900/50 border-gray-600 pl-10 pr-10 text-white placeholder:text-gray-500 ${
                          errors.confirmPassword ? 'border-red-500' : 'focus:border-blue-500'
                        }`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeSlashIcon className="w-5 h-5" />
                        ) : (
                          <EyeIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <XMarkIcon className="w-3 h-3" />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-600 text-blue-600" required />
                    <span className="ml-2 text-sm text-gray-400">
                      I agree to the <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a> and <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
                    </span>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* OAuth Options */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-gray-800 px-3 text-gray-400">Or continue with</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center gap-2 border-gray-600 hover:bg-gray-700"
                  onClick={() => handleOAuthLogin('google')}
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center gap-2 border-gray-600 hover:bg-gray-700"
                  onClick={() => handleOAuthLogin('github')}
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="bg-blue-500/10 border-blue-500/30 mt-6">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <InformationCircleIcon className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-400 mb-2 font-medium">Demo Credentials:</p>
                <div className="space-y-1">
                  <p className="text-xs text-gray-300">📧 Email: demo@example.com</p>
                  <p className="text-xs text-gray-300">🔑 Password: demo123</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack Info */}
        <div className="text-center mt-6">
          <Dialog open={showTechnologies} onOpenChange={setShowTechnologies}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:bg-gray-800">
                <CodeBracketIcon className="w-4 h-4 mr-2" />
                View Technologies Used
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>
    </div>
  );
}