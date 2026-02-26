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
      <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-pulse text-gray-600 dark:text-gray-400">Loading...</div>
      </section>
    );
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            {profileImage ? (
              <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700">
                <Image
                  src={profileImage.imageUrl}
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="w-64 h-64 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center shadow-2xl">
                <span className="text-gray-500 dark:text-gray-400 text-lg">No Image</span>
              </div>
            )}
          </div>

          {/* Bio Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              {bio?.title || 'Welcome to My Portfolio'}
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              {bio?.content || 'Explore my work, skills, and achievements.'}
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => {
                  const element = document.getElementById('experience');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                View My Work
              </button>
              {resume && (
                <a
                  href={resume.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-lg hover:shadow-xl border-2 border-blue-600 dark:border-blue-400"
                >
                  Download Resume
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
