import React, { useState } from 'react';
import { Gender } from '../types';

interface LoginViewProps {
  isLogin: boolean;
  onLogin: (email: string, password: string) => void;
  onSignup: (name: string, gender: Gender, email: string, password: string) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ isLogin, onLogin, onSignup }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<Gender>('man');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(email, password);
    } else {
      onSignup(name, gender, email, password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!isLogin && (
        <div>
          <label className="block text-sm font-medium text-slate-700">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
        </div>
      )}
      {!isLogin && (
        <div>
          <label className="block text-sm font-medium text-slate-700">Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value as Gender)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required>
            <option value="man">Man</option>
            <option value="woman">Woman</option>
          </select>
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-slate-700">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" required />
      </div>
      <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">{isLogin ? 'Login' : 'Sign Up'}</button>
    </form>
  );
};

export default LoginView;