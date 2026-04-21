import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  Package, 
  MapPin, 
  Calendar, 
  ArrowRight,
  TrendingUp,
  Cpu
} from 'lucide-react';

export default function OrderSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-zinc-50/30 flex items-center py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-[40px] shadow-2xl shadow-zinc-200/50 border border-zinc-100 overflow-hidden">
            <div className="bg-primary p-12 text-center text-white relative">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
                <CheckCircle2 size={40} className="text-white" />
              </div>
              <h1 className="text-4xl font-heading font-black tracking-tight mb-2">Order Confirmed!</h1>
              <p className="text-primary-foreground opacity-80 font-bold uppercase tracking-[0.2em] text-xs">Order ID: #NX-0024589</p>
              
              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
            </div>

            <div className="p-8 lg:p-12">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-primary shrink-0"><Package size={20} /></div>
                    <div>
                      <h4 className="font-bold text-sm mb-1 uppercase tracking-widest text-zinc-400">Order Updates</h4>
                      <p className="text-zinc-600 text-sm">We&apos;ve sent a confirmation email to <strong>nimal@gmail.com</strong> with your receipt and next steps.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-primary shrink-0"><MapPin size={20} /></div>
                    <div>
                      <h4 className="font-bold text-sm mb-1 uppercase tracking-widest text-zinc-400">Shipping To</h4>
                      <p className="text-zinc-600 text-sm">123, Galle Road, Colombo 03, Sri Lanka.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-primary shrink-0"><Calendar size={20} /></div>
                    <div>
                      <h4 className="font-bold text-sm mb-1 uppercase tracking-widest text-zinc-400">Estimated Delivery</h4>
                      <p className="text-zinc-600 text-sm font-bold text-primary">April 24 - April 26, 2026</p>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-50 rounded-3xl p-8 flex flex-col justify-center gap-6">
                  <div className="text-center space-y-2">
                    <TrendingUp size={32} className="mx-auto text-primary opacity-20" />
                    <h3 className="font-heading font-black text-xl tracking-tight">Track Progress</h3>
                    <p className="text-xs text-zinc-500 font-medium">Keep an eye on your shipment in real-time as it moves through our Nexus.</p>
                  </div>
                  <Link href="/orders/track">
                    <Button className="w-full rounded-2xl h-12 font-bold shadow-lg shadow-primary/10">
                      Track Order Status
                    </Button>
                  </Link>
                  <Link href="/products" className="text-center text-xs font-black uppercase tracking-widest text-primary hover:underline">
                    Back to Storefront
                  </Link>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <Cpu size={24} className="text-zinc-300" />
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Team NexusSTEM Sri Lanka</span>
                </div>
                <div className="flex gap-4">
                  <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest">Print Receipt</Button>
                  <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest">Share Order</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
