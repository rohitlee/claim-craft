import React, { useState } from 'react';
import { Gender, User } from '../types';

interface ProfileViewProps {
  user: User;
  onUpdateProfile: (name: string, gender: Gender) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onUpdateProfile }) => {
  const [name, setName] = useState(user.name);
  const [gender, setGender] = useState<Gender>(user.gender);

  const handleSave = () => {
    onUpdateProfile(name, gender);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-slate-700 border-b pb-4 mb-8">Your Profile</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-slate-600 mb-2">Name</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-8">
          <h3 className="block text-sm font-medium text-slate-600 mb-3">Select Your Avatar</h3>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setGender('man')} 
              className={`p-2 rounded-full transition-transform transform hover:scale-110 ${gender === 'man' ? 'bg-blue-200 ring-2 ring-blue-500' : 'hover:bg-slate-100'}`}
            >
              <img src="/assets/man.svg" alt="Man" className="h-16 w-16" />
            </button>
            <button 
              onClick={() => setGender('woman')} 
              className={`p-2 rounded-full transition-transform transform hover:scale-110 ${gender === 'woman' ? 'bg-pink-200 ring-2 ring-pink-500' : 'hover:bg-slate-100'}`}
            >
              <img src="/assets/woman.svg" alt="Woman" className="h-16 w-16" />
            </button>
          </div>
        </div>

        <button 
          onClick={handleSave} 
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileView;
