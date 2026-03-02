'use client';

import { useEffect, useState } from 'react';
import { Skill } from '@/types/admin';

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

  // Sort categories by the oldest skill's creation date
  const sortedCategories = Object.entries(groupedSkills).sort(([, skillsA], [, skillsB]) => {
    const oldestA = new Date(skillsA[0].createdAt || 0).getTime();
    const oldestB = new Date(skillsB[0].createdAt || 0).getTime();
    return oldestA - oldestB; // Oldest first
  });

  if (loading) {
    return (
      <section id="skills" className="py-20 bg-gradient-to-br from-black via-gray-950 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse text-center text-emerald-400 text-xl relative z-10">Loading skills...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-black via-gray-950 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-down">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-400 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>
          <div className="flex items-center gap-3 justify-center">
            <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-transparent rounded"></div>
            <p className="text-xl text-emerald-400/80">
              Technologies and tools I work with
            </p>
            <div className="h-1 w-16 bg-gradient-to-l from-emerald-500 to-transparent rounded"></div>
          </div>
        </div>

        {skills.length === 0 ? (
          <div className="text-center text-emerald-400/70 text-lg">
            No skills added yet.
          </div>
        ) : (
          <div className="grid gap-8 animate-fade-in-up">
            {sortedCategories.map(([category, categorySkills], idx) => (
              <div
                key={category}
                className="group relative"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Glowing Border */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-1000 animate-pulse-glow"></div>

                <div className="relative bg-gray-900/90 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-6 md:p-8 shadow-2xl">
                  {/* Inner Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5 rounded-2xl"></div>

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-2 h-8 bg-gradient-to-b from-emerald-500 to-green-500 rounded-full"></div>
                      <h3 className="text-xl md:text-2xl font-bold text-emerald-400 capitalize">
                        {category}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {categorySkills.map((skill) => (
                        <span
                          key={skill.id}
                          className="group/skill relative px-3 py-1.5 text-sm bg-gray-800/50 border border-emerald-500/30 rounded-full font-medium hover:bg-orange-500/20 hover:border-orange-400 transition-all duration-300 hover:scale-105 cursor-pointer shadow-sm hover:shadow-orange-500/50"
                        >
                          <span className="relative z-10 font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent group-hover/skill:from-yellow-300 group-hover/skill:via-orange-300 group-hover/skill:to-red-400 transition-all duration-300">
                            {skill.name}
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-red-500/10 opacity-0 group-hover/skill:opacity-100 rounded-full transition-opacity duration-300"></div>
                        </span>
                      ))}
                    </div>
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

        .delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </section>
  );
}
