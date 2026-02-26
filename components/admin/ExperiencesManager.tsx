'use client';

import { useState } from 'react';

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export default function ExperiencesManager() {
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: '1',
      title: 'Senior Developer',
      company: 'Tech Corp',
      location: 'New York, NY',
      startDate: '2022-01',
      endDate: '2024-02',
      current: false,
      description: 'Led development of multiple projects using React and Node.js',
    },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExperience, setCurrentExperience] = useState<Experience | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentExperience) {
      // Update existing experience
      setExperiences(experiences.map(exp => 
        exp.id === currentExperience.id 
          ? { ...formData, id: currentExperience.id }
          : exp
      ));
      alert('Experience updated successfully!');
    } else {
      // Add new experience
      const newExperience: Experience = {
        id: Date.now().toString(),
        ...formData,
      };
      setExperiences([...experiences, newExperience]);
      alert('Experience added successfully!');
    }

    // Reset form
    setFormData({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    });
    setCurrentExperience(null);
    setIsEditing(false);
  };

  const handleEdit = (experience: Experience) => {
    setCurrentExperience(experience);
    setFormData({
      title: experience.title,
      company: experience.company,
      location: experience.location,
      startDate: experience.startDate,
      endDate: experience.endDate,
      current: experience.current,
      description: experience.description,
    });
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      setExperiences(experiences.filter(exp => exp.id !== id));
      alert('Experience deleted successfully!');
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    });
    setCurrentExperience(null);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Experiences Management</h2>
        <p className="text-gray-600">Add, update, or delete your work experiences</p>
      </div>

      {/* Form Toggle Button */}
      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add New Experience
        </button>
      )}

      {/* Form */}
      {isEditing && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {currentExperience ? 'Edit Experience' : 'Add New Experience'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Software Engineer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Google"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., San Francisco, CA"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date *
              </label>
              <input
                type="month"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="month"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                disabled={formData.current}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="current"
                checked={formData.current}
                onChange={(e) => setFormData({ ...formData, current: e.target.checked, endDate: e.target.checked ? '' : formData.endDate })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="current" className="ml-2 block text-sm text-gray-700">
                Currently working here
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe your responsibilities and achievements..."
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {currentExperience ? 'Update Experience' : 'Add Experience'}
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

      {/* Experiences List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Your Experiences</h3>
        {experiences.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No experiences added yet. Add your first experience!</p>
        ) : (
          <div className="space-y-4">
            {experiences.map((experience) => (
              <div
                key={experience.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900">{experience.title}</h4>
                    <p className="text-lg text-gray-700 mt-1">{experience.company}</p>
                    <p className="text-sm text-gray-600 mt-1">{experience.location}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(experience.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} 
                      {' - '}
                      {experience.current ? 'Present' : new Date(experience.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(experience)}
                      className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(experience.id)}
                      className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 whitespace-pre-line">{experience.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
