'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
}

export default function AchievementsManager() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    imageUrl: '',
  });
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  async function fetchAchievements() {
    try {
      const res = await fetch('/api/achievements');
      const data = await res.json();
      setAchievements(data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setFetching(false);
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      // Sanitize filename: remove spaces and special characters
      const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const uploadUrl = `/api/upload?filename=${encodeURIComponent(sanitizedFilename)}`;
      const res = await fetch(uploadUrl, { method: 'POST', body: file });
      const { url } = await res.json();

      setPreviewImage(url);
      setFormData({ ...formData, imageUrl: url });
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const achievementData = {
      ...formData,
      imageUrl: previewImage || formData.imageUrl,
    };

    try {
      if (currentAchievement) {
        const res = await fetch(`/api/achievements/${currentAchievement.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(achievementData),
        });

        if (res.ok) {
          const updated = await res.json();
          setAchievements(achievements.map(a => a.id === currentAchievement.id ? updated : a));
          alert('Achievement updated successfully!');
        }
      } else {
        const res = await fetch('/api/achievements', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(achievementData),
        });

        if (res.ok) {
          const newAchievement = await res.json();
          setAchievements([newAchievement, ...achievements]);
          alert('Achievement added successfully!');
        }
      }
    } catch (error) {
      console.error('Error saving achievement:', error);
      alert('Failed to save achievement');
    } finally {
      setFormData({ title: '', description: '', date: '', imageUrl: '' });
      setPreviewImage('');
      setCurrentAchievement(null);
      setIsEditing(false);
      setLoading(false);
    }
  };

  const handleEdit = (achievement: Achievement) => {
    setCurrentAchievement(achievement);
    setFormData({
      title: achievement.title,
      description: achievement.description,
      date: achievement.date,
      imageUrl: achievement.imageUrl,
    });
    setPreviewImage(achievement.imageUrl);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this achievement?')) return;

    try {
      const achievement = achievements.find(a => a.id === id);
      if (achievement?.imageUrl?.includes('blob.vercel-storage.com')) {
        await fetch('/api/upload', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: achievement.imageUrl }),
        });
      }

      const res = await fetch(`/api/achievements/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setAchievements(achievements.filter(a => a.id !== id));
        alert('Achievement deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting achievement:', error);
      alert('Failed to delete achievement');
    }
  };

  const handleCancel = () => {
    setFormData({ title: '', description: '', date: '', imageUrl: '' });
    setPreviewImage('');
    setCurrentAchievement(null);
    setIsEditing(false);
  };

  if (fetching) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Achievements Management</h2>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Achievements Management</h2>
        <p className="text-gray-600">Add, update, or delete your achievements</p>
      </div>

      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add New Achievement
        </button>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {currentAchievement ? 'Edit Achievement' : 'Add New Achievement'}
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Best Developer Award"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe your achievement..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
            <input
              type="month"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {previewImage && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Image Preview</label>
              <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-gray-200">
                <Image src={previewImage} alt="Achievement preview" fill className="object-cover" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Achievement Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="mt-4">
                  <label htmlFor="achievement-image-upload" className="cursor-pointer">
                    <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                      {loading ? 'Uploading...' : 'Upload Image'}
                    </span>
                    <input id="achievement-image-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} disabled={loading} />
                  </label>
                </div>
                <p className="mt-2 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Or enter image URL</label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => {
                setFormData({ ...formData, imageUrl: e.target.value });
                setPreviewImage(e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : currentAchievement ? 'Update Achievement' : 'Add Achievement'}
            </button>
            <button type="button" onClick={handleCancel} className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Your Achievements</h3>
        {achievements.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No achievements added yet. Add your first achievement!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                {achievement.imageUrl && (
                  <div className="relative w-full h-48">
                    <Image src={achievement.imageUrl} alt={achievement.title} fill className="object-cover" />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900">{achievement.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(achievement.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button onClick={() => handleEdit(achievement)} className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(achievement.id)} className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mt-2">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
