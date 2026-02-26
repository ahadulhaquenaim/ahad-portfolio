'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'experience', 'certifications', 'achievements'];

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-800/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0">
            <button
              onClick={() => scrollToSection('hero')}
              className="group relative text-3xl font-bold bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 dark:from-cyan-300 dark:via-pink-400 dark:to-purple-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
            >
              Portfolio
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)] group-hover:w-full transition-all duration-300"></span>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              <button
                onClick={() => scrollToSection('about')}
                className={`relative px-5 py-2.5 rounded-lg text-base font-bold transition-all duration-300 transform ${
                  activeSection === 'about'
                    ? 'text-white bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-600 shadow-[0_0_20px_rgba(236,72,153,0.6)] scale-105'
                    : 'text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-[0_0_10px_rgba(236,72,153,0.3)]'
                }`}
              >
                About
                {activeSection === 'about' && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
                )}
              </button>
              <button
                onClick={() => scrollToSection('skills')}
                className={`relative px-5 py-2.5 rounded-lg text-base font-bold transition-all duration-300 transform ${
                  activeSection === 'skills'
                    ? 'text-white bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-600 shadow-[0_0_20px_rgba(236,72,153,0.6)] scale-105'
                    : 'text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-[0_0_10px_rgba(236,72,153,0.3)]'
                }`}
              >
                Skills
                {activeSection === 'skills' && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
                )}
              </button>
              <button
                onClick={() => scrollToSection('experience')}
                className={`relative px-5 py-2.5 rounded-lg text-base font-bold transition-all duration-300 transform ${
                  activeSection === 'experience'
                    ? 'text-white bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-600 shadow-[0_0_20px_rgba(236,72,153,0.6)] scale-105'
                    : 'text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-[0_0_10px_rgba(236,72,153,0.3)]'
                }`}
              >
                Experience
                {activeSection === 'experience' && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
                )}
              </button>
              <button
                onClick={() => scrollToSection('certifications')}
                className={`relative px-5 py-2.5 rounded-lg text-base font-bold transition-all duration-300 transform ${
                  activeSection === 'certifications'
                    ? 'text-white bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-600 shadow-[0_0_20px_rgba(236,72,153,0.6)] scale-105'
                    : 'text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-[0_0_10px_rgba(236,72,153,0.3)]'
                }`}
              >
                Certifications
                {activeSection === 'certifications' && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
                )}
              </button>
              <button
                onClick={() => scrollToSection('achievements')}
                className={`relative px-5 py-2.5 rounded-lg text-base font-bold transition-all duration-300 transform ${
                  activeSection === 'achievements'
                    ? 'text-white bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-600 shadow-[0_0_20px_rgba(236,72,153,0.6)] scale-105'
                    : 'text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-[0_0_10px_rgba(236,72,153,0.3)]'
                }`}
              >
                Achievements
                {activeSection === 'achievements' && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
                )}
              </button>
              <Link
                href="/admin"
                className={`relative px-5 py-2.5 rounded-lg text-base font-bold transition-all duration-300 transform ${
                  pathname === '/admin'
                    ? 'text-white bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-600 shadow-[0_0_20px_rgba(236,72,153,0.6)] scale-105'
                    : 'text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-[0_0_10px_rgba(236,72,153,0.3)]'
                }`}
              >
                Admin
                {pathname === '/admin' && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
                )}
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 hover:shadow-[0_0_10px_rgba(236,72,153,0.3)]"
              aria-label="Toggle menu"
            >
              <svg
                className={`h-7 w-7 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-t border-gray-200 dark:border-gray-800 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
            <button
              onClick={() => scrollToSection('about')}
              className={`block w-full text-left px-5 py-3.5 rounded-lg text-lg font-bold transition-all duration-300 ${
                activeSection === 'about'
                  ? 'text-white bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-600 shadow-[0_0_20px_rgba(236,72,153,0.6)] border-l-4 border-cyan-300'
                  : 'text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-800 border-l-4 border-transparent hover:shadow-[0_0_10px_rgba(236,72,153,0.3)]'
              }`}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className={`block w-full text-left px-5 py-3.5 rounded-lg text-lg font-bold transition-all duration-300 ${
                activeSection === 'skills'
                  ? 'text-white bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-600 shadow-[0_0_20px_rgba(236,72,153,0.6)] border-l-4 border-cyan-300'
                  : 'text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-800 border-l-4 border-transparent hover:shadow-[0_0_10px_rgba(236,72,153,0.3)]'
              }`}
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              className={`block w-full text-left px-5 py-3.5 rounded-lg text-lg font-bold transition-all duration-300 ${
                activeSection === 'experience'
                  ? 'text-white bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-600 shadow-[0_0_20px_rgba(236,72,153,0.6)] border-l-4 border-cyan-300'
                  : 'text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-800 border-l-4 border-transparent hover:shadow-[0_0_10px_rgba(236,72,153,0.3)]'
              }`}
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection('certifications')}
              className={`block w-full text-left px-5 py-3.5 rounded-lg text-lg font-bold transition-all duration-300 ${
                activeSection === 'certifications'
                  ? 'text-white bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-600 shadow-[0_0_20px_rgba(236,72,153,0.6)] border-l-4 border-cyan-300'
                  : 'text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-800 border-l-4 border-transparent hover:shadow-[0_0_10px_rgba(236,72,153,0.3)]'
              }`}
            >
              Certifications
            </button>
            <button
              onClick={() => scrollToSection('achievements')}
              className={`block w-full text-left px-5 py-3.5 rounded-lg text-lg font-bold transition-all duration-300 ${
                activeSection === 'achievements'
                  ? 'text-white bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-600 shadow-[0_0_20px_rgba(236,72,153,0.6)] border-l-4 border-cyan-300'
                  : 'text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-800 border-l-4 border-transparent hover:shadow-[0_0_10px_rgba(236,72,153,0.3)]'
              }`}
            >
              Achievements
            </button>
            <Link
              href="/admin"
              className={`block w-full text-left px-5 py-3.5 rounded-lg text-lg font-bold transition-all duration-300 ${
                pathname === '/admin'
                  ? 'text-white bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-600 shadow-[0_0_20px_rgba(236,72,153,0.6)] border-l-4 border-cyan-300'
                  : 'text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-gray-800 border-l-4 border-transparent hover:shadow-[0_0_10px_rgba(236,72,153,0.3)]'
              }`}
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
