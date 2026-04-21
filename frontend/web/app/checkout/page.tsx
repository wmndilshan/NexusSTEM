'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ShieldCheck, 
  ChevronRight, 
  Building2, 
  CreditCard, 
  Banknote,
  Send,
  Upload,
  Info,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<'payhere' | 'koko' | 'bank_transfer'>('payhere');
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgreed) {
       toast.error("Please agree to the Terms & Conditions");
       return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Order placed successfully!");
      router.push('/checkout/success');
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-zinc-50/30">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/cart" className="hover:text-primary transition-colors">Cart</Link>
            <ChevronRight size={12} />
            <span className="text-zinc-600">Checkout</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Form Section */}
            <form onSubmit={handleSubmitOrder} className="lg:col-span-8 flex-1 space-y-8">
              {/* Customer Info */}
              <div className="bg-white rounded-3xl border border-zinc-100 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">1</div>
                  <h2 className="text-xl font-heading font-black tracking-tight">Customer Information</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-xs font-bold text-zinc-400 uppercase tracking-widest">First Name</Label>
                    <Input id="firstName" placeholder="Nimal" required className="h-11 border-zinc-200" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Last Name</Label>
                    <Input id="lastName" placeholder="Silva" required className="h-11 border-zinc-200" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Email Address</Label>
                    <Input id="email" type="email" placeholder="nimal@gmail.com" required className="h-11 border-zinc-200" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Phone Number (LK)</Label>
                    <Input id="phone" type="tel" placeholder="+94 77 XXX XXXX" required className="h-11 border-zinc-200" />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-3xl border border-zinc-100 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">2</div>
                  <h2 className="text-xl font-heading font-black tracking-tight">Delivery Address</h2>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Stress Address</Label>
                    <Input id="address" placeholder="123, Galle Road" required className="h-11 border-zinc-200" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-xs font-bold text-zinc-400 uppercase tracking-widest">City</Label>
                      <Input id="city" placeholder="Colombo 03" required className="h-11 border-zinc-200" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="district" className="text-xs font-bold text-zinc-400 uppercase tracking-widest">District</Label>
                      <Input id="district" placeholder="Colombo" required className="h-11 border-zinc-200" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="bg-white rounded-3xl border border-zinc-100 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">3</div>
                  <h2 className="text-xl font-heading font-black tracking-tight">Payment Method</h2>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <PaymentCard 
                    id="payhere" 
                    title="PayHere" 
                    subtitle="Visa / Master / Amex"
                    icon={<CreditCard size={20} />}
                    active={paymentMethod === 'payhere'}
                    onClick={() => setPaymentMethod('payhere')}
                  />
                  <PaymentCard 
                    id="koko" 
                    title="Koko" 
                    subtitle="3 Interest-free splits"
                    icon={<Send size={20} />}
                    active={paymentMethod === 'koko'}
                    onClick={() => setPaymentMethod('koko')}
                  />
                  <PaymentCard 
                    id="bank_transfer" 
                    title="Bank Transfer" 
                    subtitle="Manual Verification"
                    icon={<Banknote size={20} />}
                    active={paymentMethod === 'bank_transfer'}
                    onClick={() => setPaymentMethod('bank_transfer')}
                  />
                </div>

                {/* Conditional Payment UI */}
                <div className="mt-8 transition-all animate-in fade-in slide-in-from-top-2">
                   {paymentMethod === 'bank_transfer' ? (
                     <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
                        <div className="flex items-center gap-2 text-primary font-bold mb-4">
                          <Info size={18} />
                          <span className="text-sm">Bank Details for Transfer</span>
                        </div>
                        <div className="space-y-4 text-sm">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                              <span className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">Bank Name</span>
                              <span className="font-bold">Commercial Bank PLC</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">Branch</span>
                              <span className="font-bold">Kollupitiya</span>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">Account Name</span>
                            <span className="font-bold">NexusSTEM Electronics (PVT) LTD</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">Account Number</span>
                            <span className="text-xl font-heading font-black tracking-tight text-primary">102030405060</span>
                          </div>
                          <Separator className="bg-zinc-200" />
                          <div className="flex flex-col gap-3">
                             <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">Transfer Reference Instructions</span>
                             <p className="text-xs text-zinc-600 bg-zinc-100 p-3 rounded-lg border border-zinc-200">
                               Please use your <strong>Phone Number</strong> as the reference while transferring. 
                             </p>
                          </div>
                          <div className="space-y-2 mt-4">
                             <Label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Upload Payment Proof (JPEG/PDF)</Label>
                             <div className="border-2 border-dashed border-zinc-200 rounded-xl p-8 text-center hover:border-primary/40 transition-colors cursor-pointer bg-white">
                                <Upload size={24} className="mx-auto text-zinc-300 mb-2" />
                                <span className="text-xs font-bold text-zinc-400">Click to upload transfer slip screenshot</span>
                             </div>
                          </div>
                        </div>
                     </div>
                   ) : (
                     <div className="flex items-center gap-4 bg-zinc-50 p-6 rounded-2xl text-sm font-medium text-zinc-600 border border-zinc-100">
                        <CheckCircle2 className="text-emerald-500 shrink-0" />
                        <span>You will be redirected to the secure {paymentMethod === 'payhere' ? 'PayHere' : 'Koko'} portal after clicking confirm.</span>
                     </div>
                   )}
                </div>
              </div>

               {/* Agreement */}
               <div className="flex items-start gap-3 p-4">
                <Checkbox id="terms" checked={isAgreed} onCheckedChange={(val) => setIsAgreed(val === true)} />
                <Label htmlFor="terms" className="text-sm font-medium text-zinc-600 leading-normal cursor-pointer">
                  I agree to the <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and <Link href="#" className="text-primary hover:underline">Shipping Policy</Link>. I understand that international development boards are subject to local usage terms.
                </Label>
              </div>
            </form>

            {/* Sidebar Summary */}
            <aside className="lg:w-[400px] shrink-0">
               <div className="bg-white rounded-3xl border border-zinc-100 p-8 shadow-sm flex flex-col gap-6 sticky top-24">
                  <h3 className="font-heading font-black text-xl tracking-tight">Order Details</h3>
                  <div className="space-y-6 max-h-[300px] overflow-auto pr-2 scrollbar-thin">
                    <OrderItem name="Arduino Uno R3 Compatible" price="3,850" quantity={2} />
                    <OrderItem name="HC-SR04 Ultrasonic Sensor" price="450" quantity={5} />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-500 font-medium tracking-tight">Items Subtotal</span>
                      <span className="font-bold">LKR 9,950</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-500 font-medium tracking-tight">Delivery Fee</span>
                      <span className="font-bold">LKR 350</span>
                    </div>
                    <Separator className="opacity-50" />
                    <div className="flex justify-between items-end pt-2">
                       <div className="flex flex-col">
                         <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Grand Total</span>
                         <span className="text-3xl font-heading font-black text-primary tracking-tighter">LKR 10,300</span>
                       </div>
                    </div>
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full h-14 rounded-full text-base font-bold shadow-lg shadow-primary/25 gap-2"
                    disabled={isSubmitting}
                    onClick={handleSubmitOrder}
                  >
                    {isSubmitting ? "Processing..." : "Confirm & Pay Order"}
                  </Button>

                  <div className="flex items-center gap-3 justify-center text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    256-bit Secure Checkout
                  </div>
               </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function PaymentCard({ id, title, subtitle, icon, active, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center text-center gap-2",
        active 
          ? "border-primary bg-primary/5 shadow-md shadow-primary/10" 
          : "border-zinc-100 bg-white hover:border-zinc-200"
      )}
    >
      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center transition-colors", active ? "bg-primary text-white" : "bg-zinc-50 text-zinc-400")}>
        {icon}
      </div>
      <div className="flex flex-col">
        <span className={cn("text-sm font-black tracking-tight", active ? "text-primary" : "text-zinc-900")}>{title}</span>
        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest whitespace-nowrap">{subtitle}</span>
      </div>
      {active && (
        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
           <CheckCircle2 size={10} className="text-white" />
        </div>
      )}
    </div>
  );
}

function OrderItem({ name, price, quantity }: any) {
  return (
    <div className="flex gap-4 items-center">
       <div className="w-12 h-12 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center text-[10px] font-bold text-zinc-400 shrink-0">
          IMG
       </div>
       <div className="flex-1">
          <h4 className="text-xs font-bold text-zinc-900 line-clamp-1">{name}</h4>
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Qty: {quantity}</span>
       </div>
       <span className="text-xs font-black text-primary">LKR {price}</span>
    </div>
  );
}
