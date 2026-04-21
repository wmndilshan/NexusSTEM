import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { CATEGORIES, PRODUCTS } from '@/lib/data';
import { 
  ArrowRight, 
  Cpu, 
  Truck, 
  ShieldCheck, 
  Clock, 
  Zap, 
  Building2 
} from 'lucide-react';

export default function Home() {
  const featuredProducts = PRODUCTS.filter(p => p.isFeatured).slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Geometric Hero Section */}
        <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 bg-white border-b border-border overflow-hidden">
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-end">
              <div className="flex flex-col gap-8">
                <div className="space-y-4">
                  <span className="text-xs font-black text-primary uppercase tracking-[0.3em]">Sri Lanka&apos;s Premier STEM Hub</span>
                  <h1 className="text-5xl lg:text-7xl font-bold font-heading text-slate-900 leading-[1] tracking-tight">
                    Advanced Electronics for <span className="text-accent italic">Modern Architects.</span>
                  </h1>
                </div>
                <p className="text-lg text-slate-500 max-w-lg leading-relaxed font-medium">
                  We supply the foundational components for the next generation of engineers. From high-precision sensors to industrial IoT solutions.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link href="/products">
                    <Button size="lg" className="rounded-xl px-10 h-14 text-sm font-black uppercase tracking-widest bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                      Browse Components
                    </Button>
                  </Link>
                  <div className="flex items-center gap-4 px-6 border-l border-border ml-2 py-2">
                    <div className="text-right">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Currency Control</p>
                       <p className="text-xl font-heading font-black text-slate-900">LKR (රුපියල්)</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative group">
                <div className="aspect-[4/3] relative rounded-[40px] bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent z-10" />
                  <Image 
                    src="https://picsum.photos/seed/tech/1200/900"
                    alt="NexusSTEM Tech"
                    fill
                    className="object-cover opacity-60 mix-blend-luminosity hover:opacity-80 transition-opacity duration-700"
                    priority
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-8 left-8 z-20 text-white">
                    <div className="flex gap-2 mb-4">
                      <span className="bg-emerald-500 text-[10px] font-black px-2 py-1 rounded">SYSTEMS ONLINE</span>
                      <span className="bg-white/20 backdrop-blur-md text-[10px] font-black px-2 py-1 rounded">24/7 SUPPORT</span>
                    </div>
                    <h2 className="text-3xl font-heading font-black tracking-tighter">IoT Core v4.0</h2>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[140px] font-black text-white/5 select-none pointer-events-none">NXS</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
            style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, #1e1b4b 1.5px, transparent 0)', backgroundSize: '60px 60px' }} 
          />
        </section>

        {/* Categories Section - Geometric Grid */}
        <section className="py-24 bg-slate-50 border-b border-border">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="space-y-2">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Precision Stock</h4>
                <h2 className="text-4xl font-heading font-black text-slate-900 tracking-tight">Industrial Categories.</h2>
              </div>
              <Link href="/products" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors flex items-center gap-2">
                Explore Repository <ArrowRight size={14} />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {CATEGORIES.slice(0, 6).map((category) => (
                <Link 
                  key={category.id} 
                  href={`/products?category=${category.slug}`}
                  className="group relative h-40 rounded-3xl bg-white border border-border p-6 flex flex-col justify-end hover:shadow-xl hover:shadow-slate-200/50 hover:border-primary/20 transition-all duration-300"
                >
                   <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-50 text-slate-300 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-45">
                      <ArrowRight size={18} />
                   </div>
                   <div className="space-y-1">
                     <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400">Inventory #0{category.id}</span>
                     <span className="block text-sm font-black text-slate-900">{category.name}</span>
                   </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products - High Contrast */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="space-y-2">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Latest Extractions</h4>
                <h2 className="text-4xl font-heading font-black text-slate-900 tracking-tight">Verified Components.</h2>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* B2B Exclusive Section - Slate Dark Theme */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-4 md:px-8">
            <div className="bg-slate-950 rounded-[48px] p-12 lg:p-24 relative overflow-hidden flex flex-col lg:flex-row items-center gap-16 shadow-2xl">
              <div className="flex-1 relative z-10 text-white space-y-8">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-400/20 text-cyan-400 rounded-lg text-[10px] font-black uppercase tracking-widest leading-none">
                   B2B Exclusive Channel
                 </div>
                 <h2 className="text-5xl lg:text-7xl font-heading font-black tracking-tight leading-[1] max-w-2xl">
                    Commercial <span className="text-cyan-400 italic">Volume</span> Sourcing.
                 </h2>
                 <p className="text-lg text-slate-400 max-w-lg leading-relaxed font-medium">
                    Apply for a corporate lab account to unlock enterprise-grade logistics, tax invoicing, and direct importer pricing.
                 </p>
                 <Link href="/b2b/apply" className="block w-fit">
                    <Button size="lg" className="rounded-xl px-12 h-16 bg-white text-slate-950 hover:bg-cyan-400 font-black uppercase tracking-widest text-sm transition-all shadow-xl shadow-cyan-400/20">
                      Apply Now
                    </Button>
                 </Link>
              </div>
              
              <div className="hidden lg:flex flex-1 justify-center relative">
                 <div className="w-80 h-80 rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl flex items-center justify-center p-8 group overflow-hidden">
                    <div className="w-full h-full border border-cyan-400/30 rounded-2xl flex items-center justify-center relative">
                       <Cpu size={120} className="text-cyan-400 opacity-20 group-hover:scale-110 transition-transform duration-700" />
                       <div className="absolute top-0 right-0 p-4">
                          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                       </div>
                    </div>
                 </div>
                 {/* Decorative background blur */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/40 blur-[120px] rounded-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Global standards Local delivery */}
        <section className="py-24 bg-slate-50 border-y border-border">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid md:grid-cols-3 gap-16">
              <FeatureItem 
                icon={<Truck size={24} />} 
                title="Rapid Logistics"
                desc="Islandwide dispatch within 24 hours of confirmation. Guaranteed delivery tracking and safety protocols."
              />
              <FeatureItem 
                icon={<ShieldCheck size={24} />} 
                title="Verified Quality"
                desc="Every component undergoes a 3-point digital verification check before listing in our repository."
              />
              <FeatureItem 
                icon={<Clock size={24} />} 
                title="24/7 Monitoring"
                desc="Real-time lab status monitoring and order processing for mission-critical STEM development."
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FeatureItem({ icon, title, desc }: any) {
  return (
    <div className="space-y-6">
      <div className="w-14 h-14 rounded-2xl bg-white border border-border flex items-center justify-center text-primary shadow-sm">
        {icon}
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-heading font-black text-slate-900 tracking-tight">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
}
