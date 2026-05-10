import { useState } from 'react';
import { signInWithEmail, signUpWithEmail } from '../lib/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password, displayName);
      }
      onClose();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface p-6 rounded-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">{isLogin ? 'Увійти' : 'Зареєструватися'}</h2>
        {error && <p className="text-error mb-2 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Ім'я"
              className="w-full p-2 border rounded"
              required
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-primary text-on-primary p-2 rounded">
            {isLogin ? 'Увійти' : 'Зареєструватися'}
          </button>
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-sm text-primary underline"
        >
          {isLogin ? 'Немає акаунту? Зареєструватися' : 'Вже маєте акаунт? Увійти'}
        </button>
        <button onClick={onClose} className="mt-4 text-sm text-on-surface-variant block w-full">Закрити</button>
      </div>
    </div>
  );
}
