'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
}

export default function AchievementsSection() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await fetch('/api/achievements');
        if (res.ok) {
          const data = await res.json();
          setAchievements(data);
        }
      } catch (error) {
        console.error('Error fetching achievements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <section id="achievements" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse text-center text-gray-600 dark:text-gray-400">Loading achievements...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="achievements" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Achievements
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Notable accomplishments and milestones
          </p>
        </div>

        {achievements.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400">
            No achievements added yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
              >
                {achievement.imageUrl && (
                  <div className="relative w-full h-56 bg-gray-200 dark:bg-gray-700">
                    <Image
                      src={achievement.imageUrl}
                      alt={achievement.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {achievement.title}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-4">
                      {formatDate(achievement.date)}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
