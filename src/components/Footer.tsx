import { useAccessibility } from '../App';
import { Link } from 'react-router-dom';
import { Share2, HelpCircle } from 'lucide-react';

export default function Footer() {
  const { profile } = useAccessibility();

  if (profile === 'vision') {
    return (
      <footer className="bg-black border-t-[6px] border-secondary-fixed-dim mt-20">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-12 max-w-7xl mx-auto gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="text-3xl font-bold text-secondary-fixed-dim">PAFM</span>
            <p className="text-xl font-bold text-white">© 2026 PAFM. Усі права захищено.</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-10">
            <Link className="text-xl text-white font-black underline decoration-4 hover:text-secondary-fixed-dim uppercase" to="#">Про проєкт</Link>
            <Link className="text-xl text-white font-black underline decoration-4 hover:text-secondary-fixed-dim uppercase" to="#">Допомога</Link>
            <Link className="text-xl text-white font-black underline decoration-4 hover:text-secondary-fixed-dim uppercase" to="#">Контакти</Link>
            <Link className="text-xl text-white font-black underline decoration-4 hover:text-secondary-fixed-dim uppercase" to="#">Правова інформація</Link>
          </nav>
          <div className="flex gap-6">
            <button className="text-white border-4 border-white p-3"><Share2 size={40} strokeWidth={4} /></button>
            <button className="text-white border-4 border-white p-3"><HelpCircle size={40} strokeWidth={4} /></button>
          </div>
        </div>
      </footer>
    );
  }

  if (profile === 'mobility') {
    return (
      <footer className="bg-surface-container-low border-t border-outline-variant mt-20">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-8 max-w-7xl mx-auto gap-8">
          <div className="text-3xl font-black text-primary">PAFM</div>
          <nav className="flex flex-wrap justify-center gap-8">
            <Link className="text-on-surface-variant hover:text-primary min-h-[64px] flex items-center font-bold text-xl px-4" to="#">Про проєкт</Link>
            <Link className="text-on-surface-variant hover:text-primary min-h-[64px] flex items-center font-bold text-xl px-4" to="#">Допомога</Link>
            <Link className="text-on-surface-variant hover:text-primary min-h-[64px] flex items-center font-bold text-xl px-4" to="#">Контакти</Link>
            <Link className="text-on-surface-variant hover:text-primary min-h-[64px] flex items-center font-bold text-xl px-4" to="#">Правова інформація</Link>
          </nav>
          <div className="text-on-surface-variant font-bold text-center md:text-right">
            © 2026 PAFM. Усі права захищено.
          </div>
        </div>
      </footer>
    );
  }

  // Standard / Cognitive (similar footer)
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-gutter max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-6 md:mb-0">
          <span className="text-xl font-bold text-primary">PAFM</span>
          <nav className="flex gap-6 font-medium text-on-surface-variant">
            <Link className="hover:text-primary underline transition-colors" to="#">Про проєкт</Link>
            <Link className="hover:text-primary underline transition-colors" to="#">Допомога</Link>
            <Link className="hover:text-primary underline transition-colors" to="#">Контакти</Link>
            <Link className="hover:text-primary underline transition-colors" to="#">Правова інформація</Link>
          </nav>
        </div>
        <p className="text-on-surface-variant opacity-75">
          © 2026 PAFM. Усі права захищено.
        </p>
      </div>
    </footer>
  );
}
