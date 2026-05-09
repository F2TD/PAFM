import { Link } from 'react-router-dom';
import { useAccessibility, useCart } from '../App';
import { Minus, Plus, Trash2, ArrowLeft, ChevronRight, ShoppingCart, Truck, CreditCard, Banknote, Wallet } from 'lucide-react';
import { motion } from 'motion/react';

export default function Cart() {
  const { profile } = useAccessibility();
  const { cart, removeFromCart, updateQuantity } = useCart();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const delivery = 50;
  const total = subtotal + delivery;

  if (cart.length === 0) {
    return (
       <div className={`pt-24 pb-12 px-margin-mobile flex flex-col items-center justify-center min-h-[60vh] text-center ${profile === 'vision' ? 'text-white' : ''}`}>
          <div className={`p-10 rounded-full mb-8 ${profile === 'vision' ? 'vision-border' : 'bg-surface-container'}`}>
             <ShoppingCart size={80} strokeWidth={profile === 'vision' ? 4 : 2} />
          </div>
          <h2 className="text-4xl font-black mb-6">Ваш кошик порожній</h2>
          <p className="text-xl font-bold text-on-surface-variant max-w-md mb-10">Схоже, ви ще не додали жодного товару до кошика.</p>
          <Link to="/" className={profile === 'vision' ? 'vision-button px-10 py-5 text-2xl font-black' : 'bg-primary text-on-primary px-10 py-5 rounded-2xl font-black text-xl hover:opacity-90 active:scale-95 transition-all'}>
            Повернутися до покупок
          </Link>
       </div>
    );
  }

  if (profile === 'vision') {
    return (
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-12 pb-24">
        <h1 className="text-7xl font-black text-secondary-fixed mb-12 uppercase">Ваш Кошик</h1>
        
        <div className="flex flex-col gap-12">
          {cart.map(item => (
            <div key={item.id} className="vision-border p-8 flex flex-col md:flex-row gap-12 items-center bg-black">
              <div className="w-full md:w-64 h-64 border-4 border-yellow-400 bg-zinc-900 shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale contrast-150" />
              </div>
              <div className="flex-grow space-y-6">
                <h2 className="text-5xl font-black text-white uppercase">{item.name}</h2>
                <p className="text-secondary-fixed font-black text-2xl">{item.price}.00 ₴ / {item.unit}</p>
                <div className="flex items-center gap-6">
                  <label className="font-black text-2xl text-white uppercase tracking-widest">Кількість:</label>
                  <div className="flex border-4 border-yellow-400 overflow-hidden">
                    <button onClick={() => updateQuantity(item.id, -1)} className="px-8 py-4 bg-black text-yellow-400 font-black text-3xl border-r-4 border-yellow-400">-</button>
                    <span className="px-12 py-4 bg-black text-white font-black text-3xl">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="px-8 py-4 bg-black text-yellow-400 font-black text-3xl border-l-4 border-yellow-400">+</button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6 w-full md:w-auto">
                <p className="text-white font-black text-4xl text-right uppercase tracking-tighter">{item.price * item.quantity}.00 ₴</p>
                <button onClick={() => removeFromCart(item.id)} className="bg-red-600 border-4 border-white py-6 px-10 text-white font-black text-xl flex items-center justify-center gap-4 uppercase">
                  <Trash2 size={32} />
                  ВИДАЛИТИ
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 vision-border p-12 bg-zinc-900">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b-8 border-yellow-400 pb-12 mb-12">
             <div>
               <p className="text-white font-black text-4xl uppercase">ЗАГАЛЬНА СУМА:</p>
               <p className="text-secondary-fixed text-2xl font-bold">ПОДАТКИ ТА ДОСТАВКА ВКЛЮЧЕНІ</p>
             </div>
             <p className="text-yellow-400 font-black text-7xl uppercase">{total}.00 ₴</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <Link to="/" className="w-full border-8 border-yellow-400 py-10 px-12 text-yellow-400 font-black text-3xl uppercase text-center">ПРОДОВЖИТИ</Link>
             <Link to="/checkout" className="w-full bg-yellow-400 border-8 border-yellow-400 py-10 px-12 text-black font-black text-3xl uppercase text-center">ОФОРМИТИ</Link>
           </div>
        </div>
      </div>
    );
  }

  if (profile === 'mobility') {
    return (
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-12 pt-24 pb-24">
        <h1 className="text-6xl font-black text-primary mb-12">Ваш кошик</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
             {cart.map(item => (
                <div key={item.id} className="flex flex-col md:flex-row gap-8 p-8 bg-surface-container-lowest border-4 border-outline-variant rounded-3xl shadow-xl">
                  <div className="w-full md:w-56 h-56 overflow-hidden rounded-2xl bg-surface-container flex-shrink-0 border-2 border-outline-variant">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow flex flex-col justify-between py-2 gap-8">
                     <div>
                       <h2 className="text-4xl font-black text-primary mb-2">{item.name}</h2>
                       <p className="text-2xl font-bold text-on-surface-variant font-black uppercase tracking-widest">{item.price} ₴ / {item.unit}</p>
                     </div>
                     <div className="flex flex-wrap items-center gap-8">
                        <div className="flex items-center border-4 border-primary rounded-2xl overflow-hidden bg-white">
                           <button onClick={() => updateQuantity(item.id, -1)} className="w-[80px] h-[80px] flex items-center justify-center bg-surface-container hover:bg-surface-dim transition-all active:scale-90">
                             <Minus size={40} strokeWidth={3} />
                           </button>
                           <div className="w-[80px] text-center font-black text-4xl text-primary">{item.quantity}</div>
                           <button onClick={() => updateQuantity(item.id, 1)} className="w-[80px] h-[80px] flex items-center justify-center bg-surface-container hover:bg-surface-dim transition-all active:scale-90">
                             <Plus size={40} strokeWidth={3} />
                           </button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="w-[80px] h-[80px] flex items-center justify-center bg-red-100 text-red-600 border-4 border-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all active:scale-90 shadow-sm">
                           <Trash2 size={40} strokeWidth={3} />
                        </button>
                     </div>
                  </div>
                </div>
             ))}
          </div>

          <aside className="lg:col-span-4">
             <div className="sticky top-32 p-10 bg-primary-container text-on-primary rounded-[40px] shadow-2xl border-b-[12px] border-primary-fixed-dim">
                <h3 className="text-4xl font-black mb-8 border-b-2 border-on-primary-container/20 pb-6 uppercase tracking-tighter">Разом</h3>
                <div className="space-y-6 mb-12">
                   <div className="flex justify-between items-center text-2xl font-bold opacity-80 uppercase tracking-widest">
                     <span>Товари ({cart.length})</span>
                     <span className="font-black">{subtotal} ₴</span>
                   </div>
                   <div className="flex justify-between items-center text-2xl font-bold opacity-80 uppercase tracking-widest">
                     <span>Доставка</span>
                     <span className="font-black">{delivery} ₴</span>
                   </div>
                   <div className="flex justify-between items-center text-5xl font-black pt-8 border-t-2 border-on-primary-container/20 text-secondary-fixed">
                     <span>Всього:</span>
                     <span>{total} ₴</span>
                   </div>
                </div>
                <Link to="/checkout" className="min-h-[100px] w-full flex items-center justify-center gap-4 bg-secondary-container text-on-secondary-container font-black text-3xl rounded-3xl shadow-xl hover:scale-105 transition-all active:scale-95 border-b-[8px] border-on-secondary-fixed-variant uppercase">
                   <span>Оформити</span>
                   <ChevronRight size={40} strokeWidth={4} />
                </Link>
             </div>
          </aside>
        </div>
      </div>
    );
  }

  if (profile === 'cognitive') {
    return (
      <div className="pt-24 pb-12 max-w-2xl mx-auto px-margin-mobile min-h-screen">
        <nav className="mb-10 flex items-center gap-2 text-on-surface-variant font-black text-xl">
           <Link to="/" className="hover:underline">Головна</Link>
           <ChevronRight size={20} />
           <span className="text-on-surface">Кошик</span>
        </nav>

        <h1 className="text-5xl font-black mb-10 leading-tight">Ваш кошик</h1>

        <div className="space-y-8 mb-16">
          {cart.map(item => (
            <div key={item.id} className="flex flex-col md:flex-row items-center gap-8 p-8 bg-white border-4 border-outline-variant rounded-[32px] shadow-lg">
              <div className="w-40 h-40 flex-shrink-0 bg-surface-container rounded-2xl overflow-hidden border-2 border-outline-variant shadow-inner">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow text-center md:text-left space-y-4">
                 <h2 className="text-3xl font-black text-on-surface leading-tight">{item.name}</h2>
                 <p className="text-xl font-bold text-on-surface-variant">{item.quantity} шт • {item.price * item.quantity} ₴</p>
                 <button onClick={() => removeFromCart(item.id)} className="flex items-center justify-center gap-2 text-red-600 font-black text-2xl hover:underline py-4 w-full md:w-auto">
                   <Trash2 size={24} strokeWidth={3} />
                   <span>Видалити це</span>
                 </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-surface-container-low p-10 rounded-[40px] border-4 border-outline-variant shadow-inner text-center space-y-8">
           <div className="flex justify-between items-center">
             <span className="text-2xl font-bold text-on-surface-variant uppercase tracking-widest leading-none">Всього до оплати:</span>
             <span className="text-5xl font-black text-primary leading-none">{total} ₴</span>
           </div>
           
           <Link to="/checkout" className="w-full bg-primary text-on-primary font-black text-3xl py-8 rounded-[24px] shadow-2xl hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-4">
             <span>Оформити замовлення</span>
             <ChevronRight size={32} strokeWidth={3} />
           </Link>

           <Link to="/" className="inline-flex items-center gap-3 text-on-surface-variant font-black text-xl hover:underline py-4">
             <ArrowLeft size={24} />
             <span>Повернутися до покупок</span>
           </Link>
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
        <span className="text-on-surface">Кошик</span>
      </nav>

      <div className="flex items-end justify-between mb-12 border-b border-outline-variant/30 pb-12">
        <h1 className="text-5xl font-black text-primary leading-tight">Ваш кошик</h1>
        <p className="text-on-surface-variant font-bold uppercase tracking-widest text-sm">{cart.length} товари</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-8 space-y-8">
          {cart.map(item => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-outline-variant p-8 rounded-[32px] flex flex-col md:flex-row items-center gap-10 group hover:shadow-2xl hover:shadow-primary/5 transition-all border-l-8 border-l-primary"
            >
              <div className="w-40 h-40 flex-shrink-0 bg-surface-container overflow-hidden rounded-[24px] border border-outline-variant shadow-inner">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="flex-grow flex flex-col md:flex-row justify-between items-center w-full gap-8">
                 <div className="text-center md:text-left space-y-2">
                   <h3 className="text-2xl font-black text-on-surface">{item.name}</h3>
                   <p className="text-xs font-black text-outline uppercase tracking-[0.2em]">{item.farmer}</p>
                 </div>
                 <div className="flex items-center gap-12">
                    <div className="flex items-center bg-surface-container-low rounded-2xl p-1 shadow-inner border border-outline-variant/30">
                       <button onClick={() => updateQuantity(item.id, -1)} className="w-[44px] h-[44px] flex items-center justify-center hover:bg-white transition-all rounded-xl text-primary shadow-sm"><Minus size={18} strokeWidth={3} /></button>
                       <span className="px-6 font-black text-xl text-primary">{item.quantity}</span>
                       <button onClick={() => updateQuantity(item.id, 1)} className="w-[44px] h-[44px] flex items-center justify-center hover:bg-white transition-all rounded-xl text-primary shadow-sm"><Plus size={18} strokeWidth={3} /></button>
                    </div>
                    <div className="text-right min-w-[120px]">
                       <span className="text-3xl font-black text-primary">{item.price * item.quantity} ₴</span>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="p-3 text-outline hover:text-red-500 hover:bg-red-50 transition-all rounded-2xl group/trash">
                       <Trash2 size={24} className="group-hover/trash:scale-110 transition-transform" />
                    </button>
                 </div>
              </div>
            </motion.div>
          ))}
          
           <div className="pt-8">
            <Link to="/" className="inline-flex items-center gap-2 text-primary font-black uppercase text-xs tracking-widest group">
              <ArrowLeft size={18} className="translate-y-[-1px] group-hover:translate-x-[-4px] transition-transform" />
              <span>Продовжити покупки</span>
            </Link>
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-white border border-outline-variant p-10 rounded-[40px] sticky top-32 shadow-xl shadow-primary/5">
             <h2 className="text-2xl font-black text-on-surface mb-10 flex items-center gap-3">
               <div className="w-1.5 h-6 bg-secondary rounded-full"></div>
               Разом
             </h2>
             <div className="space-y-6 mb-10 border-b border-outline-variant/30 pb-10">
               <div className="flex justify-between font-bold text-on-surface-variant uppercase tracking-widest text-sm">
                 <span>Сума товарів</span>
                 <span className="text-on-surface">{subtotal} ₴</span>
               </div>
               <div className="flex justify-between font-bold text-on-surface-variant uppercase tracking-widest text-sm">
                 <span>Вартість доставки</span>
                 <span className="text-on-surface">{delivery} ₴</span>
               </div>
             </div>
             <div className="flex justify-between items-baseline mb-12">
                <span className="text-xl font-bold text-on-surface-variant uppercase tracking-widest">До сплати:</span>
                <span className="text-5xl font-black text-primary">{total} ₴</span>
             </div>
             
             <div className="space-y-6">
               <Link to="/checkout" className="w-full bg-primary text-on-primary py-6 rounded-3xl font-black text-lg hover:bg-primary/95 active:scale-[0.98] transition-all flex justify-center items-center gap-4 shadow-xl shadow-primary/20">
                 <span>Оформити замовлення</span>
                 <ChevronRight size={24} />
               </Link>
               
               <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/30 shadow-inner">
                 <div className="flex gap-4 items-center mb-4">
                   <div className="p-2 bg-primary/10 text-primary rounded-xl"><Truck size={20} /></div>
                   <span className="text-xs font-black uppercase tracking-widest text-on-surface">Безкоштовна доставка від 800 ₴</span>
                 </div>
                 <div className="w-full bg-surface-variant/40 h-2.5 rounded-full overflow-hidden mb-3">
                   <div className="bg-primary h-full transition-all duration-1000 shadow-[0_0_20px_rgba(0,42,92,0.4)]" style={{ width: `${Math.min(100, (subtotal / 800) * 100)}%` }}></div>
                 </div>
                 <p className="text-[10px] font-black text-outline uppercase tracking-wider">{subtotal >= 800 ? 'Ви отримали безкоштовну доставку!' : `Додайте товарів на ${800 - subtotal} ₴ для безкоштовної доставки`}</p>
               </div>
             </div>

             <div className="mt-12 flex justify-center gap-8 text-outline/30 grayscale hover:grayscale-0 transition-all">
                <CreditCard size={32} />
                <Banknote size={32} />
                <Wallet size={32} />
             </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
