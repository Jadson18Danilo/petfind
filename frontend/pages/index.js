import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Header from '../src/components/Header';
import { Home as HomeIcon, MessageCircle, User, ArrowRight } from 'lucide-react';

export default function Home() {
  const heroRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    function onMove(e) {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const x = (e.clientX - cx) / (rect.width / 2);
      const y = (e.clientY - cy) / (rect.height / 2);
      setMouse({ x, y });
    }

    function onScroll() {
      setScrollY(window.scrollY || window.pageYOffset || 0);
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="page">
      <Header />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-20">
        <section
          ref={heroRef}
          className="relative flex flex-col items-center text-center space-y-8"
          style={{ perspective: 1000 }}
        >
          {/* decorative circles */}
          <div
            className="absolute top-10 left-10 w-20 h-20 rounded-full bg-gradient-to-br from-brand-warm-500 to-brand-warm-600 opacity-20 blur-2xl"
            style={{ transform: `translate(${mouse.x * 30}px, ${mouse.y * 30}px) translateY(${scrollY * 0.5}px)`, transition: 'transform 0.35s ease-out' }}
          />
          <div
            className="absolute top-32 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-brand-warm-600 to-brand-warm-500 opacity-15 blur-3xl"
            style={{ transform: `translate(${mouse.x * -40}px, ${mouse.y * -40}px) translateY(${scrollY * 0.3}px)`, transition: 'transform 0.35s ease-out' }}
          />

          {/* hero card */}
          <div
            className="card p-8 relative z-10 max-w-3xl"
            style={{ transform: `translate(${mouse.x * 12}px, ${mouse.y * 12}px) translateY(${scrollY * 0.15}px) rotateX(${mouse.y * 3}deg) rotateY(${mouse.x * 3}deg)`, transition: 'transform 0.3s ease-out' }}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium">Novo • Experimente</div>
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Encontre o par ideal para seu pet</h1>
            <p className="mt-3 text-slate-600 max-w-2xl mx-auto">Cadastre seu pet, encontre matches inteligentes e converse diretamente com responsáveis em uma experiência rápida e bonita.</p>

            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Link href="/register" className="btn inline-flex items-center gap-2">
                Começar <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/pets" className="btn-secondary inline-flex items-center gap-2">Ver pets</Link>
            </div>
          </div>
        </section>

        {/* features */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="card card-hover p-6">
            <div className="mb-3 inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-warm-100 text-brand-warm-600">
              <HomeIcon className="w-5 h-5" />
            </div>
            <h3 className="font-semibold">Cadastro rápido</h3>
            <p className="text-sm text-slate-600 mt-2">Crie sua conta e adicione pets em minutos.</p>
          </div>

          <div className="card card-hover p-6">
            <div className="mb-3 inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-warm-100 text-brand-warm-600">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="font-semibold">Matches inteligentes</h3>
            <p className="text-sm text-slate-600 mt-2">Curta pets e gere matches automaticamente com regras simples.</p>
          </div>

          <div className="card card-hover p-6">
            <div className="mb-3 inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-warm-100 text-brand-warm-600">
              <User className="w-5 h-5" />
            </div>
            <h3 className="font-semibold">Chat integrado</h3>
            <p className="text-sm text-slate-600 mt-2">Converse com responsáveis sem sair da plataforma.</p>
          </div>
        </section>
      </main>
    </div>
  );
}