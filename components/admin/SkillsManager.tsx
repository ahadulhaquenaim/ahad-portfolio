'use client';

import { useState } from 'react';

interface Skill {
  id: string;
  name: string;
  category: string;
}

export default function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([
    { id: '1', name: 'React', category: 'Frontend' },
    { id: '2', name: 'TypeScript', category: 'Language' },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentSkill) {
      // Update existing skill
      setSkills(skills.map(skill => 
        skill.id === currentSkill.id 
          ? { ...formData, id: currentSkill.id }
          : skill
      ));
      alert('Skill updated successfully!');
    } else {
      // Add new skill
      const newSkill: Skill = {
        id: Date.now().toString(),
        ...formData,
      };
      setSkills([...skills, newSkill]);
      alert('Skill added successfully!');
    }

    // Reset form
    setFormData({ name: '', category: '' });
    setCurrentSkill(null);
    setIsEditing(false);
  };

  const handleEdit = (skill: Skill) => {
    setCurrentSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
    });
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      setSkills(skills.filter(skill => skill.id !== id));
      alert('Skill deleted successfully!');
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', category: '' });
    setCurrentSkill(null);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills Management</h2>
        <p className="text-gray-600">Add, update, or delete your skills</p>
      </div>

      {/* Form */}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skill Name *
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
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
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {currentSkill ? 'Update Skill' : 'Add Skill'}
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

      {/* Skills List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Your Skills</h3>
        {skills.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No skills added yet. Add your first skill!</p>
        ) : (
          <div className="grid gap-4">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
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
