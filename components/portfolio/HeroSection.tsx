'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ProfileImage {
  id: string;
  imageUrl: string;
  uploadedDate: string;
}

interface Bio {
  id: string;
  title: string;
  content: string;
}

interface Resume {
  id: string;
  fileName: string;
  fileUrl: string;
  uploadedDate: string;
}

export default function HeroSection() {
  const [bio, setBio] = useState<Bio | null>(null);
  const [profileImage, setProfileImage] = useState<ProfileImage | null>(null);
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bioRes, imageRes, resumeRes] = await Promise.all([
          fetch('/api/bio'),
          fetch('/api/profile-image'),
          fetch('/api/resume'),
        ]);

        if (bioRes.ok) {
          const bioData = await bioRes.json();
          setBio(bioData);
        }

        if (imageRes.ok) {
          const imageData = await imageRes.json();
          setProfileImage(imageData);
        }

        if (resumeRes.ok) {
          const resumeData = await resumeRes.json();
          setResume(resumeData);
        }
      } catch (error) {
        console.error('Error fetching hero data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-black to-emerald-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        <div className="animate-pulse text-emerald-400 text-xl font-semibold relative z-10">Loading amazing content...</div>
      </section>
    );
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-black to-emerald-950 relative overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        {/* Welcome Message */}
        <div className="text-center mb-8 animate-fade-in-down">
          <span className="inline-block px-6 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-semibold backdrop-blur-sm animate-glow">
            ✨ Welcome to My Digital Space
          </span>
        </div>

        {/* Main Card Container */}
        <div className="group relative animate-fade-in-up">
          {/* Glowing Border Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse-glow"></div>
          
          {/* Main Card */}
          <div className="relative bg-gray-900/90 backdrop-blur-xl border border-emerald-500/20 rounded-3xl shadow-2xl overflow-hidden">
            {/* Card Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5"></div>
            
            <div className="relative p-8 md:p-12">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Profile Image - Square with Neon Border */}
                <div className="flex-shrink-0 animate-float">
                  {profileImage ? (
                    <div className="relative group/img">
                      {/* Outer Glow */}
                      <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl blur-lg opacity-60 group-hover/img:opacity-100 transition duration-500 animate-pulse"></div>
                      
                      {/* Image Container */}
                      <div className="relative w-72 h-72 rounded-2xl overflow-hidden shadow-2xl border-4 border-emerald-500/50 group-hover/img:border-emerald-400 transition-all duration-500 group-hover/img:scale-105">
                        <Image
                          src={profileImage.imageUrl}
                          alt="Profile"
                          fill
                          className="object-cover"
                          priority
                        />
                        {/* Overlay Effect on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500"></div>
                      </div>
                      
                      {/* Corner Accents */}
                      <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-emerald-500 rounded-tl-lg"></div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-emerald-500 rounded-tr-lg"></div>
                      <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-emerald-500 rounded-bl-lg"></div>
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-emerald-500 rounded-br-lg"></div>
                    </div>
                  ) : (
                    <div className="w-72 h-72 rounded-2xl bg-gray-800 border-4 border-emerald-500/50 flex items-center justify-center shadow-2xl">
                      <span className="text-emerald-400 text-lg font-semibold">No Image</span>
                    </div>
                  )}
                </div>

                {/* Bio Content */}
                <div className="flex-1 text-center lg:text-left space-y-6">
                  {/* Title with Gradient */}
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 animate-slide-in-right">
                    <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-400 bg-clip-text text-transparent animate-gradient-x">
                      {bio?.title || 'Welcome to My Portfolio'}
                    </span>
                  </h1>

                  {/* Bio Description */}
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl animate-slide-in-right delay-200">
                    {bio?.content || 'Explore my work, skills, and achievements in this digital showcase.'}
                  </p>

                  {/* Decorative Line */}
                  <div className="flex items-center gap-4 justify-center lg:justify-start">
                    <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-transparent rounded"></div>
                    <div className="h-1 w-8 bg-emerald-500/50 rounded"></div>
                  </div>

                  {/* Call to Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4 animate-slide-in-right delay-300">
                    <button
                      onClick={() => {
                        const element = document.getElementById('experience');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="group/btn relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-bold text-lg overflow-hidden shadow-lg shadow-emerald-500/50 hover:shadow-emerald-500/80 transition-all duration-300 hover:scale-105"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        View My Work
                        <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </button>
                    
                    {resume && (
                      <a
                        href={resume.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn relative px-8 py-4 bg-transparent text-emerald-400 rounded-xl font-bold text-lg border-2 border-emerald-500 overflow-hidden shadow-lg hover:text-white transition-all duration-300 hover:scale-105 hover:border-emerald-400"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download Resume
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      </a>
                    )}
                  </div>

                  {/* Social Proof / Stats Badges */}
                  <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-6 animate-slide-in-right delay-400">
                    <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg backdrop-blur-sm">
                      <span className="text-emerald-400 font-semibold text-sm">💼 Open to Work</span>
                    </div>
                    <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg backdrop-blur-sm">
                      <span className="text-emerald-400 font-semibold text-sm">🚀 Fast Learner</span>
                    </div>
                    <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg backdrop-blur-sm">
                      <span className="text-emerald-400 font-semibold text-sm">⚡ Problem Solver</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-16 animate-bounce">
          <div className="text-emerald-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
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

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.75;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(16, 185, 129, 0.6), 0 0 60px rgba(16, 185, 129, 0.4);
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 3s ease infinite;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .delay-700 {
          animation-delay: 0.7s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}
