import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useAccessibility, useCart } from '../App';
import { ChevronRight, Truck, Package, Store, CreditCard, Banknote, Landmark, CheckCircle, Info, ArrowRight, ArrowLeft, User, Phone, MapPin } from 'lucide-react';

export default function Checkout() {
  const { profile } = useAccessibility();
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const delivery = 50;
  const total = subtotal + delivery;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 3000);
  };

  if (submitted) {
    return (
      <div className={`min-h-[80vh] flex flex-col items-center justify-center text-center px-4 ${profile === 'vision' ? 'bg-black text-white' : ''}`}>
        <div className={`p-10 rounded-full mb-10 ${profile === 'vision' ? 'vision-border' : 'bg-green-100 text-green-600'}`}>
           <CheckCircle size={100} strokeWidth={profile === 'vision' ? 4 : 2} />
        </div>
        <h1 className="text-6xl font-black mb-6">Дякуємо за замовлення!</h1>
        <p className="text-2xl font-bold text-on-surface-variant max-w-xl mb-12">Ваше замовлення успішно прийняте в роботу. Ми зателефонуємо вам для підтвердження деталей.</p>
        <p className="text-lg opacity-60">Ви будете перенаправлені на головну через 3 секунди...</p>
      </div>
    );
  }

  if (profile === 'vision') {
    return (
      <div className="max-w-4xl mx-auto px-margin-mobile md:px-gutter py-12 pb-24">
        <h1 className="text-white font-black text-8xl mb-12 uppercase">ОФОРМЛЕННЯ</h1>
        
        <form onSubmit={handleSubmit} className="space-y-12">
          <section className="vision-border p-10 bg-black space-y-12">
            <h2 className="text-yellow-400 text-5xl font-black border-b-8 border-yellow-400 pb-6 uppercase">1. Доставка</h2>
            <div className="space-y-8">
              <div>
                <label className="text-white text-3xl font-black block mb-4 uppercase">ПОВНЕ ІМ'Я</label>
                <input required className="w-full h-24 bg-black border-4 border-yellow-400 text-white text-3xl px-8 focus:outline-none focus:ring-8 focus:ring-white" />
              </div>
              <div>
                <label className="text-white text-3xl font-black block mb-4 uppercase">АДРЕСА</label>
                <input required className="w-full h-24 bg-black border-4 border-yellow-400 text-white text-3xl px-8 focus:outline-none focus:ring-8 focus:ring-white" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="text-white text-3xl font-black block mb-4 uppercase">МІСТО</label>
                  <input required className="w-full h-24 bg-black border-4 border-yellow-400 text-white text-3xl px-8 focus:outline-none focus:ring-8 focus:ring-white" />
                </div>
                <div>
                  <label className="text-white text-3xl font-black block mb-4 uppercase">ІНДЕКС</label>
                  <input required className="w-full h-24 bg-black border-4 border-yellow-400 text-white text-3xl px-8 focus:outline-none focus:ring-8 focus:ring-white" />
                </div>
              </div>
            </div>
          </section>

          <section className="vision-border p-10 bg-zinc-900 border-white !border-white text-center">
             <div className="flex justify-between items-center mb-8">
               <span className="text-white text-4xl font-black uppercase">Всього:</span>
               <span className="text-yellow-400 text-8xl font-black">{total}.00 ₴</span>
             </div>
             <button type="submit" className="vision-button-primary bg-yellow-400 text-black w-full py-12 text-5xl font-black border-8 border-white uppercase">
               ПІДТВЕРДИТИ
             </button>
          </section>
        </form>
      </div>
    );
  }

  if (profile === 'mobility') {
     return (
       <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-12 pt-24 pb-24">
         <h1 className="text-6xl font-black text-primary mb-12 uppercase tracking-tighter">Оформлення замовлення</h1>
         <form onSubmit={handleSubmit} className="space-y-16">
            <section className="space-y-10">
               <h2 className="text-4xl font-black flex items-center gap-6 text-primary uppercase">
                 <Truck size={48} strokeWidth={3} />
                 <span>Спосіб доставки</span>
               </h2>
               <div className="grid grid-cols-1 gap-8">
                  {['Кур\'єрська доставка (120 ₴)', 'Самовивіз із ферми (Безкоштовно)'].map((method, idx) => (
                    <label key={idx} className="flex items-center gap-8 p-10 border-4 border-outline-variant rounded-[32px] cursor-pointer hover:border-primary transition-all bg-white shadow-lg active:scale-95">
                      <input type="radio" name="delivery" defaultChecked={idx === 0} className="w-12 h-12 text-primary" />
                      <span className="font-black text-3xl">{method}</span>
                    </label>
                  ))}
               </div>
            </section>

            <section className="space-y-10">
               <h2 className="text-4xl font-black flex items-center gap-6 text-primary uppercase">
                 <User size={48} strokeWidth={3} />
                 <span>Ваші дані</span>
               </h2>
               <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="font-black text-2xl px-4 uppercase text-outline">Повне ім'я</label>
                    <input required className="w-full min-h-[100px] px-8 text-3xl font-bold border-4 border-outline-variant rounded-[24px] focus:border-primary focus:ring-8 focus:ring-primary/20 outline-none" />
                  </div>
                  <div className="space-y-4">
                    <label className="font-black text-2xl px-4 uppercase text-outline">Адреса доставки</label>
                    <input required className="w-full min-h-[100px] px-8 text-3xl font-bold border-4 border-outline-variant rounded-[24px] focus:border-primary focus:ring-8 focus:ring-primary/20 outline-none" />
                  </div>
               </div>
            </section>

            <div className="bg-primary-container p-12 rounded-[48px] shadow-2xl border-b-[12px] border-primary-fixed-dim space-y-10">
               <div className="flex justify-between items-center text-on-primary">
                 <span className="text-3xl font-black uppercase">Сума до сплати:</span>
                 <span className="text-6xl font-black text-secondary-fixed">{total} ₴</span>
               </div>
               <button type="submit" className="w-full min-h-[120px] bg-secondary-container text-on-secondary-container font-black text-4xl rounded-[32px] shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-6 uppercase border-b-8 border-on-secondary-fixed-variant">
                  <span>ПІДТВЕРДИТИ</span>
                  <ArrowRight size={48} strokeWidth={4} />
               </button>
            </div>
         </form>
       </div>
     );
  }

  if (profile === 'cognitive') {
    return (
       <div className="pt-24 pb-12 max-w-2xl mx-auto px-margin-mobile">
         <nav className="mb-10 flex items-center gap-2 text-on-surface-variant font-black text-xl">
           <Link to="/cart" className="hover:underline">Кошик</Link>
           <ChevronRight size={20} />
           <span className="text-primary font-black">Оплата</span>
         </nav>

         <section className="bg-white border-4 border-outline-variant rounded-[40px] p-10 shadow-2xl space-y-12">
            <div className="space-y-4 text-center md:text-left">
              <h1 className="text-5xl font-black text-primary leading-tight">Оформлення</h1>
              <p className="text-2xl font-bold text-on-surface-variant">Будь ласка, заповніть ці прості поля.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
               <div className="space-y-6">
                  <label className="block text-3xl font-black text-on-surface">1. Як вас звати?</label>
                  <p className="text-xl font-bold text-on-surface-variant">Напишіть ваше ім'я та прізвище.</p>
                  <input required placeholder="Напр: Іван Коваль" className="w-full p-8 text-2xl font-black border-4 border-outline-variant rounded-2xl focus:border-primary focus:ring-8 focus:ring-primary/10" />
               </div>

               <div className="space-y-6">
                  <label className="block text-3xl font-black text-on-surface">2. Де ви заберете продукти?</label>
                  <div className="grid grid-cols-1 gap-6">
                     {['Центральний Ринок', 'Фермерська Лавка'].map((place, i) => (
                       <label key={place} className={`flex items-center p-8 border-4 rounded-2xl cursor-pointer transition-all ${i === 0 ? 'bg-primary-fixed border-primary shadow-inner' : 'border-outline-variant hover:border-primary bg-surface'}`}>
                         <input type="radio" name="place" defaultChecked={i === 0} className="w-8 h-8 text-primary" />
                         <span className="ml-6 text-2xl font-black uppercase tracking-tight">{place}</span>
                       </label>
                     ))}
                  </div>
               </div>

               <div className="bg-surface-container-low p-8 rounded-3xl border-2 border-outline-variant text-center space-y-4">
                  <div className="text-6xl font-black text-primary">{total} ₴</div>
                  <div className="text-xl font-bold text-on-surface-variant">3 товари у вашому кошику</div>
               </div>

               <button type="submit" className="w-full bg-primary text-on-primary font-black text-4xl py-10 rounded-[32px] shadow-2xl hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-6">
                 <span>ПІДТВЕРДИТИ</span>
                 <CheckCircle size={48} strokeWidth={3} />
               </button>
            </form>
         </section>

         <div className="mt-12 p-10 bg-blue-50 border-4 border-dashed border-primary/30 rounded-[40px] flex items-start gap-8 shadow-sm">
            <Info size={48} className="text-primary flex-shrink-0" />
            <div>
              <p className="text-2xl font-black text-primary mb-2">Потрібна допомога?</p>
              <p className="text-xl font-bold text-on-surface-variant leading-relaxed">Якщо у вас виникли труднощі, зателефонуйте нам: <strong className="text-primary text-2xl">0 800 123 456</strong>.</p>
            </div>
         </div>
       </div>
    );
  }

  // Standard Profile
  return (
     <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-12 pt-8 pb-24">
        <nav className="flex items-center gap-2 mb-12 font-bold text-sm text-outline capitalize">
          <Link to="/cart" className="hover:text-primary transition-colors">Кошик</Link>
          <ChevronRight size={16} />
          <span className="text-on-surface">Оформлення</span>
        </nav>

        <h1 className="text-5xl font-black text-primary mb-16 leading-tight">Оформлення замовлення</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
           <div className="lg:col-span-8 space-y-12">
              <section className="bg-white border border-outline-variant p-10 rounded-[40px] shadow-xl shadow-primary/5 space-y-10">
                 <div className="flex items-center gap-6">
                   <div className="w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center font-black text-xl shadow-lg">1</div>
                   <h2 className="text-3xl font-black text-on-surface">Контактна інформація</h2>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {['Ім\'я', 'Прізвище', 'Номер телефону', 'Email'].map(label => (
                      <div key={label} className="space-y-3">
                        <label className="text-xs font-black text-on-surface uppercase tracking-widest px-1">{label}</label>
                        <input required className="w-full h-16 bg-surface-container-lowest border border-outline-variant rounded-2xl px-6 font-bold text-on-surface focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all" />
                      </div>
                    ))}
                 </div>
              </section>

              <section className="bg-white border border-outline-variant p-10 rounded-[40px] shadow-xl shadow-primary/5 space-y-10">
                 <div className="flex items-center gap-6">
                   <div className="w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center font-black text-xl shadow-lg">2</div>
                   <h2 className="text-3xl font-black text-on-surface">Доставка та оплата</h2>
                 </div>
                 <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       {[
                         { id: 'courier', label: 'Кур\'єр', icon: Truck },
                         { id: 'post', label: 'Пошта', icon: Package },
                         { id: 'store', label: 'Самовивіз', icon: Store }
                       ].map(opt => (
                         <label key={opt.id} className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-outline-variant rounded-3xl cursor-pointer hover:border-primary transition-all bg-surface-container-lowest peer-checked:border-primary group">
                            <input type="radio" name="del_opt" defaultChecked={opt.id === 'courier'} className="sr-only peer" />
                            <opt.icon size={32} className="text-outline group-hover:text-primary transition-colors" />
                            <span className="font-black text-sm uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors">{opt.label}</span>
                         </label>
                       ))}
                    </div>
                    <div className="space-y-6">
                       {['Карткою онлайн', 'Готівкою', 'Безготівковий розрахунок'].map((pay, i) => (
                          <label key={pay} className="flex items-center gap-4 p-6 border border-outline-variant rounded-2xl cursor-pointer hover:bg-surface-container-low transition-all bg-surface-container-lowest group">
                             <input type="radio" name="pay_opt" defaultChecked={i === 0} className="w-5 h-5 text-primary focus:ring-primary" />
                             <span className="font-bold text-on-surface group-hover:text-primary transition-colors">{pay}</span>
                          </label>
                       ))}
                    </div>
                 </div>
              </section>
           </div>

           <aside className="lg:col-span-4 sticky top-32 space-y-8">
              <div className="bg-primary-container p-10 rounded-[40px] text-on-primary shadow-2xl border-l-[12px] border-l-secondary-fixed shadow-[0_20px_50px_rgba(0,42,92,0.3)]">
                 <h3 className="text-2xl font-black mb-10 border-b border-on-primary-container/20 pb-6 uppercase tracking-tighter">Ваше замовлення</h3>
                 <div className="space-y-6 mb-10 border-b border-on-primary-container/20 pb-10 max-h-60 overflow-y-auto pr-4 custom-scrollbar">
                    {cart.map(item => (
                       <div key={item.id} className="flex items-center gap-4">
                          <img src={item.image} className="w-12 h-12 rounded-xl object-cover border border-white/20" alt={item.name} />
                          <div className="flex-grow">
                             <p className="font-black text-sm leading-none">{item.name}</p>
                             <p className="text-[10px] font-bold opacity-60 uppercase mt-1">{item.quantity} × {item.price} ₴</p>
                          </div>
                       </div>
                    ))}
                 </div>
                 <div className="flex justify-between items-baseline mb-12">
                   <span className="text-xl font-bold opacity-60 uppercase tracking-widest">Разом:</span>
                   <span className="text-6xl font-black text-secondary-fixed tracking-tight">{total} ₴</span>
                 </div>
                 <button type="submit" className="w-full bg-white text-primary py-6 rounded-3xl font-black text-lg hover:bg-secondary-fixed hover:text-on-secondary-container active:scale-[0.98] transition-all flex items-center justify-center gap-4 shadow-xl">
                   <span>Підтвердити замовлення</span>
                   <ArrowRight size={24} />
                 </button>
              </div>
              
              <Link to="/cart" className="flex items-center justify-center gap-2 text-outline font-black uppercase text-xs tracking-widest hover:text-primary transition-colors w-full py-4 rounded-full border border-outline-variant hover:border-primary group">
                <ArrowLeft size={16} className="group-hover:translate-x-[-4px] transition-transform" />
                <span>Змінити кошик</span>
              </Link>
           </aside>
        </form>
     </div>
  );
}
