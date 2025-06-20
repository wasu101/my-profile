'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  ShoppingCartIcon, 
  HeartIcon, 
  StarIcon,
  MagnifyingGlassIcon,
  CreditCardIcon,
  UserIcon,
  CheckCircleIcon,
  PlusIcon,
  MinusIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
  ClockIcon,
  InformationCircleIcon,
  CodeBracketIcon,
  SparklesIcon,
  CogIcon
} from "@heroicons/react/24/outline";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  stock: number;
  description: string;
  tags: string[];
  brand: string;
  colors: string[];
}

interface CartItem {
  productId: string;
  quantity: number;
  selectedColor?: string;
}

export default function EcommerceDemo() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showTechnologies, setShowTechnologies] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');

  const categories = [
    { id: 'all', name: 'ทั้งหมด', count: 6 },
    { id: 'electronics', name: 'อิเล็กทรอนิกส์', count: 3 },
    { id: 'accessories', name: 'อุปกรณ์เสริม', count: 2 },
    { id: 'wearables', name: 'อุปกรณ์สวมใส่', count: 1 }
  ];

  const products: Product[] = [
    {
      id: '1',
      name: 'MacBook Pro M3',
      price: 1299,
      originalPrice: 1499,
      rating: 4.8,
      reviews: 245,
      image: '/api/placeholder/400/300',
      category: 'electronics',
      stock: 15,
      description: 'แล็ปท็อปประสิทธิภาพสูงพร้อมชิป M3 ที่ทรงพลัง เหมาะสำหรับการทำงานหนักและการสร้างสรรค์',
      tags: ['bestseller', 'new'],
      brand: 'Apple',
      colors: ['Space Gray', 'Silver']
    },
    {
      id: '2',
      name: 'iPhone 15 Pro',
      price: 899,
      rating: 4.6,
      reviews: 189,
      image: '/api/placeholder/400/300',
      category: 'electronics',
      stock: 8,
      description: 'ไอโฟนรุ่นล่าสุดพร้อมดีไซน์ไทเทเนียมและกล้องที่ล้ำสมัย',
      tags: ['popular'],
      brand: 'Apple',
      colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium']
    },
    {
      id: '3',
      name: 'AirPods Pro',
      price: 199,
      originalPrice: 249,
      rating: 4.7,
      reviews: 356,
      image: '/api/placeholder/400/300',
      category: 'accessories',
      stock: 25,
      description: 'หูฟังไร้สายพร้อมเทคโนโลยีตัดเสียงรบกวนขั้นสูง',
      tags: ['sale'],
      brand: 'Apple',
      colors: ['White']
    },
    {
      id: '4',
      name: 'Apple Watch Ultra',
      price: 299,
      rating: 4.5,
      reviews: 127,
      image: '/api/placeholder/400/300',
      category: 'wearables',
      stock: 12,
      description: 'นาฬิกาข้อมืออัจฉริยะสำหรับนักกีฬาและผู้ชื่นชอบการผจญภัย',
      tags: ['featured'],
      brand: 'Apple',
      colors: ['Orange', 'Blue', 'Green']
    },
    {
      id: '5',
      name: 'iPad Air',
      price: 599,
      rating: 4.4,
      reviews: 89,
      image: '/api/placeholder/400/300',
      category: 'electronics',
      stock: 20,
      description: 'แท็บเล็ตเบาบางสำหรับการสร้างสรรค์และบันเทิง',
      tags: ['new'],
      brand: 'Apple',
      colors: ['Space Gray', 'Pink', 'Purple', 'Blue', 'Starlight']
    },
    {
      id: '6',
      name: 'Magic Keyboard',
      price: 129,
      rating: 4.3,
      reviews: 67,
      image: '/api/placeholder/400/300',
      category: 'accessories',
      stock: 30,
      description: 'คีย์บอร์ดไร้สายพร้อมไฟส่องแป้นพิมพ์',
      tags: [],
      brand: 'Apple',
      colors: ['White', 'Black']
    }
  ];

  const addToCart = (productId: string, selectedColor?: string) => {
    setCart(prev => {
      const existing = prev.find(item => 
        item.productId === productId && item.selectedColor === selectedColor
      );
      if (existing) {
        return prev.map(item =>
          item.productId === productId && item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId, quantity: 1, selectedColor }];
    });
  };

  const updateCartQuantity = (productId: string, newQuantity: number, selectedColor?: string) => {
    if (newQuantity === 0) {
      setCart(prev => prev.filter(item => 
        !(item.productId === productId && item.selectedColor === selectedColor)
      ));
    } else {
      setCart(prev =>
        prev.map(item =>
          item.productId === productId && item.selectedColor === selectedColor
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const toggleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const cartTotal = cart.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId);
    return total + (product?.price || 0) * item.quantity;
  }, 0);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleCheckout = () => {
    setShowCheckout(true);
    setShowCart(false);
  };

  const completeOrder = () => {
    setOrderComplete(true);
    setShowCheckout(false);
    setCart([]);
    setTimeout(() => setOrderComplete(false), 4000);
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'bestseller':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'new':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'sale':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'popular':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'featured':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getTagText = (tag: string) => {
    switch (tag) {
      case 'bestseller': return 'ขายดี';
      case 'new': return 'ใหม่';
      case 'sale': return 'ลดราคา';
      case 'popular': return 'นิยม';
      case 'featured': return 'แนะนำ';
      default: return tag;
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md"
        >
          <Card className="border border-gray-300 shadow-2xl bg-white">
            <CardContent className="p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircleIcon className="w-12 h-12 text-white" />
              </motion.div>
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                สั่งซื้อสำเร็จ! 🎉
              </motion.h1>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-700 mb-6"
              >
                ขอบคุณสำหรับการสั่งซื้อ คำสั่งซื้อของคุณกำลังเตรียมจัดส่ง
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-100 border border-gray-300 rounded-lg p-4"
              >
                <p className="text-sm font-medium text-gray-900 mb-1">หมายเลขคำสั่งซื้อ</p>
                <p className="text-lg font-mono text-blue-600 font-bold">#ORD-2024-001</p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  const technologies = [
    {
      category: "Framework & Library",
      items: [
        { name: "Next.js 14", description: "App Router, Server Components", color: "bg-black text-white" },
        { name: "React 18", description: "Hooks, Context, State Management", color: "bg-blue-600 text-white" },
        { name: "TypeScript", description: "Type Safety, Interfaces", color: "bg-blue-500 text-white" },
        { name: "Tailwind CSS", description: "Utility-first CSS Framework", color: "bg-cyan-500 text-white" }
      ]
    },
    {
      category: "UI Components",
      items: [
        { name: "shadcn/ui", description: "Modern UI Components", color: "bg-slate-900 text-white" },
        { name: "Radix UI", description: "Accessible Primitives", color: "bg-purple-600 text-white" },
        { name: "Framer Motion", description: "Animations & Transitions", color: "bg-pink-500 text-white" },
        { name: "Heroicons", description: "Beautiful SVG Icons", color: "bg-indigo-600 text-white" }
      ]
    },
    {
      category: "Features & Patterns",
      items: [
        { name: "State Management", description: "useState, Local Storage", color: "bg-green-600 text-white" },
        { name: "Modal System", description: "Dialog, Portal Pattern", color: "bg-orange-600 text-white" },
        { name: "Search & Filter", description: "Real-time Filtering", color: "bg-yellow-600 text-white" },
        { name: "Cart Management", description: "Add, Remove, Update Items", color: "bg-red-600 text-white" }
      ]
    },
    {
      category: "UX/UI Patterns",
      items: [
        { name: "Responsive Design", description: "Mobile-first Approach", color: "bg-teal-600 text-white" },
        { name: "Loading States", description: "Skeleton, Animations", color: "bg-gray-600 text-white" },
        { name: "Micro-interactions", description: "Hover, Focus, Active States", color: "bg-violet-600 text-white" },
        { name: "Accessibility", description: "ARIA, Keyboard Navigation", color: "bg-emerald-600 text-white" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-300 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TechStore
              </h1>
            </div>
            
            {/* Search */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  type="text"
                  placeholder="ค้นหาสินค้า, แบรนด์, หรือหมวดหมู่..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white border-2 border-gray-300 focus:border-blue-500 text-gray-900 placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Technologies Dialog */}
              <Dialog open={showTechnologies} onOpenChange={setShowTechnologies}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                    <CodeBracketIcon className="w-5 h-5" />
                    <span className="ml-2 hidden sm:inline font-medium">เทคนิคที่ใช้</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-2 border-gray-300">
                  <DialogHeader>
                    <DialogTitle className="text-gray-900 font-bold text-xl flex items-center gap-2">
                      <SparklesIcon className="w-6 h-6 text-blue-600" />
                      เทคโนโลยีและเทคนิคที่ใช้
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                      รายการเทคโนโลยีและเทคนิคการพัฒนาที่ใช้ในโปรเจกต์ E-commerce Demo นี้
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
                          <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <CogIcon className="w-5 h-5 text-blue-600" />
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
                                <Card className="bg-white border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
                                  <CardContent className="p-4">
                                    <div className="flex items-start justify-between mb-2">
                                      <Badge className={`${item.color} font-bold text-sm px-3 py-1`}>
                                        {item.name}
                                      </Badge>
                                    </div>
                                    <p className="text-gray-700 text-sm font-medium">{item.description}</p>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                        {categoryIndex < technologies.length - 1 && (
                          <Separator className="bg-gray-300" />
                        )}
                      </motion.div>
                    ))}

                    {/* Additional Info */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-6"
                    >
                      <div className="flex items-start gap-3">
                        <InformationCircleIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">เกี่ยวกับโปรเจกต์</h4>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            E-commerce Demo นี้สร้างขึ้นเพื่อแสดงความสามารถในการพัฒนาเว็บแอปพลิเคชันแบบสมัยใหม่ 
                            โดยใช้เทคโนโลยีล่าสุดและเทคนิคการพัฒนาที่เป็นมาตรฐานในอุตสาหกรรม 
                            ครอบคลุมตั้งแต่ UI/UX Design, State Management, Animation จนถึง Accessibility
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-blue-700 border-blue-300 font-medium">
                              🚀 Modern Stack
                            </Badge>
                            <Badge variant="outline" className="text-green-700 border-green-300 font-medium">
                              ♿ Accessible
                            </Badge>
                            <Badge variant="outline" className="text-purple-700 border-purple-300 font-medium">
                              📱 Responsive
                            </Badge>
                            <Badge variant="outline" className="text-orange-700 border-orange-300 font-medium">
                              ⚡ Performance
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                <HeartIcon className="w-5 h-5" />
                <span className="ml-2 hidden sm:inline font-medium">รายการโปรด</span>
              </Button>
              
              {/* Cart Dialog */}
              <Dialog open={showCart} onOpenChange={setShowCart}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                    <ShoppingCartIcon className="w-5 h-5" />
                    <span className="ml-2 hidden sm:inline font-medium">ตะกร้า</span>
                    {cartItemsCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 bg-red-500 text-white border-0 min-w-[20px] h-5 text-xs rounded-full font-bold">
                        {cartItemsCount}
                      </Badge>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md bg-white border-2 border-gray-300">
                  <DialogHeader>
                    <DialogTitle className="text-gray-900 font-bold">ตะกร้าสินค้า</DialogTitle>
                    <DialogDescription className="text-gray-600">
                      รายการสินค้าที่คุณเลือกไว้
                    </DialogDescription>
                  </DialogHeader>

                  <div className="max-h-96 overflow-y-auto">
                    {cart.length === 0 ? (
                      <div className="p-8 text-center">
                        <ShoppingCartIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4 font-medium">ไม่มีสินค้าในตะกร้า</p>
                        <Button onClick={() => setShowCart(false)} className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
                          เลือกซื้อสินค้า
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cart.map(item => {
                          const product = products.find(p => p.id === item.productId);
                          if (!product) return null;

                          return (
                            <div key={`${item.productId}-${item.selectedColor}`} className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg bg-gray-50">
                              <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center border border-gray-300">
                                <span className="text-xs text-gray-700 font-medium">{product.brand}</span>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900">{product.name}</h4>
                                {item.selectedColor && (
                                  <p className="text-xs text-gray-600">สี: {item.selectedColor}</p>
                                )}
                                <p className="text-sm text-gray-700 font-medium">฿{product.price.toLocaleString()}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateCartQuantity(item.productId, item.quantity - 1, item.selectedColor)}
                                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                                >
                                  <MinusIcon className="w-3 h-3" />
                                </Button>
                                <span className="w-8 text-center font-bold text-gray-900">{item.quantity}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateCartQuantity(item.productId, item.quantity + 1, item.selectedColor)}
                                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                                >
                                  <PlusIcon className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {cart.length > 0 && (
                    <div className="border-t-2 border-gray-200 pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-bold text-gray-900">รวมทั้งหมด:</span>
                        <span className="text-2xl font-bold text-blue-600">฿{cartTotal.toLocaleString()}</span>
                      </div>
                      <Button onClick={handleCheckout} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold">
                        <CreditCardIcon className="w-4 h-4 mr-2" />
                        ชำระเงิน
                      </Button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                <UserIcon className="w-5 h-5" />
                <span className="ml-2 hidden sm:inline font-medium">บัญชี</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Tech Stack Info Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <SparklesIcon className="w-4 h-4" />
              <span className="font-medium">Built with:</span>
            </span>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-0 font-medium">
                Next.js 14
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-0 font-medium">
                TypeScript
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-0 font-medium">
                shadcn/ui
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-0 font-medium">
                Framer Motion
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTechnologies(true)}
              className="text-white hover:bg-white/20 border border-white/30 font-medium"
            >
              ดูเทคนิคทั้งหมด
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters & Controls */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Categories Sidebar */}
          <div className="lg:w-64">
            <Card className="bg-white border-2 border-gray-300 shadow-lg">
              <CardHeader className="pb-3 bg-gray-50 border-b border-gray-200">
                <CardTitle className="text-lg flex items-center gap-2 text-gray-900 font-bold">
                  <FunnelIcon className="w-5 h-5" />
                  หมวดหมู่สินค้า
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 p-4">
                {categories.map(category => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "ghost"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full justify-between font-medium ${
                      selectedCategory === category.id 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <span>{category.name}</span>
                    <Badge variant="secondary" className={`ml-2 ${
                      selectedCategory === category.id 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <p className="text-gray-700 font-medium">
                  พบ <span className="font-bold text-gray-900">{filteredProducts.length}</span> สินค้า
                </p>
                <Separator orientation="vertical" className="h-6 bg-gray-300" />
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                    }
                  >
                    <Squares2X2Icon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                    }
                  >
                    <ListBulletIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 border-2 border-gray-300 text-gray-900 bg-white">
                  <SelectValue placeholder="เรียงลำดับตาม" />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-gray-300">
                  <SelectItem value="name" className="text-gray-900">ชื่อ A-Z</SelectItem>
                  <SelectItem value="price-low" className="text-gray-900">ราคาต่ำ - สูง</SelectItem>
                  <SelectItem value="price-high" className="text-gray-900">ราคาสูง - ต่ำ</SelectItem>
                  <SelectItem value="rating" className="text-gray-900">คะแนนสูงสุด</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`group bg-white border-2 border-gray-300 hover:shadow-xl hover:border-blue-400 transition-all duration-300 ${
                    viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
                  }`}>
                    <div className={viewMode === 'list' ? 'sm:w-48 flex-shrink-0' : ''}>
                      {/* Product Image */}
                      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center relative overflow-hidden border-b border-gray-300">
                        <span className="text-gray-600 font-bold text-lg">
                          {product.brand} {product.name.split(' ')[0]}
                        </span>
                        
                        {/* Product Tags */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1">
                          {product.tags.map(tag => (
                            <Badge key={tag} className={`text-xs font-bold border ${getTagColor(tag)}`}>
                              {getTagText(tag)}
                            </Badge>
                          ))}
                        </div>

                        {/* Favorite Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(product.id)}
                          className={`absolute top-3 right-3 w-8 h-8 rounded-full border-2 ${
                            favorites.includes(product.id) 
                              ? 'text-red-600 bg-red-50 hover:bg-red-100 border-red-300' 
                              : 'text-gray-600 bg-white hover:bg-gray-100 border-gray-300'
                          }`}
                        >
                          <HeartIcon className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                    </div>

                    <CardContent className={`p-4 flex-1 ${viewMode === 'list' ? 'flex flex-col justify-between' : ''}`}>
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-sm text-gray-600 font-semibold">{product.brand}</p>
                            <h3 className="font-bold text-gray-900 mb-1 text-lg">{product.name}</h3>
                          </div>
                        </div>

                        <p className="text-sm text-gray-700 mb-3 line-clamp-2">{product.description}</p>

                        {/* Rating & Reviews */}
                        <div className="flex items-center mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating)
                                    ? 'text-yellow-500 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-700 ml-2 font-medium">
                            {product.rating} ({product.reviews} รีวิว)
                          </span>
                        </div>

                        {/* Colors */}
                        {product.colors.length > 0 && (
                          <div className="mb-3">
                            <p className="text-xs text-gray-600 mb-1 font-semibold">สีที่มี:</p>
                            <div className="flex gap-1">
                              {product.colors.slice(0, 4).map((color, idx) => (
                                <div
                                  key={idx}
                                  className="w-6 h-6 rounded-full border-2 border-gray-400 bg-gradient-to-r from-gray-400 to-gray-500"
                                  title={color}
                                />
                              ))}
                              {product.colors.length > 4 && (
                                <div className="w-6 h-6 rounded-full border-2 border-gray-400 bg-gray-200 flex items-center justify-center">
                                  <span className="text-xs text-gray-700 font-bold">+{product.colors.length - 4}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Price */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl font-bold text-gray-900">
                            ฿{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <>
                              <span className="text-sm text-gray-500 line-through font-medium">
                                ฿{product.originalPrice.toLocaleString()}
                              </span>
                              <Badge className="bg-red-100 text-red-800 border-red-300 font-bold">
                                ประหยัด ฿{(product.originalPrice - product.price).toLocaleString()}
                              </Badge>
                            </>
                          )}
                        </div>

                        {/* Stock */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className={`w-2 h-2 rounded-full ${
                            product.stock > 10 ? 'bg-green-500' : 
                            product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                          <span className="text-sm text-gray-700 font-medium">
                            {product.stock > 10 ? 'พร้อมส่ง' :
                             product.stock > 0 ? `เหลือ ${product.stock} ชิ้น` : 'สินค้าหมด'}
                          </span>
                          {product.stock <= 5 && product.stock > 0 && (
                            <Badge variant="outline" className="text-orange-700 border-orange-400 font-bold">
                              <ClockIcon className="w-3 h-3 mr-1" />
                              เหลือน้อย
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          onClick={() => addToCart(product.id)}
                          disabled={product.stock === 0}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500"
                        >
                          <ShoppingCartIcon className="w-4 h-4 mr-2" />
                          {product.stock === 0 ? 'สินค้าหมด' : 'เพิ่มลงตะกร้า'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Dialog */}
      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-white border-2 border-gray-300">
          <DialogHeader>
            <DialogTitle className="text-gray-900 font-bold text-xl">ชำระเงิน</DialogTitle>
            <DialogDescription className="text-gray-600">
              กรอกข้อมูลเพื่อดำเนินการสั่งซื้อ
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-gray-900 font-semibold">ชื่อ</Label>
                <Input id="firstName" placeholder="กรอกชื่อ" className="border-2 border-gray-300 text-gray-900" />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-gray-900 font-semibold">นามสกุล</Label>
                <Input id="lastName" placeholder="กรอกนามสกุล" className="border-2 border-gray-300 text-gray-900" />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-900 font-semibold">อีเมล</Label>
              <Input id="email" type="email" placeholder="example@email.com" className="border-2 border-gray-300 text-gray-900" />
            </div>

            <div>
              <Label htmlFor="address" className="text-gray-900 font-semibold">ที่อยู่จัดส่ง</Label>
              <Input id="address" placeholder="บ้านเลขที่ ถนน ตำบล อำเภอ" className="border-2 border-gray-300 text-gray-900" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="province" className="text-gray-900 font-semibold">จังหวัด</Label>
                <Select>
                  <SelectTrigger className="border-2 border-gray-300 text-gray-900">
                    <SelectValue placeholder="เลือกจังหวัด" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-300">
                    <SelectItem value="bangkok" className="text-gray-900">กรุงเทพมหานคร</SelectItem>
                    <SelectItem value="chiangmai" className="text-gray-900">เชียงใหม่</SelectItem>
                    <SelectItem value="phuket" className="text-gray-900">ภูเก็ต</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="zipcode" className="text-gray-900 font-semibold">รหัสไปรษณีย์</Label>
                <Input id="zipcode" placeholder="10000" className="border-2 border-gray-300 text-gray-900" />
              </div>
            </div>
            
            <Separator className="bg-gray-300" />

            <div>
              <h4 className="font-bold mb-3 text-gray-900">ช่องทางการชำระเงิน</h4>
              <div className="space-y-3">
                {[
                  { id: 'credit', label: 'บัตรเครดิต/เดบิต', icon: CreditCardIcon },
                  { id: 'promptpay', label: 'PromptPay', icon: '💳' },
                  { id: 'bank', label: 'โอนเงินผ่านธนาคาร', icon: '🏦' }
                ].map((method) => (
                  <label key={method.id} className="flex items-center gap-3 p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 bg-white">
                    <input type="radio" name="payment" defaultChecked={method.id === 'credit'} />
                    {typeof method.icon === 'string' ? (
                      <span className="text-xl">{method.icon}</span>
                    ) : (
                      <method.icon className="w-5 h-5 text-gray-700" />
                    )}
                    <span className="text-gray-900 font-medium">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <Separator className="bg-gray-300" />

            <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-900 font-medium">ยอดรวมสินค้า:</span>
                <span className="text-gray-900 font-bold">฿{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-900 font-medium">ค่าจัดส่ง:</span>
                <span className="text-green-600 font-bold">ฟรี</span>
              </div>
              <Separator className="my-2 bg-gray-300" />
              <div className="flex justify-between items-center font-bold text-lg">
                <span className="text-gray-900">ยอดรวมทั้งหมด:</span>
                <span className="text-blue-600">฿{cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <Button onClick={completeOrder} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg py-6">
              <CheckCircleIcon className="w-5 h-5 mr-2" />
              ยืนยันการสั่งซื้อ
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}