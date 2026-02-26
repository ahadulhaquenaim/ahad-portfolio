'use client';

import { useState, useEffect } from 'react';

interface Skill {
  id: string;
  name: string;
  category: string;
}

export default function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Fetch skills on mount
  useEffect(() => {
    fetchSkills();
  }, []);

  async function fetchSkills() {
    try {
      const res = await fetch('/api/skills');
      const data = await res.json();
      setSkills(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setFetching(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (currentSkill) {
        const res = await fetch(`/api/skills/${currentSkill.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          const updated = await res.json();
          setSkills(skills.map(s => s.id === currentSkill.id ? updated : s));
          alert('Skill updated successfully!');
        }
      } else {
        const res = await fetch('/api/skills', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          const newSkill = await res.json();
          setSkills([newSkill, ...skills]);
          alert('Skill added successfully!');
        }
      }
    } catch (error) {
      console.error('Error saving skill:', error);
      alert('Failed to save skill');
    } finally {
      setFormData({ name: '', category: '' });
      setCurrentSkill(null);
      setIsEditing(false);
      setLoading(false);
    }
  };

  const handleEdit = (skill: Skill) => {
    setCurrentSkill(skill);
    setFormData({ name: skill.name, category: skill.category });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      const res = await fetch(`/api/skills/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSkills(skills.filter(skill => skill.id !== id));
        alert('Skill deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting skill:', error);
      alert('Failed to delete skill');
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', category: '' });
    setCurrentSkill(null);
    setIsEditing(false);
  };

  if (fetching) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills Management</h2>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills Management</h2>
        <p className="text-gray-600">Add, update, or delete your skills</p>
      </div>

      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add New Skill
        </button>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {currentSkill ? 'Edit Skill' : 'Add New Skill'}
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., JavaScript, Python, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <input
              type="text"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Frontend, Backend, Database, etc."
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : currentSkill ? 'Update Skill' : 'Add Skill'}
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

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Your Skills</h3>
        {skills.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No skills added yet. Add your first skill!</p>
        ) : (
          <div className="grid gap-4">
            {skills.map((skill) => (
              <div key={skill.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900">{skill.name}</h4>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-gray-600">
                        <span className="font-medium">Category:</span> {skill.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(skill)}
                      className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id)}
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
