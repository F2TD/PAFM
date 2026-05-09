import { useParams, Link } from 'react-router-dom';
import { useAccessibility, useCart } from '../App';
import { PRODUCTS } from '../constants';
import { ChevronRight, Star, ShoppingBasket, Heart, Share2, CheckCircle, Verified, Leaf, Truck, Package, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

export default function ProductDetail() {
  const { id } = useParams();
  const { profile } = useAccessibility();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

  if (profile === 'vision') {
    return (
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-12 space-y-12">
        <nav className="mb-12 flex items-center gap-4 text-secondary-fixed font-black text-2xl">
          <Link to="/" className="underline decoration-4">Головна</Link>
          <ChevronRight size={24} strokeWidth={4} />
          <span className="text-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="vision-border p-2 bg-white">
              <img src={product.image} alt={product.name} className="w-full h-auto grayscale contrast-150" />
            </div>
          </div>

          <div className="flex flex-col space-y-10">
            <h1 className="text-7xl font-black text-secondary-fixed uppercase">{product.name}</h1>
            <div className="flex items-center gap-4">
              <span className="bg-secondary-fixed text-black px-6 py-3 font-black text-5xl">{product.price} ₴</span>
              <span className="text-white font-bold text-4xl">/ {product.unit}</span>
            </div>

            <div className="border-l-8 border-secondary-fixed pl-8 py-4">
              <h2 className="text-secondary-fixed font-black text-3xl mb-4 uppercase">Опис продукту</h2>
              <p className="text-white font-bold text-2xl leading-relaxed">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="vision-border p-6 bg-zinc-900">
                <span className="text-secondary-fixed block font-black text-xl mb-2 uppercase">ФЕРМЕР</span>
                <span className="text-white font-black text-2xl uppercase">{product.farmer}</span>
              </div>
              <div className="vision-border p-6 bg-zinc-900">
                <span className="text-secondary-fixed block font-black text-xl mb-2 uppercase">ПОХОДЖЕННЯ</span>
                <span className="text-white font-black text-2xl uppercase">{product.location}</span>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <label className="text-secondary-fixed font-black text-4xl uppercase">Кількість ({product.unit})</label>
              <div className="flex items-center">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-24 h-24 vision-border text-white font-black text-4xl">-</button>
                <div className="w-32 h-24 flex items-center justify-center bg-black text-white font-black text-4xl border-y-4 border-secondary-fixed">{qty}</div>
                <button onClick={() => setQty(q => q + 1)} className="w-24 h-24 vision-border text-white font-black text-4xl">+</button>
              </div>
            </div>

            <button onClick={() => addToCart(product)} className="vision-button w-full py-10 text-4xl font-black">КУПИТИ</button>
          </div>
        </div>
      </div>
    );
  }

  if (profile === 'mobility') {
    return (
       <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-12 pt-24">
         <nav className="mb-12">
            <ul className="flex items-center gap-6 text-on-surface-variant font-black text-xl">
              <li><Link to="/" className="hover:text-primary underline">Головна</Link></li>
              <li><ChevronRight size={24} /></li>
              <li className="text-primary">{product.name}</li>
            </ul>
         </nav>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="aspect-square bg-surface-container rounded-3xl overflow-hidden border-4 border-outline-variant shadow-lg">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="flex flex-col bg-surface-container-lowest p-10 rounded-3xl border-2 border-outline-variant shadow-xl">
               <h1 className="text-6xl font-black text-primary mb-4">{product.name}</h1>
               <p className="text-2xl font-bold text-on-surface-variant mb-10">{product.farmer} • {product.location}</p>

               <div className="flex items-center gap-6 mb-12">
                 <span className="bg-secondary-container text-on-secondary-container font-black text-4xl px-8 py-6 rounded-2xl shadow-sm">{product.price}.00 ₴</span>
                 <span className="text-on-surface-variant font-bold text-2xl">за 1 {product.unit}</span>
               </div>

               <div className="bg-surface-container-low rounded-2xl p-8 border-2 border-outline-variant mb-12">
                  <h3 className="text-xl font-black text-primary uppercase tracking-widest mb-6">Опис продукту</h3>
                  <p className="text-2xl font-bold leading-relaxed text-on-surface">{product.description}</p>
               </div>

               <div className="mt-auto space-y-12">
                  <div className="flex flex-col gap-6">
                    <label className="font-black text-3xl text-primary">Кількість ({product.unit})</label>
                    <div className="flex items-center gap-8">
                      <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-[100px] h-[100px] flex items-center justify-center bg-surface-container-high border-4 border-outline rounded-2xl hover:bg-surface-dim active:scale-90 transition-all">
                        <Minus size={48} strokeWidth={3} />
                      </button>
                      <span className="w-[120px] text-center font-black text-5xl">{qty}</span>
                      <button onClick={() => setQty(q => q + 1)} className="w-[100px] h-[100px] flex items-center justify-center bg-surface-container-high border-4 border-outline rounded-2xl hover:bg-surface-dim active:scale-90 transition-all">
                        <Plus size={48} strokeWidth={3} />
                      </button>
                    </div>
                  </div>

                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full min-h-[100px] bg-primary text-on-primary font-black text-3xl rounded-2xl flex items-center justify-center gap-6 shadow-2xl hover:opacity-90 active:scale-95 transition-all"
                  >
                    <ShoppingBasket size={48} />
                    <span>Додати в кошик</span>
                  </button>
               </div>
            </div>
         </div>
       </div>
    );
  }

  if (profile === 'cognitive') {
    return (
      <div className="max-w-3xl mx-auto px-margin-mobile py-12 pt-24">
        <nav className="mb-8 flex items-center text-on-surface-variant font-bold text-lg">
          <Link to="/" className="hover:underline">Головна</Link>
          <span className="mx-3">/</span>
          <span className="text-on-surface font-black">Продукти</span>
          <span className="mx-3">/</span>
          <span className="text-primary font-black">{product.name}</span>
        </nav>

        <div className="bg-white border-4 border-outline-variant rounded-2xl overflow-hidden p-8 shadow-xl space-y-10">
          <div className="aspect-square w-full rounded-2xl overflow-hidden bg-surface-container border-2 border-outline-variant">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-8">
             <div className="space-y-4 text-center md:text-left">
               <h1 className="text-5xl font-black text-primary leading-tight">{product.name}</h1>
               <p className="text-2xl font-bold text-on-surface-variant">{product.description}</p>
             </div>

             <div className="flex items-center justify-between py-6 border-y-4 border-outline-variant">
               <div className="flex flex-col">
                 <span className="text-on-surface-variant font-black text-lg uppercase tracking-wider">Ціна за 1 {product.unit}</span>
                 <span className="text-5xl font-black text-primary">{product.price}.00 ₴</span>
               </div>
               <div className="text-right">
                 <span className="text-on-surface-variant font-black text-lg">В наявності</span>
                 <div className="flex items-center text-secondary font-black text-2xl gap-2">
                   <CheckCircle size={32} />
                   <span>Є на складі</span>
                 </div>
               </div>
             </div>

             <div className="pt-4 space-y-6">
               <button 
                onClick={() => addToCart(product)}
                className="w-full bg-primary text-on-primary font-black text-3xl py-8 rounded-2xl hover:opacity-95 active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-6"
               >
                 <ShoppingBasket size={48} />
                 <span>Додати у кошик</span>
               </button>
               <p className="text-center text-xl font-bold text-on-surface-variant">Натисніть велику синю кнопку, щоб купити цей товар.</p>
             </div>
          </div>
        </div>

        <div className="mt-12 space-y-8">
           <h2 className="text-3xl font-black text-primary">Про цей товар</h2>
           <div className="prose prose-xl max-w-none text-on-surface font-bold space-y-6">
             <p>{product.description}</p>
             <ul className="list-disc pl-8 space-y-4">
               <li>Вирощено на фермі {product.farmer}</li>
               <li>Натуральний та корисний продукт</li>
               <li>Свіжий збір</li>
               <li>Ми перевірили його для вас</li>
             </ul>
           </div>
        </div>
      </div>
    );
  }

  // Standard Profile
  return (
    <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-12 pt-8">
      <nav className="flex items-center gap-2 mb-12 font-bold text-sm text-outline capitalize">
        <Link to="/" className="hover:text-primary transition-colors">Головна</Link>
        <ChevronRight size={16} />
        <Link to="/" className="hover:text-primary transition-colors">{product.category}</Link>
        <ChevronRight size={16} />
        <span className="text-on-surface">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24">
        {/* Gallery */}
        <div className="lg:col-span-7 grid grid-cols-4 gap-6">
          <div className="col-span-4 aspect-[4/3] rounded-3xl overflow-hidden bg-surface-container border border-outline-variant shadow-inner">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" />
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-surface-container border border-outline-variant cursor-pointer hover:border-primary transition-all">
             <img src={product.image} alt="Thumb" className="w-full h-full object-cover opacity-60" />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-5 flex flex-col gap-10 sticky top-32">
          <div className="space-y-6">
            <span className="inline-block px-4 py-1.5 bg-secondary-container text-on-secondary-container text-xs font-black rounded-full uppercase tracking-[0.2em] shadow-sm">Локальний продукт</span>
            <h1 className="text-4xl md:text-6xl font-black text-primary leading-tight">{product.name}</h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-outline-variant shadow-sm">
                <Star size={16} className="fill-secondary-fixed-dim text-secondary-fixed-dim" />
                <span className="text-sm font-black text-on-surface">4.9</span>
                <span className="text-xs text-outline font-bold">(124 відгуки)</span>
              </div>
              <span className="text-xs font-black text-outline uppercase tracking-widest">{id}</span>
            </div>
          </div>

          <div className="p-10 bg-white border border-outline-variant rounded-[40px] shadow-xl shadow-primary/5">
            <div className="flex items-end gap-3 mb-10 border-b border-outline-variant/30 pb-10">
              <span className="text-6xl font-black text-primary leading-none">{product.price} ₴</span>
              <span className="text-xl text-outline font-bold pb-2">/ {product.unit}</span>
            </div>

            <div className="flex flex-col gap-4 mb-10">
              <label className="text-xs font-black text-on-surface uppercase tracking-widest px-1">Кількість ({product.unit})</label>
              <div className="flex items-center border border-outline-variant rounded-2xl overflow-hidden w-fit bg-surface-container-lowest p-1 shadow-inner">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-12 h-12 flex items-center justify-center hover:bg-white transition-all rounded-xl text-primary"><Minus size={20} strokeWidth={3} /></button>
                <div className="w-16 h-12 flex items-center justify-center font-black text-xl text-primary">{qty}</div>
                <button onClick={() => setQty(q => q + 1)} className="w-12 h-12 flex items-center justify-center hover:bg-white transition-all rounded-xl text-primary"><Plus size={20} strokeWidth={3} /></button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button 
                onClick={() => addToCart(product)}
                className="w-full bg-primary text-on-primary h-[64px] rounded-2xl font-black text-lg hover:bg-primary/95 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20 group"
              >
                <ShoppingBasket size={24} className="group-hover:rotate-12 transition-transform" />
                <span>Додати в кошик</span>
              </button>
              <button className="w-full h-16 rounded-2xl border-2 border-primary text-primary font-black text-lg hover:bg-primary-fixed transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
                <Heart size={24} />
                <span>В обране</span>
              </button>
            </div>
          </div>

          {/* Farmer */}
          <div className="flex items-center gap-6 p-6 border border-outline-variant rounded-[32px] hover:bg-white hover:shadow-lg transition-all cursor-pointer group">
             <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 shadow-md">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnAbnjQ7TkOBSXR8kCusS4toZvumBPHoyZUEDyIymP3PeW7EY_u_f5dZaQr-ttERIwdGO5GYD7uwbj4yYNsh_kCUH_WajCb-gIYE_heA0dyTaUn7LiWXFvfmAqYOd4s43IUmQZJSlFaAU_ybrxC7BazM4euSC-cXQ11SymE42g2rkyat9N20jf0q8kI0uj3EZBRoK5RACCJW_ThNsozgGRWn810MkgHGyJrbxVfqC3q4dHYicvvZphYEbhiU73W51R4wldOGOslPs" alt="Farmer" className="w-full h-full object-cover" />
             </div>
             <div className="flex-grow">
               <h4 className="text-xl font-black text-on-surface group-hover:text-primary transition-colors">{product.farmer}</h4>
               <p className="text-sm font-bold text-outline uppercase tracking-wider">{product.location}</p>
               <div className="flex items-center gap-2 text-primary font-black text-xs uppercase mt-2">
                 <Verified size={16} />
                 <span>Перевірений виробник</span>
               </div>
             </div>
             <ChevronRight className="text-outline group-hover:translate-x-1 transition-transform" size={24} />
          </div>
        </div>
      </div>

      {/* Tabs / Description */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 py-20 border-t border-outline-variant/30">
        <div className="space-y-10">
          <h2 className="text-3xl font-black text-primary flex items-center gap-3">
             <span className="w-1.5 h-6 bg-secondary rounded-full"></span>
             Опис товару
          </h2>
          <div className="prose prose-lg max-w-none text-on-surface-variant font-medium leading-relaxed">
            <p>{product.description}</p>
            <ul className="mt-10 space-y-6 list-none p-0">
               <li className="flex items-start gap-4">
                 <div className="p-1 bg-green-100 text-green-600 rounded-full"><CheckCircle size={20} /></div>
                 <span className="font-bold text-on-surface">100% натуральний продукт без ГМО</span>
               </li>
               <li className="flex items-start gap-4">
                 <div className="p-1 bg-green-100 text-green-600 rounded-full"><CheckCircle size={20} /></div>
                 <span className="font-bold text-on-surface">Зібрано за 24 години до доставки</span>
               </li>
               <li className="flex items-start gap-4">
                 <div className="p-1 bg-green-100 text-green-600 rounded-full"><CheckCircle size={20} /></div>
                 <span className="font-bold text-on-surface">Гарантія якості від виробника</span>
               </li>
            </ul>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-[40px] p-12 border border-outline-variant shadow-sm h-fit">
           <h3 className="text-2xl font-black text-primary mb-10">Користь та особливості</h3>
           <div className="grid grid-cols-1 gap-8">
             <div className="flex items-center gap-6">
               <div className="w-16 h-16 flex items-center justify-center bg-white rounded-2xl shadow-sm text-primary"><Leaf size={32} /></div>
               <div className="flex-grow">
                 <h4 className="font-black text-on-surface">Екологічність</h4>
                 <p className="text-sm font-bold text-outline uppercase tracking-wider">Вирощено без хімії</p>
               </div>
             </div>
             <div className="flex items-center gap-6">
               <div className="w-16 h-16 flex items-center justify-center bg-white rounded-2xl shadow-sm text-primary"><Truck size={32} /></div>
               <div className="flex-grow">
                 <h4 className="font-black text-on-surface">Швидка логістика</h4>
                 <p className="text-sm font-bold text-outline uppercase tracking-wider">До вашого столу сьогодні</p>
               </div>
             </div>
             <div className="flex items-center gap-6">
               <div className="w-16 h-16 flex items-center justify-center bg-white rounded-2xl shadow-sm text-primary"><Package size={32} /></div>
               <div className="flex-grow">
                 <h4 className="font-black text-on-surface">Надійна упаковка</h4>
                 <p className="text-sm font-bold text-outline uppercase tracking-wider">Еко-пакети та бокси</p>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
