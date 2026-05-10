import { useState } from 'react';
import { useAccessibility, useCart, useAuth } from '../App';
import { AppWindow, Eye, Hand, Brain, ShoppingCart, User, LogIn, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AccessibilityProfile } from '../types';
import { logout } from '../lib/firebase';

export default function TopAppBar() {
  const { profile, setProfile } = useAccessibility();
  const { cart } = useCart();
  const { user, loading, isAuthModalOpen, setIsAuthModalOpen } = useAuth();

  const profiles: { id: AccessibilityProfile; icon: any; title: string }[] = [
    { id: 'standard', icon: AppWindow, title: 'Стандартний' },
    { id: 'vision', icon: Eye, title: 'Зір' },
    { id: 'mobility', icon: Hand, title: 'Моторика' },
    { id: 'cognitive', icon: Brain, title: 'Когнітивний' },
  ];

  const totalItems = cart.reduce((acc, item) => item.quantity + acc, 0);

  const AuthButton = ({ className = "" }: { className?: string }) => {
    if (loading) return null;
    if (user) {
      return (
        <button onClick={logout} className={`${className} flex items-center gap-2`} title="Вийти">
          <LogOut size={profile === 'vision' ? 36 : 24} />
          {user.photoURL && <img src={user.photoURL} alt="Avatar" className="w-8 h-8 rounded-full border" />}
        </button>
      );
    }
    return (
      <button onClick={() => setIsAuthModalOpen(true)} className={`${className} flex items-center gap-2`} title="Увійти">
        <LogIn size={profile === 'vision' ? 36 : 24} />
      </button>
    );
  };

  if (profile === 'vision') {
    return (
      <header className="bg-black border-b-[6px] border-secondary-fixed-dim sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-10">
            <Link to="/" className="font-black text-secondary-fixed-dim text-6xl md:text-8xl">PAFM</Link>
            <nav className="hidden md:flex gap-12 items-center text-3xl font-black">
              <Link className="text-secondary-fixed-dim border-b-4 border-secondary-fixed-dim pb-1" to="/">КРАМНИЦЯ</Link>
              <Link className="text-white hover:text-secondary-fixed-dim" to="/">ТОВАРИ</Link>
              <Link className="text-white hover:text-secondary-fixed-dim" to="/">ФЕРМЕРИ</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-zinc-900 border-2 border-secondary-fixed-dim p-1 gap-1">
              {profiles.map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    setProfile(p.id);
                  }}
                  className={`p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${profile === p.id ? 'bg-secondary-fixed-dim text-black' : 'text-white hover:bg-white hover:text-black'}`}
                  aria-label={`Активувати ${p.title} профіль`}
                  aria-pressed={profile === p.id}
                  title={p.title}
                >
                  <p.icon size={36} strokeWidth={3} />
                </button>
              ))}
            </div>
            <div className="flex gap-4 ml-4">
              <Link to="/cart" className="text-white relative">
                <ShoppingCart size={36} strokeWidth={3} />
                {totalItems > 0 && (
                   <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs w-6 h-6 flex items-center justify-center rounded-full font-black border-2 border-black">
                     {totalItems}
                   </span>
                )}
              </Link>
              <AuthButton className="text-white" />
            </div>
          </div>
        </div>
      </header>
    );
  }

  if (profile === 'mobility') {
    return (
      <header className="bg-surface border-b border-outline-variant fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-7xl mx-auto h-[120px]">
          <Link to="/" className="text-6xl font-black text-primary">PAFM</Link>
          <nav className="hidden md:flex items-center gap-10">
            <Link className="text-primary border-b-4 border-primary font-black text-2xl min-h-[80px] flex items-center px-4" to="/">Крамниця</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-all font-black text-2xl min-h-[80px] flex items-center px-4" to="/">Товари</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-all font-black text-2xl min-h-[80px] flex items-center px-4" to="/">Фермери</Link>
          </nav>
          <div className="flex items-center gap-4">
            <div className="bg-surface-container-high rounded-full p-1 flex items-center">
              {profiles.map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    setProfile(p.id);
                  }}
                  className={`w-12 h-12 flex items-center justify-center rounded-full transition-all focus:outline-none focus:ring-4 focus:ring-primary ${profile === p.id ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-dim'}`}
                  aria-label={`Активувати ${p.title} профіль`}
                  aria-pressed={profile === p.id}
                  title={p.title}
                >
                  <p.icon size={24} />
                </button>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-2 border-l border-outline-variant pl-4">
              <Link to="/cart" className="w-[64px] h-[64px] flex items-center justify-center text-on-surface-variant relative">
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                   <span className="absolute top-2 right-2 bg-primary text-on-primary text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                     {totalItems}
                   </span>
                )}
              </Link>
              <AuthButton className="w-[64px] h-[64px] justify-center text-on-surface-variant" />
            </div>
          </div>
        </div>
      </header>
    );
  }

  if (profile === 'cognitive') {
    return (
      <header className="bg-surface border-b border-outline-variant sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-5 max-w-7xl mx-auto">
          <Link to="/" className="text-3xl font-black text-primary">PAFM</Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-surface-container rounded px-2 py-1 gap-1 border border-outline-variant">
               {profiles.map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    setProfile(p.id);
                  }}
                  className={`p-2 flex items-center justify-center transition-colors rounded focus:outline-none focus:ring-2 focus:ring-primary ${profile === p.id ? 'bg-primary text-white' : 'hover:bg-surface-dim text-on-surface-variant'}`}
                  aria-label={`Активувати ${p.title} профіль`}
                  aria-pressed={profile === p.id}
                  title={p.title}
                >
                  <p.icon size={24} fill={profile === p.id ? 'currentColor' : 'none'} />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 ml-4">
               <Link to="/cart" className="p-2 text-on-surface-variant hover:text-primary relative" title="Кошик">
                <ShoppingCart size={24} />
                 {totalItems > 0 && (
                   <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full"></span>
                 )}
              </Link>
              <AuthButton className="p-2 text-on-surface-variant hover:text-primary" />
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Standard Profile
  return (
    <header className="bg-surface border-b border-outline-variant sticky top-0 z-50">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-20">
          <Link to="/" className="text-5xl font-black text-primary tracking-tighter">PAFM</Link>
          <nav className="hidden lg:flex items-center gap-12 font-black text-xl">
            <Link className="text-primary border-b-2 border-primary transition-all duration-150 py-1" to="/">Крамниця</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-all py-1" to="/">Товари</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-all py-1" to="/">Фермери</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-all py-1" to="/">Про нас</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-surface-container rounded-full p-1 gap-1">
             {profiles.map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    setProfile(p.id);
                  }}
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary ${profile === p.id ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
                  aria-label={`Активувати ${p.title} профіль доступності`}
                  aria-pressed={profile === p.id}
                  title={p.title}
                >
                  <p.icon size={20} fill={profile === p.id ? 'currentColor' : 'none'} />
                </button>
              ))}
          </div>
          <div className="h-6 w-px bg-outline-variant mx-2"></div>
          <div className="flex items-center gap-2">
            <Link to="/cart" className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            <AuthButton className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all" />
          </div>
        </div>
      </div>
    </header>
  );
}
