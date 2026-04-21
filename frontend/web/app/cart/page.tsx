'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PRODUCTS } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Trash2, 
  Minus, 
  Plus, 
  ArrowRight, 
  ShoppingBag,
  ChevronRight,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { cn } from '@/lib/utils';

import { useState, useEffect } from 'react';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<{ id: string; name: string; slug: string; price: number; image: string; sku: string; quantity: number }[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initializing on client to avoid hydration mismatch and potential RSC fetch issues
    setCartItems([
      { ...PRODUCTS[0], quantity: 2 },
      { ...PRODUCTS[2], quantity: 5 },
    ]);
    setIsLoaded(true);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = 350;
  const total = subtotal + deliveryFee;

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items => items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1" />
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-32 text-center">
          <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6 text-zinc-300">
            <ShoppingBag size={40} />
          </div>
          <h1 className="text-3xl font-heading font-black mb-4 tracking-tight">Your cart is empty</h1>
          <p className="text-zinc-500 mb-8 max-w-sm mx-auto">Looks like you haven&apos;t added any components to your project yet.</p>
          <Link href="/products">
            <Button size="lg" className="rounded-full px-8">Start Shopping</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-zinc-50/30">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-zinc-600">Shopping Cart</span>
          </div>

          <h1 className="text-4xl font-heading font-black text-zinc-900 tracking-tight mb-12">Review Cart</h1>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b bg-zinc-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                  <div className="col-span-6">Product Details</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Subtotal</div>
                </div>
                
                <div className="divide-y divide-zinc-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center group">
                      <div className="col-span-12 md:col-span-6 flex gap-4">
                        <div className="w-20 h-20 relative rounded-xl overflow-hidden bg-zinc-50 shrink-0 border border-zinc-100">
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            fill 
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <Link href={`/products/${item.slug}`} className="font-bold text-zinc-900 hover:text-primary transition-colors line-clamp-1">
                            {item.name}
                          </Link>
                          <span className="text-xs text-zinc-400 font-medium">SKU: {item.sku}</span>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold text-red-500 hover:text-red-600 mt-2 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={12} /> Remove
                          </button>
                        </div>
                      </div>
                      
                      <div className="col-span-4 md:col-span-2 text-center">
                        <span className="text-sm md:text-base font-bold text-zinc-900">LKR {item.price.toLocaleString()}</span>
                      </div>
                      
                      <div className="col-span-4 md:col-span-2 flex justify-center">
                        <div className="flex items-center border border-zinc-200 rounded-full h-9 px-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 rounded-full text-zinc-400 hover:text-primary"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus size={14} />
                          </Button>
                          <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 rounded-full text-zinc-400 hover:text-primary"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="col-span-4 md:col-span-2 text-right">
                        <span className="font-heading font-bold text-primary">LKR {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4">
                <Link href="/products">
                  <Button variant="ghost" className="text-zinc-500 font-bold hover:text-primary transition-colors">
                    ← Continue Shopping
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => setCartItems([])}>
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl border border-zinc-100 p-8 shadow-sm">
                <h3 className="font-heading font-black text-xl mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-zinc-500">Subtotal</span>
                    <span className="text-zinc-900">LKR {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <div className="flex flex-col">
                      <span className="text-zinc-500">Delivery Fee</span>
                      <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Colombo/Gampaha Area</span>
                    </div>
                    <span className="text-zinc-900">LKR {deliveryFee.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-end pt-2">
                    <div className="flex flex-col">
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Total Price</span>
                       <span className="text-2xl font-heading font-bold text-primary">LKR {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button size="lg" className="w-full h-14 rounded-full text-base font-bold shadow-lg shadow-primary/25 gap-2">
                    Checkout <ArrowRight size={18} />
                  </Button>
                </Link>
                
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium">
                    <ShieldCheck size={16} className="text-emerald-500" />
                    <span>Quality check before shipment</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-zinc-500 font-medium">
                    <CreditCard size={16} className="text-primary" />
                    <span>Secure payments via PayHere</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-zinc-900 rounded-3xl p-8 text-white">
                <h4 className="font-heading font-bold mb-2">B2B Order?</h4>
                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                  Business accounts get bulk discounts on these items automatically if approved.
                </p>
                <Link href="/b2b/login">
                  <Button variant="secondary" className="w-full rounded-xl font-bold bg-white/10 text-white hover:bg-white/20 border-white/10">
                    Switch to Business Auth
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
