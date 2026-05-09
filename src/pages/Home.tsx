import { useAccessibility, useCart } from '../App';
import { PRODUCTS, CATEGORIES } from '../constants';
import { Sprout, Apple, Droplets, Croissant, Beef, Container, ShoppingCart, ArrowRight, ChevronRight, Milk } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const iconMap: Record<string, any> = {
  Sprout,
  Apple,
  Milk,
  Croissant,
  Beef,
  Honey: Container,
};

export default function Home() {
  const { profile } = useAccessibility();
  const { addToCart } = useCart();

  const scrollToCategories = () => {
    const element = document.getElementById('categories');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (profile === 'vision') {
    return (
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-12 space-y-20">
        {/* Hero Section */}
        <section className="vision-border p-12 bg-zinc-900">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-6xl md:text-8xl font-black text-white">Свіжість української ниви до вашого столу</h1>
              <p className="text-2xl font-bold text-white max-w-xl">Прозорий місток між локальними виробниками та свідомими споживачами.</p>
              <button 
                onClick={scrollToCategories}
                className="vision-button px-12 py-6 text-4xl font-black focus-visible:outline-none"
              >
                ПЕРЕЙТИ ДО КРАМНИЦІ
              </button>
            </div>
            <div className="hidden md:block">
              <img src={PRODUCTS[0].image} alt="Hero" referrerPolicy="no-referrer" className="vision-border grayscale contrast-150" />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section id="categories" className="space-y-10">
          <h2 className="text-5xl font-black text-secondary-fixed-dim underline decoration-8 underline-offset-8 uppercase">КАТЕГОРІЇ ПРОДУКТІВ</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {CATEGORIES.map(cat => {
              const Icon = iconMap[cat.icon];
              return (
                <button 
                  key={cat.name} 
                  aria-label={`Категорія ${cat.name}`}
                  className="vision-border p-8 flex flex-col items-center gap-4 bg-zinc-900 hover:bg-secondary-fixed-dim hover:text-black group focus-visible:outline-none"
                >
                  <Icon size={64} strokeWidth={3} className="text-white group-hover:text-black" />
                  <span className="text-xl font-black uppercase text-white group-hover:text-black">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Recommended */}
        <section className="space-y-10">
          <div className="flex justify-between items-end">
            <h2 className="text-5xl font-black text-secondary-fixed-dim underline decoration-8 underline-offset-8 uppercase">РЕКОМЕНДОВАНО ДЛЯ ВАС</h2>
            <Link to="/" className="text-2xl font-black text-white uppercase border-b-4 border-white">Переглянути всі</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map(product => (
              <article key={product.id} className="vision-border bg-black overflow-hidden flex flex-col">
                <div className="relative">
                  <img src={product.image} alt={product.name} referrerPolicy="no-referrer" className="w-full aspect-square object-cover brightness-125 contrast-150" />
                  <span className="absolute top-4 left-4 bg-black text-white vision-border px-4 py-2 font-black">
                    {product.organic ? 'Органічне' : 'Місцеве виробництво'}
                  </span>
                </div>
                <div className="p-6 space-y-4 flex-grow flex flex-col">
                  <div className="flex justify-between items-start">
                    <h3 className="text-3xl font-black text-white">{product.name}</h3>
                    <div className="text-right">
                      <span className="block text-3xl font-black text-secondary-fixed-dim">{product.price} ₴</span>
                      <span className="text-lg font-bold text-white">{product.unit}</span>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-white/80 flex-grow">{product.description}</p>
                  <button 
                    onClick={() => addToCart(product)} 
                    aria-label={`Купити ${product.name}. Ціна ${product.price} гривень`}
                    className="vision-button w-full py-6 mt-4 text-2xl font-black focus-visible:outline-none"
                  >
                    КУПИТИ
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (profile === 'mobility') {
    return (
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop space-y-12 pb-20 pt-24">
        {/* Hero */}
        <section className="relative rounded-2xl overflow-hidden min-h-[500px] flex items-center bg-primary-container">
          <div className="absolute inset-0 opacity-40">
            <img src={PRODUCTS[1].image} alt="Hero" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 p-12 max-w-2xl space-y-8">
            <h1 className="text-6xl font-black text-white leading-tight">Свіжість української ниви до вашого столу</h1>
            <p className="text-2xl font-bold text-primary-fixed">Прозорий місток між локальними виробниками та свідомими споживачами.</p>
            <button 
              onClick={scrollToCategories}
              className="bg-secondary-container text-on-secondary-container min-h-[80px] px-12 rounded-xl font-black text-2xl hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-4"
            >
              <span>Перейти до крамниці</span>
              <ArrowRight size={32} strokeWidth={3} />
            </button>
          </div>
        </section>

        {/* Categories */}
        <section id="categories" className="space-y-8">
          <h2 className="text-4xl font-black text-primary uppercase tracking-tight">Категорії продуктів</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {CATEGORIES.map(cat => {
              const Icon = iconMap[cat.icon];
              return (
                <button key={cat.name} className="bg-surface-container-low border-2 border-outline-variant p-8 rounded-2xl hover:bg-white hover:shadow-lg transition-all flex flex-col items-center justify-center gap-6 group">
                  <div className="bg-primary/10 p-6 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon size={48} />
                  </div>
                  <span className="font-black text-xl text-primary">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Recommended */}
        <section className="space-y-8">
          <div className="flex justify-between items-end">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tight">Рекомендовано для вас</h2>
            <Link to="/" className="text-xl font-black text-primary underline min-h-[64px] flex items-center">Переглянути всі</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map(product => (
              <article key={product.id} className="bg-white border-2 border-outline-variant rounded-2xl overflow-hidden hover:shadow-2xl transition-all flex flex-col h-full">
                <div className="relative h-64">
                  <img src={product.image} alt={product.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container px-6 py-2 rounded-full font-black text-sm uppercase tracking-wider">
                    {product.organic ? 'Органічне' : 'Місцеве виробництво'}
                  </span>
                </div>
                <div className="p-8 flex flex-col flex-grow gap-6">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-3xl font-black text-primary leading-tight">{product.name}</h3>
                    <div className="text-right">
                      <span className="font-black text-3xl text-primary">{product.price} ₴</span>
                      <span className="block text-sm font-bold text-outline">/ {product.unit}</span>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-on-surface-variant line-clamp-2">{product.description}</p>
                  <button
                    onClick={() => addToCart(product)}
                    aria-label={`Купити ${product.name} за ${product.price} гривень`}
                    className="mt-auto w-full min-h-[80px] bg-primary text-on-primary rounded-xl font-black text-xl flex items-center justify-center gap-4 hover:bg-primary-container transition-colors active:scale-95 shadow-lg focus-visible:outline-none"
                  >
                    <ShoppingCart size={32} />
                    <span>Купити</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (profile === 'cognitive') {
     return (
       <div className="pt-24 pb-12 max-w-3xl mx-auto px-margin-mobile">
         {/* Breadcrumbs */}
         <nav className="mb-8 flex items-center gap-2 text-on-surface-variant font-bold">
           <Link to="/" className="hover:underline">Головна</Link>
           <ChevronRight size={16} />
           <span className="text-primary font-black text-xl">Крамниця</span>
         </nav>

         {/* Hero */}
         <section className="mb-12 bg-primary-container p-12 rounded-2xl text-center space-y-6">
           <h1 className="text-4xl font-black text-white leading-tight">Свіжість української ниви до вашого столу</h1>
           <p className="text-2xl font-bold text-on-primary-container max-w-lg mx-auto">Прозорий зв'язок між локальними виробниками та свідомими споживачами.</p>
           <button 
             onClick={scrollToCategories}
             className="inline-block bg-secondary-container text-on-secondary-container font-black px-12 py-6 rounded-xl text-2xl hover:bg-secondary-fixed transition-all shadow-md"
           >
             Перейти до крамниці
           </button>
         </section>

         {/* Categories - Simplified Grid */}
         <section id="categories" className="mb-12 space-y-6">
           <h2 className="text-3xl font-black text-on-surface">Категорії продуктів</h2>
           <div className="grid grid-cols-2 gap-4">
             {CATEGORIES.map(cat => {
               const Icon = iconMap[cat.icon];
               return (
                 <button key={cat.name} className="flex flex-col items-center justify-center p-8 border-4 border-outline-variant bg-surface hover:border-primary transition-all gap-4 rounded-xl shadow-sm">
                   <Icon size={48} className="text-primary" />
                   <span className="font-black text-xl">{cat.name}</span>
                 </button>
               );
             })}
           </div>
         </section>

         {/* Recommended - Simplified Vertical List */}
         <section id="products" className="space-y-6">
           <div className="flex justify-between items-end">
             <h2 className="text-3xl font-black text-on-surface">Рекомендовано для вас</h2>
             <Link to="/" className="text-primary font-black underline text-xl">Всі товари</Link>
           </div>
           <div className="space-y-8">
             {PRODUCTS.map(product => (
               <div key={product.id} className="border-4 border-outline-variant bg-white p-8 rounded-2xl flex flex-col md:flex-row gap-8 items-center shadow-md">
                 <div className="w-full md:w-56 h-56 bg-surface-container rounded-xl overflow-hidden flex-shrink-0">
                    <img src={product.image} alt={product.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                 </div>
                 <div className="flex-grow text-center md:text-left space-y-4">
                   <div className="inline-block bg-secondary-container text-on-secondary-container text-sm font-black px-3 py-1 rounded-sm uppercase">{product.organic ? 'Органічне' : 'Місцеве виробництво'}</div>
                   <h3 className="text-4xl font-black text-primary leading-tight">{product.name}</h3>
                   <p className="text-xl font-bold text-on-surface-variant leading-relaxed">{product.description}</p>
                   <div className="text-3xl font-black text-primary">{product.price} ₴ / {product.unit}</div>
                   <button
                    onClick={() => addToCart(product)}
                    className="w-full md:w-auto bg-primary text-on-primary font-black px-12 py-6 text-2xl rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-xl"
                   >
                     Додати у кошик
                   </button>
                 </div>
               </div>
             ))}
           </div>
         </section>
       </div>
     );
  }

  // Standard Profile
  return (
    <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop space-y-16 pb-24 pt-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl min-h-[480px] flex items-center shadow-lg">
        <div className="absolute inset-0 z-0">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKVSiLckFgUKmAnbxOzeTStkEdgf3jgIeNvfidrwKMpGW9O-kKC2k2zmkuJ38VPAojPrF0KDkgfdpf0PYjUV5UVZB3ZXKptWDY-jXok97cVUJax8UHHrSGmPXn4wtqmyieYF5HyFar-dkRMbkn2EYjXfdHiGDptCisXXXxA37hHNtPxZFbnPGXs_LjxUp5z3s8j6FRZW0Jq1hId10MfDQq6wvz7YX9E4P_PhkA-C8VAhKH09Ky8Kte8xmmBRaNlkptFyKUyz9yupw" alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/40 to-transparent"></div>
        </div>
        <div className="relative z-10 w-full lg:w-3/4 p-8 md:p-12 lg:p-20 space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight drop-shadow-xl whitespace-pre-line">
            Свіжість української ниви{"\n"}до вашого столу
          </h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl font-medium text-white/90 drop-shadow-sm max-w-2xl"
          >
            Прозорий місток між локальними виробниками та свідомими споживачами. Тільки перевірена якість та чесна ціна.
          </motion.p>
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            onClick={scrollToCategories}
            className="bg-secondary-container text-on-secondary-container h-[56px] px-10 font-black text-lg rounded-full hover:brightness-105 active:scale-95 transition-all shadow-xl flex items-center gap-3 focus-visible:ring-4 focus-visible:ring-primary focus-visible:outline-none"
          >
            <span>Перейти до крамниці</span>
            <ArrowRight size={24} />
          </motion.button>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="space-y-10">
        <h2 className="text-3xl md:text-4xl font-black text-on-surface flex items-center gap-4">
          <span className="w-2 h-8 bg-primary rounded-full"></span>
          Категорії продуктів
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {CATEGORIES.map((cat, idx) => {
             const Icon = iconMap[cat.icon];
             return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-surface-container-low p-8 rounded-3xl border border-outline-variant hover:border-primary hover:shadow-xl transition-all cursor-pointer group flex flex-col items-center gap-6 focus-visible:ring-4 focus-visible:ring-primary focus-visible:outline-none"
                tabIndex={0}
                role="button"
                aria-label={`Категорія ${cat.name}`}
              >
                <div className="w-16 h-16 flex items-center justify-center text-primary group-hover:scale-110 transition-transform bg-white rounded-2xl shadow-sm border border-outline-variant/30">
                  <Icon size={32} />
                </div>
                <span className="font-black text-lg text-on-surface-variant group-hover:text-primary transition-colors text-center">{cat.name}</span>
              </motion.div>
             );
          })}
        </div>
      </section>

      {/* Recommended */}
      <section className="space-y-10">
        <div className="flex justify-between items-end">
          <h2 className="text-3xl md:text-4xl font-black text-on-surface flex items-center gap-4">
            <span className="w-2 h-8 bg-secondary rounded-full"></span>
            Рекомендовано для вас
          </h2>
          <Link to="/" className="text-primary font-black text-lg hover:underline transition-all flex items-center gap-1 group">
            Переглянути всі
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product, idx) => {
            const category = CATEGORIES.find(c => c.name === product.category);
            const CategoryIcon = category ? (iconMap[category.icon] || Apple) : Apple;
            
            return (
              <motion.article 
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant hover:shadow-2xl transition-all group flex flex-col h-full"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={product.image} alt={product.name} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                    {product.organic ? 'Органічне' : 'Місцеве виробництво'}
                  </span>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full text-primary shadow-sm hover:scale-110 transition-transform">
                    <CategoryIcon size={20} />
                  </div>
                </div>
                <div className="p-6 space-y-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-4">
                      <Link to={`/product/${product.id}`} className="text-2xl font-black text-on-surface hover:text-primary transition-colors leading-tight line-clamp-1">{product.name}</Link>
                      <div className="text-right flex-shrink-0">
                        <span className="text-2xl font-black text-primary">{product.price} ₴</span>
                        <span className="block text-[10px] uppercase font-black text-outline">/ {product.unit}</span>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-on-surface-variant/80 mt-4 line-clamp-2">{product.description}</p>
                  </div>
                  <button 
                    onClick={() => addToCart(product)}
                    aria-label={`Додати ${product.name} у кошик. Ціна ${product.price} гривень`}
                    className="w-full bg-primary text-on-primary h-[52px] rounded-2xl font-black text-base hover:bg-primary/90 transition-all active:scale-[0.98] shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group/btn"
                  >
                    <ShoppingCart size={20} className="group-hover/btn:rotate-12 transition-transform" />
                    <span>У кошик</span>
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
