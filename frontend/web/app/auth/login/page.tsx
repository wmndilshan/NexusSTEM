'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Cpu, Github, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-zinc-50/50 flex flex-col justify-center items-center py-20 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-[32px] border border-zinc-100 p-8 md:p-12 shadow-xl shadow-zinc-200/50">
            <div className="flex flex-col items-center text-center mb-10">
              <div className="w-16 h-16 bg-primary text-white rounded-[20px] flex items-center justify-center mb-6 shadow-lg shadow-primary/20 rotate-3">
                <Cpu size={32} />
              </div>
              <h1 className="text-3xl font-heading font-black tracking-tight text-zinc-900 leading-tight">Welcome Back</h1>
              <p className="text-zinc-500 font-medium text-sm mt-2">Sign in to your Nexus account to manage orders and technical requests.</p>
            </div>

            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Email Address</Label>
                <Input id="email" type="email" placeholder="eg: engineering@student.lk" required className="h-12 border-zinc-200 rounded-xl" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                   <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Password</Label>
                   <Link href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:underline transition-all">Forgot?</Link>
                </div>
                <Input id="password" type="password" placeholder="••••••••" required className="h-12 border-zinc-200 rounded-xl" />
              </div>
              <Button size="lg" className="w-full h-12 rounded-xl font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 gap-2">
                Sign In to Nexus <ArrowRight size={18} />
              </Button>
            </form>

            <div className="relative my-10">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Or continue with</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Button variant="outline" className="h-12 rounded-xl font-bold border-zinc-100 gap-2 hover:bg-zinc-50 transition-all">
                 <Mail size={18} /> Google Login
              </Button>
            </div>

            <p className="text-center mt-10 text-sm text-zinc-500 font-medium">
              New to the platform? <Link href="/auth/register" className="text-primary font-bold hover:underline">Create Account</Link>
            </p>
          </div>

          <div className="mt-8 bg-primary p-6 rounded-3xl flex items-center justify-between gap-6 text-white group cursor-pointer hover:scale-[1.02] transition-all">
            <div className="space-y-1">
              <h4 className="font-heading font-bold text-sm">Wholesale Inquiries?</h4>
              <p className="text-xs text-primary-foreground opacity-80 font-medium">Register for a B2B Business Account</p>
            </div>
            <Link href="/b2b/apply">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-white/30 transition-colors">
                <ArrowRight size={18} />
              </div>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Separator() {
  return <div className="w-full h-px bg-zinc-100" />;
}
