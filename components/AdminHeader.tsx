import React from 'react';
import { logout } from '../services/AuthService';
import logo from '../assets/admin_logo.png';

const AdminHeader: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Patent Claim Drafter AI" className="h-8" />
        </div>
        <button 
          onClick={logout}
          className="bg-slate-200 text-slate-700 px-4 py-2 rounded-md hover:bg-slate-300 transition-colors font-semibold"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
