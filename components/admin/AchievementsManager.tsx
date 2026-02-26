'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
}

export default function AchievementsManager() {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Best Developer Award 2023',
      description: 'Received for outstanding contributions to the project',
      date: '2023-12',
      imageUrl: '/placeholder.jpg',
    },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    imageUrl: '',
  });
  const [previewImage, setPreviewImage] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      console.log('Image file selected:', file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const achievementData = {
      ...formData,
      imageUrl: previewImage || formData.imageUrl,
    };

    if (currentAchievement) {
      // Update existing achievement
      setAchievements(achievements.map(achievement => 
        achievement.id === currentAchievement.id 
          ? { ...achievementData, id: currentAchievement.id }
          : achievement
      ));
      alert('Achievement updated successfully!');
    } else {
      // Add new achievement
      const newAchievement: Achievement = {
        id: Date.now().toString(),
        ...achievementData,
      };
      setAchievements([...achievements, newAchievement]);
      alert('Achievement added successfully!');
    }

    // Reset form
    setFormData({
      title: '',
      description: '',
      date: '',
      imageUrl: '',
    });
    setPreviewImage('');
    setCurrentAchievement(null);
    setIsEditing(false);
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

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this achievement?')) {
      setAchievements(achievements.filter(achievement => achievement.id !== id));
      alert('Achievement deleted successfully!');
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      imageUrl: '',
    });
    setPreviewImage('');
    setCurrentAchievement(null);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Achievements Management</h2>
        <p className="text-gray-600">Add, update, or delete your achievements</p>
      </div>

      {/* Form Toggle Button */}
      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add New Achievement
        </button>
      )}

      {/* Form */}
      {isEditing && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {currentAchievement ? 'Edit Achievement' : 'Add New Achievement'}
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date *
            </label>
            <input
              type="month"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Image Preview */}
          {previewImage && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image Preview
              </label>
              <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-gray-200">
                <Image
                  src={previewImage}
                  alt="Achievement preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Achievement Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="mt-4">
                  <label htmlFor="achievement-image-upload" className="cursor-pointer">
                    <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                      Upload Image
                    </span>
                    <input
                      id="achievement-image-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <p className="mt-2 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          {/* Or Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Or enter image URL
            </label>
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
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {currentAchievement ? 'Update Achievement' : 'Add Achievement'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Achievements List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Your Achievements</h3>
        {achievements.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No achievements added yet. Add your first achievement!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                {achievement.imageUrl && (
                  <div className="relative w-full h-48">
                    <Image
                      src={achievement.imageUrl}
                      alt={achievement.title}
                      fill
                      className="object-cover"
                    />
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
                  </div>
                  <p className="text-gray-700 text-sm mb-4">{achievement.description}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(achievement)}
                      className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(achievement.id)}
                      className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
