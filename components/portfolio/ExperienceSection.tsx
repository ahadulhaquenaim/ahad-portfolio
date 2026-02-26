'use client';

import { useEffect, useState } from 'react';

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

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await fetch('/api/experiences');
        if (res.ok) {
          const data = await res.json();
          setExperiences(data);
        }
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  if (loading) {
    return (
      <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse text-center text-gray-600 dark:text-gray-400">Loading experience...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Work Experience
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            My professional journey
          </p>
        </div>

        {experiences.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400">
            No experience added yet.
          </div>
        ) : (
          <div className="space-y-8">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {exp.title}
                    </h3>
                    <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-1">
                      {exp.company}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {exp.location}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
