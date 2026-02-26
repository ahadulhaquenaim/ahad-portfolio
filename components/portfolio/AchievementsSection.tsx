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
      <section id="achievements" className="py-20 bg-gradient-to-br from-gray-900 via-gray-950 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse text-center text-emerald-400 text-xl relative z-10">Loading achievements...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="achievements" className="py-20 bg-gradient-to-br from-gray-900 via-gray-950 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-down">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-400 bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>
          <div className="flex items-center gap-3 justify-center">
            <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-transparent rounded"></div>
            <p className="text-xl text-emerald-400/80">
              Notable accomplishments and milestones
            </p>
            <div className="h-1 w-16 bg-gradient-to-l from-emerald-500 to-transparent rounded"></div>
          </div>
        </div>

        {achievements.length === 0 ? (
          <div className="text-center text-emerald-400/70 text-lg">
            No achievements added yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
            {achievements.map((achievement, idx) => (
              <div
                key={achievement.id}
                className="group relative"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Glowing Border */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-1000 animate-pulse-glow"></div>

                <div className="relative bg-gray-900/90 backdrop-blur-xl border border-emerald-500/20 rounded-2xl overflow-hidden shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 group-hover:scale-105">
                  {/* Inner Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5"></div>

                  {achievement.imageUrl && (
                    <div className="relative w-full h-64 bg-gray-800 border-b border-emerald-500/20 overflow-hidden">
                      <Image
                        src={achievement.imageUrl}
                        alt={achievement.title}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Trophy Icon */}
                      <div className="absolute top-4 right-4 w-12 h-12 bg-emerald-500/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm border border-emerald-400/50">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  )}

                  <div className="relative p-6">
                    <div className="flex items-start justify-between mb-3 gap-4">
                      <h3 className="text-2xl font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors flex-1">
                        {achievement.title}
                      </h3>
                      <span className="text-sm text-gray-400 whitespace-nowrap flex items-center gap-1 bg-gray-800/50 px-3 py-1 rounded-full border border-emerald-500/20">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(achievement.date)}
                      </span>
                    </div>

                    <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mb-4"></div>

                    <p className="text-gray-300 leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.6;
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out 0.2s both;
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </section>
  );
}
