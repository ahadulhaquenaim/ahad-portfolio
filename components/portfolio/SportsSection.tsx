'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Sport } from '@/types/admin';

export default function SportsSection() {
  const [sports, setSports] = useState<Sport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const res = await fetch('/api/sports');
        if (res.ok) {
          const data = await res.json();
          setSports(data);
        }
      } catch (error) {
        console.error('Error fetching sports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSports();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Group sports by category
  const badmintonSports = sports.filter(sport => sport.category === 'Badminton');
  const cricketSports = sports.filter(sport => sport.category === 'Cricket');
  const footballSports = sports.filter(sport => sport.category === 'Football');

  const categories = [
    { name: 'Badminton', sports: badmintonSports, color: 'from-blue-500 to-cyan-500' },
    { name: 'Cricket', sports: cricketSports, color: 'from-green-500 to-emerald-500' },
    { name: 'Football', sports: footballSports, color: 'from-orange-500 to-red-500' },
  ];

  if (loading) {
    return (
      <section id="sports" className="py-20 bg-gradient-to-br from-gray-900 via-gray-950 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse text-center text-blue-400 text-xl relative z-10">Loading sports...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="sports" className="py-20 bg-gradient-to-br from-gray-900 via-gray-950 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-down">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-orange-300 to-blue-400 bg-clip-text text-transparent">
              Sports
            </span>
          </h2>
          <div className="flex items-center gap-3 justify-center">
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-transparent rounded"></div>
            <p className="text-xl text-blue-400/80">
              Memories, moments & awards from the field
            </p>
            <div className="h-1 w-16 bg-gradient-to-l from-blue-500 to-transparent rounded"></div>
          </div>
        </div>

        {sports.length === 0 ? (
          <div className="text-center text-blue-400/70 text-lg">
            No sports memories added yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {categories.map((category, categoryIdx) => (
              <div key={category.name} className="space-y-6 px-2 lg:px-3">
                {/* Category Header */}
                <div className="text-center mb-8">
                  <h3 className={`text-3xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent mb-2`}>
                    {category.name}
                  </h3>
                  <div className={`h-1 w-24 mx-auto bg-gradient-to-r ${category.color} rounded-full`}></div>
                </div>

                {/* Sports in this category */}
                {category.sports.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    No {category.name.toLowerCase()} memories yet.
                  </div>
                ) : (
                  <div className="space-y-6">
                    {category.sports.map((sport, idx) => (
                      <div
                        key={sport.id}
                        className="group relative"
                        style={{ animationDelay: `${(categoryIdx * 0.1) + (idx * 0.1)}s` }}
                      >
                        {/* Glowing Border */}
                        <div className={`absolute -inset-0.5 bg-gradient-to-r ${category.color} rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-1000 animate-pulse-glow`}></div>

                        <div className="relative bg-gray-900/90 backdrop-blur-xl border border-blue-500/20 rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 group-hover:scale-105 cursor-pointer">
                          {/* Inner Glow */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-orange-500/5"></div>

                          {sport.imageUrl && (
                            <div className="relative w-full h-48 bg-gray-800 border-b border-blue-500/20 overflow-hidden">
                              <Image
                                src={sport.imageUrl}
                                alt={sport.title}
                                fill
                                className="object-contain group-hover:scale-110 transition-transform duration-500"
                              />
                              {/* Overlay on hover */}
                              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                              {/* Medal Icon */}
                              <div className={`absolute top-4 right-4 w-10 h-10 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/50`}>
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                              </div>
                            </div>
                          )}

                          <div className="relative p-5">
                            <div className="mb-3">
                              <h4 className={`text-xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent mb-2`}>
                                {sport.title}
                              </h4>
                              <span className="text-xs text-gray-400 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {formatDate(sport.date)}
                              </span>
                            </div>

                            <div className={`h-0.5 w-12 bg-gradient-to-r ${category.color} rounded-full mb-3`}></div>

                            <p className="text-gray-100 text-sm leading-relaxed">
                              {sport.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
