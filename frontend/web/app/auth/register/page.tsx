'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Cpu, ArrowRight, UserPlus, Mail, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-zinc-50/50 flex flex-col justify-center items-center py-20 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-[32px] border border-zinc-100 p-8 md:p-12 shadow-xl shadow-zinc-200/50">
            <div className="flex flex-col items-center text-center mb-10">
              <div className="w-16 h-16 bg-white text-primary border border-primary/10 rounded-[20px] flex items-center justify-center mb-6 shadow-lg shadow-zinc-200/20 -rotate-3">
                <UserPlus size={32} />
              </div>
              <h1 className="text-3xl font-heading font-black tracking-tight text-zinc-900 leading-tight">Create Account</h1>
              <p className="text-zinc-500 font-medium text-sm mt-2">Join the Sri Lankan maker community for exclusive stock alerts and tracking.</p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">First Name</Label>
                    <Input id="firstName" placeholder="Nimal" required className="h-12 border-zinc-200 rounded-xl" />
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Last Name</Label>
                    <Input id="lastName" placeholder="Silva" required className="h-12 border-zinc-200 rounded-xl" />
                 </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Email Address</Label>
                <Input id="email" type="email" placeholder="nimal@example.lk" required className="h-12 border-zinc-200 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Set Password</Label>
                <Input id="password" type="password" placeholder="••••••••" required className="h-12 border-zinc-200 rounded-xl" />
              </div>
              <div className="pt-2">
                 <p className="text-[10px] text-zinc-400 font-medium leading-relaxed mb-4">
                   By creating an account, you agree to our Digital Ethics policy and standard local commerce terms.
                 </p>
                 <Button size="lg" className="w-full h-12 rounded-xl font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 gap-2">
                    Join NexusSTEM <ArrowRight size={18} />
                 </Button>
              </div>
            </form>

            <div className="relative my-10">
              <div className="w-full h-px bg-zinc-100" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Or sign up with</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Button variant="outline" className="h-12 rounded-xl font-bold border-zinc-100 gap-2 hover:bg-zinc-50 transition-all">
                 <Mail size={18} /> Continue with Google
              </Button>
            </div>

            <p className="text-center mt-10 text-sm text-zinc-500 font-medium">
              Already have an account? <Link href="/auth/login" className="text-primary font-bold hover:underline">Sign In</Link>
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 text-zinc-400">
             <ShieldCheck size={16} />
             <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Secure Local Registration</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
