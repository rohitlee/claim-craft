import React, { useState } from 'react';
import LoginView from './LoginView';
import { Gender } from '../types';

import logo from '../assets/logo.png';

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
  onSignup: (name: string, gender: Gender, email: string, password: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onSignup }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Claim Craft Logo" className="h-12 mb-4" />
        </div>
        <div className="flex justify-center mb-6">
          <button onClick={() => setIsLogin(true)} className={`px-4 py-2 text-lg font-semibold ${isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}>Login</button>
          <button onClick={() => setIsLogin(false)} className={`px-4 py-2 text-lg font-semibold ${!isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}>Sign Up</button>
        </div>
        <LoginView isLogin={isLogin} onLogin={onLogin} onSignup={onSignup} />
      </div>
    </div>
  );
};

export default LoginPage;