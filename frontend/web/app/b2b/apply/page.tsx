'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Building2, 
  Send, 
  ArrowRight, 
  CheckCircle2, 
  Briefcase, 
  ShoppingCart,
  GraduationCap,
  Microscope
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function B2BApplyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-zinc-50/50 pt-20 pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Value Proposition */}
            <div className="lg:col-span-12 xl:col-span-5 space-y-12">
               <div>
                  <div className="w-16 h-16 bg-primary text-white rounded-[24px] flex items-center justify-center mb-8 shadow-xl shadow-primary/20">
                    <Building2 size={32} />
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-heading font-black tracking-tight text-zinc-900 leading-[1.1] mb-6">
                    Professional <span className="text-primary italic">Support</span> for Scale.
                  </h1>
                  <p className="text-lg text-zinc-600 leading-relaxed font-medium">
                    We partner with over 450 educational labs, startups, and manufacturers across Sri Lanka to provide a reliable technical supply chain.
                  </p>
               </div>

               <div className="grid gap-8">
                  <div className="flex gap-4 p-6 bg-white rounded-3xl border border-zinc-100 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><ShoppingCart size={20} /></div>
                    <div>
                      <h4 className="font-bold text-sm mb-1 uppercase tracking-widest text-zinc-400">Wholesale Pricing</h4>
                      <p className="text-zinc-600 text-sm">Unlock bulk pricing tiers automatically for verified business accounts.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-6 bg-white rounded-3xl border border-zinc-100 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><GraduationCap size={20} /></div>
                    <div>
                      <h4 className="font-bold text-sm mb-1 uppercase tracking-widest text-zinc-400">Educational Grants</h4>
                      <p className="text-zinc-600 text-sm">Special programs for university labs and high school STEM clubs.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-6 bg-white rounded-3xl border border-zinc-100 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><Microscope size={20} /></div>
                    <div>
                      <h4 className="font-bold text-sm mb-1 uppercase tracking-widest text-zinc-400">Technical Sourcing</h4>
                      <p className="text-zinc-600 text-sm">Need a specific sensor not in our catalog? Our team can source it globally for you.</p>
                    </div>
                  </div>
               </div>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-12 xl:col-span-7 bg-white rounded-[40px] border border-zinc-100 p-8 md:p-12 shadow-2xl shadow-zinc-200/50">
               <h2 className="text-2xl font-heading font-black tracking-tight mb-2">Wholesale Application</h2>
               <p className="text-zinc-400 text-sm font-medium mb-10 uppercase tracking-widest">Typical approval in 24-48 business hours</p>
               
               <form className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Company / Institute Name</Label>
                      <Input placeholder="eg: University of Moratuwa Robotics Lab" className="h-12 border-zinc-200 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                       <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Business Type</Label>
                       <select className="flex h-12 w-full items-center justify-between rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                          <option>Select Type</option>
                          <option>University / Education</option>
                          <option>Software / Tech Firm</option>
                          <option>Manufacturing</option>
                          <option>Individual Contractor</option>
                       </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Contact Person Name</Label>
                      <Input placeholder="John Doe" className="h-12 border-zinc-200 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Official Mobile Number</Label>
                      <Input placeholder="+94 77 XXX XXXX" className="h-12 border-zinc-200 rounded-xl" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Official Email</Label>
                    <Input id="email" type="email" placeholder="official@institute.lk" className="h-12 border-zinc-200 rounded-xl" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Expected Monthly Volume (LKR)</Label>
                    <Input id="volume" type="number" placeholder="eg: 500,000" className="h-12 border-zinc-200 rounded-xl" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Brief about your Projects / Requirements</Label>
                    <textarea 
                      className="w-full min-h-[120px] p-4 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Tell us what you usually source and how we can support your technical needs..."
                    ></textarea>
                  </div>

                  <Button size="lg" className="w-full h-14 rounded-full font-bold bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 gap-2">
                    Submit Business Profile <Send size={18} />
                  </Button>
               </form>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
