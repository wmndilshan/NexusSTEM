import Link from "next/link";
import { Cpu, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-white border-t border-border mt-20">
      <div className="container mx-auto px-4 md:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary text-white rounded flex items-center justify-center">
                 <div className="w-4 h-4 border-2 border-accent rotate-45" />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-slate-900 leading-none">
                Nexus<span className="text-accent italic">STEM</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 max-w-xs leading-relaxed font-bold">
              Sri Lanka&apos;s most trusted electronics hub. Empowering the next generation of architects and engineers.
            </p>
            <div className="flex gap-4">
              <Facebook size={18} className="text-slate-400 hover:text-primary cursor-pointer" />
              <Instagram size={18} className="text-slate-400 hover:text-primary cursor-pointer" />
              <Twitter size={18} className="text-slate-400 hover:text-primary cursor-pointer" />
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Storefront</h4>
            <ul className="space-y-3">
              <li><Link href="/products" className="text-xs font-bold text-slate-600 hover:text-primary transition-colors">All Products</Link></li>
              <li><Link href="#" className="text-xs font-bold text-slate-600 hover:text-primary transition-colors">Best Sellers</Link></li>
              <li><Link href="#" className="text-xs font-bold text-slate-600 hover:text-primary transition-colors">Components</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Support</h4>
            <ul className="space-y-3">
              <li><Link href="/orders/track" className="text-xs font-bold text-slate-600 hover:text-primary transition-colors">Track Order</Link></li>
              <li><Link href="/b2b/apply" className="text-xs font-bold text-slate-600 hover:text-primary transition-colors">B2B Portal</Link></li>
              <li><Link href="#" className="text-xs font-bold text-slate-600 hover:text-primary transition-colors">Technical Help</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={16} className="text-accent shrink-0" />
                <span className="text-xs font-bold text-slate-600">123 STEM Plaza, Colombo.</span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="text-accent shrink-0" />
                <span className="text-xs font-bold text-slate-600">+94 11 234 5678</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p>© 2024 NexusSTEM Sri Lanka. All Rights Reserved.</p>
            <div className="flex gap-6">
              <span>PayHere</span>
              <span>Koko</span>
              <span>Bank Transfer</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Systems Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
