import React, { useState, useRef, useEffect } from 'react';
import { Gender } from '../types';
import { logout } from '../services/AuthService';

import logo from '../assets/logo.png';
import manSvg from '../assets/man.svg';
import womanSvg from '../assets/woman.svg';

interface HeaderProps {
    onHomeClick: () => void;
    onProfileClick: () => void;
    onProgressClick: () => void; 
    gender: Gender | null;
}

const UserIcon: React.FC<{ gender: Gender | null }> = ({ gender }) => {
  const iconSrc = gender === 'woman' ? womanSvg : manSvg;
  return <img src={iconSrc} alt="User" className="h-8 w-8 rounded-full" />;
};

const Header: React.FC<HeaderProps> = ({ onHomeClick, onProfileClick, onProgressClick, gender }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div 
          className="flex items-center space-x-3 cursor-pointer"
          onClick={onHomeClick}
          role="button"
          aria-label="Go to homepage"
        >
          <img src={logo} alt="Patent Claim Drafter AI" className="h-8" />
        </div>
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)} 
            className="p-2 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="View Profile"
          >
            <UserIcon gender={gender} />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <button 
                onClick={() => { onProfileClick(); setDropdownOpen(false); }}
                className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 w-full text-left"
              >
                Profile
              </button>
              <button 
                onClick={() => { onProgressClick(); setDropdownOpen(false); }}
                className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 w-full text-left"
              >
                Progress
              </button>
              <button 
                onClick={logout}
                className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 w-full text-left"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;