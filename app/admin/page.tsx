'use client';

import { useState } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';
import SkillsManager from '@/components/admin/SkillsManager';
import ExperiencesManager from '@/components/admin/ExperiencesManager';
import AchievementsManager from '@/components/admin/AchievementsManager';
import ResumeManager from '@/components/admin/ResumeManager';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile Image' },
    { id: 'skills', label: 'Skills' },
    { id: 'experiences', label: 'Experiences' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'resume', label: 'Resume' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your portfolio content</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === 'profile' && <ImageUpload />}
          {activeTab === 'skills' && <SkillsManager />}
          {activeTab === 'experiences' && <ExperiencesManager />}
          {activeTab === 'achievements' && <AchievementsManager />}
          {activeTab === 'resume' && <ResumeManager />}
        </div>
      </div>
    </div>
  );
}
