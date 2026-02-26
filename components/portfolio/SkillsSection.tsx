'use client';

import { useEffect, useState } from 'react';

interface Skill {
  id: string;
  name: string;
  category: string;
}

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch('/api/skills');
        if (res.ok) {
          const data = await res.json();
          setSkills(data);
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  if (loading) {
    return (
      <section id="skills" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse text-center text-gray-600 dark:text-gray-400">Loading skills...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Technologies and tools I work with
          </p>
        </div>

        {skills.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400">
            No skills added yet.
          </div>
        ) : (
          <div className="grid gap-8">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 capitalize">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {categorySkills.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
