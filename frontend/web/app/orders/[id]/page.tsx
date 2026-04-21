'use client';

import { use } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle2, 
  Circle, 
  Package, 
  Truck, 
  MapPin, 
  ChevronRight,
  ShoppingBag,
  ExternalLink,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function OrderTrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const steps = [
    { title: 'Order Placed', time: 'April 21, 10:45 AM', status: 'completed', icon: <ShoppingBag size={18} /> },
    { title: 'Payment Verified', time: 'April 21, 11:30 AM', status: 'completed', icon: <CheckCircle2 size={18} /> },
    { title: 'Processing in Warehouse', time: 'April 21, 14:20 PM', status: 'current', icon: <Package size={18} /> },
    { title: 'Dispatched with Courier', time: 'Estimating...', status: 'pending', icon: <Truck size={18} /> },
    { title: 'Out for Delivery', time: 'Estimating...', status: 'pending', icon: <MapPin size={18} /> },
    { title: 'Delivered', time: 'Estimating...', status: 'pending', icon: <CheckCircle2 size={18} /> },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-zinc-50/50">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/b2b/dashboard" className="hover:text-primary transition-colors">My Account</Link>
            <ChevronRight size={12} />
            <span className="text-zinc-600">Track Order</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:items-start">
            {/* Tracking Timeline */}
            <div className="lg:col-span-12 xl:col-span-8 space-y-6">
              <div className="bg-white rounded-[32px] border border-zinc-100 p-8 md:p-12 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                  <div>
                    <h1 className="text-3xl font-heading font-black tracking-tight text-zinc-900 mb-2">Track Order</h1>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/10">Order #ID-{id}</span>
                      <span className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 uppercase tracking-widest"><Clock size={14} /> Est. Delivery: April 25</span>
                    </div>
                  </div>
                  <Button variant="outline" className="rounded-full gap-2 border-zinc-100 font-bold text-xs uppercase tracking-widest px-6 h-11">
                    Download In-Invoice <ExternalLink size={14} />
                  </Button>
                </div>

                <div className="relative pl-12 space-y-12">
                  {/* Vertical Line */}
                  <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-zinc-100" />

                  {steps.map((step, idx) => (
                    <div key={idx} className="relative group">
                      {/* Indicator */}
                      <div className={cn(
                        "absolute -left-12 w-12 h-12 rounded-full border-4 border-white flex items-center justify-center transition-all z-10",
                        step.status === 'completed' ? "bg-emerald-500 text-white" : 
                        step.status === 'current' ? "bg-primary text-white animate-pulse shadow-lg shadow-primary/20 scale-110" : 
                        "bg-zinc-100 text-zinc-300"
                      )}>
                        {step.icon}
                      </div>

                      <div className={cn(
                        "flex flex-col gap-1 transition-opacity",
                        step.status === 'pending' ? "opacity-50" : "opacity-100"
                      )}>
                        <h3 className={cn(
                          "font-heading font-bold text-lg",
                          step.status === 'current' ? "text-primary font-black" : "text-zinc-900"
                        )}>
                          {step.title}
                        </h3>
                        <p className="text-sm text-zinc-500 font-medium">{step.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary Card */}
            <div className="lg:col-span-12 xl:col-span-4 space-y-6">
               <div className="bg-zinc-900 rounded-[32px] p-8 text-white shadow-xl">
                  <h3 className="font-heading font-bold text-xl mb-6">Delivery Details</h3>
                  <div className="space-y-8">
                     <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                          <MapPin size={20} className="text-white" />
                        </div>
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">Shipping Address</p>
                           <p className="text-sm text-zinc-300 leading-relaxed">
                             123, Galle Road, Colombo 03,<br />Sri Lanka.
                           </p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                          <Truck size={20} className="text-white" />
                        </div>
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">Courier Partner</p>
                           <p className="text-sm text-zinc-300">Prompt Express SL</p>
                           <p className="text-[10px] font-bold text-primary bg-white/10 px-2 py-0.5 rounded-full w-fit mt-2 tracking-widest">Awaiting Tracking ID</p>
                        </div>
                     </div>
                  </div>
                  
                  <Separator className="my-8 bg-white/10" />
                  
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-4">Items Summary</h4>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-400">Total Items</span>
                      <span className="font-bold">7 Units</span>
                    </div>
                    <div className="flex justify-between items-end pt-4">
                       <div className="flex flex-col">
                         <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Amount Paid</span>
                         <span className="text-3xl font-heading font-black text-white tracking-tighter">LKR 10,300</span>
                       </div>
                    </div>
                  </div>
               </div>

               <div className="bg-primary/5 rounded-[32px] p-8 border border-primary/10">
                  <h4 className="font-heading font-bold text-primary mb-2">Need Technical Help?</h4>
                  <p className="text-xs text-zinc-600 leading-relaxed mb-6">
                    If you&apos;re unsure how to set up your new sensors once they arrive, visit our documentation hub or chat with a lab expert.
                  </p>
                  <Button variant="default" className="w-full rounded-2xl font-bold bg-primary hover:bg-primary/90 text-white">
                    Access Lab Guides
                  </Button>
               </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
