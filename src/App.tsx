/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, createContext, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AccessibilityProfile, CartItem, Product } from './types';
import { auth } from './lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import TopAppBar from './components/TopAppBar';
import Footer from './components/Footer';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

interface AccessibilityContextType {
  profile: AccessibilityProfile;
  setProfile: (profile: AccessibilityProfile) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return context;
};

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

export default function App() {
  const [profile, setProfile] = useState<AccessibilityProfile>('standard');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  // Handle profile-specific body classes or styles
  useEffect(() => {
    document.documentElement.className = profile === 'vision' ? 'dark' : 'light';
    if (profile === 'vision') {
      document.body.style.backgroundColor = '#000000';
      document.body.style.color = '#FFFF00';
      document.body.classList.add('vision-profile');
    } else {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      document.body.classList.remove('vision-profile');
    }

    if (profile === 'mobility') {
      document.body.classList.add('mobility-profile');
    } else {
      document.body.classList.remove('mobility-profile');
    }
  }, [profile]);

  return (
    <Router>
      <AuthContext.Provider value={{ user, loading }}>
        <AccessibilityContext.Provider value={{ profile, setProfile }}>
          <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
            <div className={`min-h-screen flex flex-col ${profile === 'vision' ? 'bg-black text-yellow-400' : 'bg-background text-on-background'}`}>
              <TopAppBar />
              <main className="flex-grow" aria-live="polite">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </CartContext.Provider>
        </AccessibilityContext.Provider>
      </AuthContext.Provider>
    </Router>
  );
}
