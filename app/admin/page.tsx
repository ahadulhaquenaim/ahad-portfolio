'use client';

import { useState } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';
import BiosManager from '@/components/admin/BiosManager';
import SkillsManager from '@/components/admin/SkillsManager';
import ExperiencesManager from '@/components/admin/ExperiencesManager';
import AchievementsManager from '@/components/admin/AchievementsManager';
import ResumeManager from '@/components/admin/ResumeManager';
import CertificationsManager from '@/components/admin/CertificationsManager';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'skills', label: 'Skills' },
    { id: 'experiences', label: 'Experiences' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'resume', label: 'Resume' },
  ];

  return (
    <div className="min-h-screen admin-page">
      {/* Header */}
      <header className="admin-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="admin-header-inner">
            <div>
              <h1 className="admin-title text-3xl font-bold">Admin Dashboard</h1>
              <p className="admin-subtitle mt-2">Manage your portfolio content</p>
            </div>
            <div className="admin-header-badge">Last updated: Today</div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="admin-tabs">
          <nav className="admin-tabs-nav" aria-label="Admin sections">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`admin-tab ${
                  activeTab === tab.id ? 'admin-tab-active' : 'admin-tab-inactive'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="admin-card">
          <div className="admin-card-body">
          {activeTab === 'profile' && (
            <div className="space-y-10">
              <ImageUpload />
              <div className="border-t border-gray-200 pt-8">
                <BiosManager />
              </div>
            </div>
          )}
          {activeTab === 'skills' && <SkillsManager />}
          {activeTab === 'experiences' && <ExperiencesManager />}
          {activeTab === 'achievements' && <AchievementsManager />}
          {activeTab === 'certifications' && <CertificationsManager />}
          {activeTab === 'resume' && <ResumeManager />}
          </div>
        </div>
      </div>
    </div>
  );
}
