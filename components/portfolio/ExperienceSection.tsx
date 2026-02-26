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
      <section id="experience" className="py-20 bg-gradient-to-br from-gray-900 via-gray-950 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse text-center text-emerald-400 text-xl relative z-10">Loading experience...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-gray-900 via-gray-950 to-black relative overflow-hidden">
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
              Work Experience
            </span>
          </h2>
          <div className="flex items-center gap-3 justify-center">
            <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-transparent rounded"></div>
            <p className="text-xl text-emerald-400/80">
              My professional journey
            </p>
            <div className="h-1 w-16 bg-gradient-to-l from-emerald-500 to-transparent rounded"></div>
          </div>
        </div>

        {experiences.length === 0 ? (
          <div className="text-center text-emerald-400/70 text-lg">
            No experience added yet.
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in-up">
            {experiences.map((exp, idx) => (
              <div
                key={exp.id}
                className="group relative"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Glowing Border */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-1000 animate-pulse-glow"></div>

                <div className="relative bg-gray-900/90 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-6 md:p-8 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 cursor-pointer">
                  {/* Inner Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5 rounded-2xl"></div>

                  <div className="relative">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-4">
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-bold text-emerald-400 mb-2">
                          {exp.title}
                        </h3>
                        <p className="text-lg md:text-xl text-green-300 font-semibold mb-1">
                          {exp.company}
                        </p>
                        <p className="text-gray-400 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {exp.location}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="inline-block px-5 py-2.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-full text-sm font-bold shadow-sm shadow-emerald-500/30">
                          {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-emerald-500/20">
                      <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                        {exp.description}
                      </p>
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

        .delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </section>
  );
}
