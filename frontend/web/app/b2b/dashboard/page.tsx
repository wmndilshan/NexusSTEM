'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Building2, 
  Package, 
  Clock, 
  ChevronRight, 
  BarChart3, 
  CreditCard,
  Settings,
  ArrowUpRight,
  TrendingUp,
  Boxes,
  Zap,
  Cpu
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function B2BDashboardPage() {
  const recentOrders = [
    { id: 'NX-12401', date: 'April 19, 2026', total: '24,500', status: 'Delivered' },
    { id: 'NX-12455', date: 'April 21, 2026', total: '10,300', status: 'Processing' },
    { id: 'NX-12390', date: 'April 10, 2026', total: '158,000', status: 'Delivered' },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-zinc-50/50">
        <div className="container mx-auto px-4 py-12">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
             <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white rounded-2xl border border-zinc-100 flex items-center justify-center p-3 shadow-sm">
                  <div className="w-full h-full bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <Building2 size={24} />
                  </div>
                </div>
                <div>
                   <h1 className="text-3xl font-heading font-black tracking-tight text-zinc-900">Mora Robotics Lab</h1>
                   <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-primary/5 px-3 py-0.5 rounded-full border border-primary/10">Platinum Partner</span>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest italic">User ID: LAB-245-MOR</span>
                   </div>
                </div>
             </div>
             
             <div className="flex items-center gap-3">
                <Button variant="outline" className="rounded-xl h-11 border-zinc-100 font-bold text-xs uppercase tracking-widest gap-2">
                   <Settings size={16} /> Account Manage
                </Button>
                <Link href="/products">
                  <Button className="rounded-xl h-11 bg-primary text-white font-bold text-xs uppercase tracking-widest gap-2 shadow-lg shadow-primary/20">
                    <Zap size={16} /> Quick Restock
                  </Button>
                </Link>
             </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Stats Overview */}
            <div className="lg:col-span-8 space-y-8">
               <div className="grid sm:grid-cols-3 gap-6">
                  <StatCard title="Total Orders" value="24" icon={<Package size={18} />} trend="+2 this month" />
                  <StatCard title="Total Spent" value="LKR 458K" icon={<TrendingUp size={18} />} trend="+15%" />
                  <StatCard title="Active Projects" value="8" icon={<Boxes size={18} />} trend="Standard Member" />
               </div>

               {/* Recent Orders Table */}
               <div className="bg-white rounded-[32px] border border-zinc-100 overflow-hidden shadow-sm">
                  <div className="p-8 border-b border-zinc-50 flex items-center justify-between">
                     <h3 className="font-heading font-black text-xl tracking-tight">Recent Activity</h3>
                     <Link href="#" className="text-xs font-bold text-primary uppercase tracking-[0.2em] hover:underline">View History</Link>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead>
                          <tr className="bg-zinc-50 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 border-b border-zinc-100">
                             <th className="px-8 py-4">Order ID</th>
                             <th className="px-8 py-4">Date</th>
                             <th className="px-8 py-4">Total (LKR)</th>
                             <th className="px-8 py-4">Status</th>
                             <th className="px-8 py-4"></th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-zinc-50">
                          {recentOrders.map((order) => (
                             <tr key={order.id} className="text-sm group hover:bg-zinc-50 transition-colors">
                                <td className="px-8 py-6 font-bold text-zinc-900">{order.id}</td>
                                <td className="px-8 py-6 text-zinc-500 font-medium">{order.date}</td>
                                <td className="px-8 py-6 font-black text-primary">{order.total}</td>
                                <td className="px-8 py-6">
                                   <span className={cn(
                                     "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full",
                                     order.status === 'Delivered' ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"
                                   )}>
                                     {order.status}
                                   </span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                   <Link href={`/orders/${order.id}`}>
                                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-all font-bold text-[10px] uppercase tracking-widest gap-2">
                                        Track <ArrowUpRight size={14} />
                                      </Button>
                                   </Link>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                  </div>
               </div>

               {/* B2B Exclusive Notice */}
               <div className="bg-primary rounded-[32px] p-8 text-white relative overflow-hidden group">
                  <div className="relative z-10">
                     <h3 className="text-2xl font-heading font-black tracking-tight mb-2">Priority Sourcing Line</h3>
                     <p className="text-primary-foreground opacity-80 text-sm max-w-lg mb-6 leading-relaxed">
                        As a Platinum Partner, you have access to unlisted component sourcing. If our catalog doesn&apos;t have it, we&apos;ll fly it in tailored to your BOM.
                     </p>
                     <Button variant="secondary" className="rounded-xl font-bold gap-2">
                        Open Technical Request <ArrowUpRight size={18} />
                     </Button>
                  </div>
                  <div className="absolute top-1/2 right-8 -translate-y-1/2 opacity-20 group-hover:scale-110 transition-transform">
                     <Cpu size={140} />
                  </div>
               </div>
            </div>

            {/* Account Sidebar */}
            <div className="lg:col-span-4 space-y-8">
               <div className="bg-white rounded-[32px] border border-zinc-100 p-8 shadow-sm">
                  <h3 className="font-heading font-black text-xl mb-6">Payment Options</h3>
                  <div className="space-y-4">
                     <div className="p-4 rounded-2xl border border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <CreditCard size={18} className="text-zinc-400" />
                           <span className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Saved Bank Account</span>
                        </div>
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest uppercase tracking-widest">Verified</span>
                     </div>
                     <div className="p-4 rounded-2xl border border-dashed border-zinc-200 flex items-center justify-center gap-3 text-zinc-400 hover:text-primary hover:border-primary/40 transition-colors cursor-pointer group">
                        <span className="text-[10px] font-black uppercase tracking-widest">Link Corporate Card</span>
                        <div className="w-6 h-6 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                           <ChevronRight size={14} />
                        </div>
                     </div>
                  </div>
               </div>

               <div className="bg-white rounded-[32px] border border-zinc-100 p-8 shadow-sm">
                  <h3 className="font-heading font-black text-xl mb-6">Your Labs</h3>
                  <div className="space-y-4">
                     <LabItem name="Moratuwa - Electronics Lab" active />
                     <LabItem name="Kandy - Innovation Center" />
                     <LabItem name="Jaffna - STEM Hub 01" />
                  </div>
                  <Button variant="outline" className="w-full mt-8 rounded-xl font-bold text-[10px] uppercase tracking-widest border-zinc-100">
                    Add New Location
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

function StatCard({ title, value, icon, trend }: any) {
  return (
    <div className="bg-white rounded-3xl border border-zinc-100 p-6 shadow-sm">
       <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-400">{icon}</div>
          <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 whitespace-nowrap">{trend}</span>
       </div>
       <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-1">{title}</span>
          <span className="text-2xl font-heading font-black text-zinc-900 tracking-tighter">{value}</span>
       </div>
    </div>
  );
}

function LabItem({ name, active }: any) {
  return (
    <div className={cn(
      "flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer",
      active ? "bg-primary/5 border-primary/10" : "bg-white border-zinc-50 hover:bg-zinc-50"
    )}>
       <div className="flex items-center gap-3">
          <div className={cn("w-2 h-2 rounded-full", active ? "bg-primary" : "bg-zinc-200")} />
          <span className={cn("text-xs font-bold", active ? "text-zinc-900" : "text-zinc-500")}>{name}</span>
       </div>
       <ChevronRight size={14} className={cn(active ? "text-primary" : "text-zinc-300")} />
    </div>
  );
}
