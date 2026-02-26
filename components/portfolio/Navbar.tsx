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
    const sections = ['hero', 'about', 'skills', 'experience', 'certifications', 'achievements', 'sports'];

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
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(16,185,129,0.15)] border-b border-gray-200/50 dark:border-emerald-500/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0">
            <button
              onClick={() => scrollToSection('hero')}
              className="group relative text-3xl font-bold bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 dark:from-emerald-300 dark:via-green-300 dark:to-emerald-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(16,185,129,0.6)] cursor-pointer"
            >
              Portfolio
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] rounded-full group-hover:w-full transition-all duration-300"></span>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              <button
                onClick={() => scrollToSection('about')}
                className={`relative px-5 py-2.5 rounded-xl text-base font-bold transition-all duration-300 transform cursor-pointer ${
                  activeSection === 'about'
                    ? 'text-white bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 shadow-[0_0_25px_rgba(16,185,129,0.6),0_0_40px_rgba(16,185,129,0.3)] scale-105 border border-emerald-400/50'
                    : 'text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] border border-transparent'
                }`}
              >
                About
                {activeSection === 'about' && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
                )}
              </button>
              <button
                onClick={() => scrollToSection('skills')}
                className={`relative px-5 py-2.5 rounded-xl text-base font-bold transition-all duration-300 transform cursor-pointer ${
                  activeSection === 'skills'
                    ? 'text-white bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 shadow-[0_0_25px_rgba(16,185,129,0.6),0_0_40px_rgba(16,185,129,0.3)] scale-105 border border-emerald-400/50'
                    : 'text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] border border-transparent'
                }`}
              >
                Skills
                {activeSection === 'skills' && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
                )}
              </button>
              <button
                onClick={() => scrollToSection('experience')}
                className={`relative px-5 py-2.5 rounded-xl text-base font-bold transition-all duration-300 transform cursor-pointer ${
                  activeSection === 'experience'
                    ? 'text-white bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 shadow-[0_0_25px_rgba(16,185,129,0.6),0_0_40px_rgba(16,185,129,0.3)] scale-105 border border-emerald-400/50'
                    : 'text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] border border-transparent'
                }`}
              >
                Experience
                {activeSection === 'experience' && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
                )}
              </button>
              <button
                onClick={() => scrollToSection('certifications')}
                className={`relative px-5 py-2.5 rounded-xl text-base font-bold transition-all duration-300 transform cursor-pointer ${
                  activeSection === 'certifications'
                    ? 'text-white bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 shadow-[0_0_25px_rgba(16,185,129,0.6),0_0_40px_rgba(16,185,129,0.3)] scale-105 border border-emerald-400/50'
                    : 'text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] border border-transparent'
                }`}
              >
                Certifications
                {activeSection === 'certifications' && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
                )}
              </button>
              <button
                onClick={() => scrollToSection('achievements')}
                className={`relative px-5 py-2.5 rounded-xl text-base font-bold transition-all duration-300 transform cursor-pointer ${
                  activeSection === 'achievements'
                    ? 'text-white bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 shadow-[0_0_25px_rgba(16,185,129,0.6),0_0_40px_rgba(16,185,129,0.3)] scale-105 border border-emerald-400/50'
                    : 'text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] border border-transparent'
                }`}
              >
                Achievements
                {activeSection === 'achievements' && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
                )}
              </button>
              <button
                onClick={() => scrollToSection('sports')}
                className={`relative px-5 py-2.5 rounded-xl text-base font-bold transition-all duration-300 transform cursor-pointer ${
                  activeSection === 'sports'
                    ? 'text-white bg-gradient-to-r from-blue-500 via-orange-500 to-blue-600 shadow-[0_0_25px_rgba(59,130,246,0.6),0_0_40px_rgba(249,115,22,0.3)] scale-105 border border-blue-400/50'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-transparent'
                }`}
              >
                Sports
                {activeSection === 'sports' && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-blue-400 via-orange-400 to-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.9)]" />
                )}
              </button>
              <Link
                href="/admin"
                className={`relative px-5 py-2.5 rounded-xl text-base font-bold transition-all duration-300 transform cursor-pointer ${
                  pathname === '/admin'
                    ? 'text-white bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 shadow-[0_0_25px_rgba(16,185,129,0.6),0_0_40px_rgba(16,185,129,0.3)] scale-105 border border-emerald-400/50'
                    : 'text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] border border-transparent'
                }`}
              >
                Admin
                {pathname === '/admin' && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
                )}
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] border border-transparent hover:border-emerald-500/30 cursor-pointer"
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
        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(16,185,129,0.2)] border-t border-gray-200 dark:border-emerald-500/20 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
            <button
              onClick={() => scrollToSection('about')}
              className={`block w-full text-left px-5 py-3.5 rounded-xl text-lg font-bold transition-all duration-300 cursor-pointer ${
                activeSection === 'about'
                  ? 'text-white bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 shadow-[0_0_25px_rgba(16,185,129,0.6)] border-l-4 border-emerald-300'
                  : 'text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 border-l-4 border-transparent hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:border-l-emerald-500'
              }`}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className={`block w-full text-left px-5 py-3.5 rounded-xl text-lg font-bold transition-all duration-300 cursor-pointer ${
                activeSection === 'skills'
                  ? 'text-white bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 shadow-[0_0_25px_rgba(16,185,129,0.6)] border-l-4 border-emerald-300'
                  : 'text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 border-l-4 border-transparent hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:border-l-emerald-500'
              }`}
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              className={`block w-full text-left px-5 py-3.5 rounded-xl text-lg font-bold transition-all duration-300 cursor-pointer ${
                activeSection === 'experience'
                  ? 'text-white bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 shadow-[0_0_25px_rgba(16,185,129,0.6)] border-l-4 border-emerald-300'
                  : 'text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 border-l-4 border-transparent hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:border-l-emerald-500'
              }`}
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection('certifications')}
              className={`block w-full text-left px-5 py-3.5 rounded-xl text-lg font-bold transition-all duration-300 cursor-pointer ${
                activeSection === 'certifications'
                  ? 'text-white bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 shadow-[0_0_25px_rgba(16,185,129,0.6)] border-l-4 border-emerald-300'
                  : 'text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 border-l-4 border-transparent hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:border-l-emerald-500'
              }`}
            >
              Certifications
            </button>
            <button
              onClick={() => scrollToSection('achievements')}
              className={`block w-full text-left px-5 py-3.5 rounded-xl text-lg font-bold transition-all duration-300 cursor-pointer ${
                activeSection === 'achievements'
                  ? 'text-white bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 shadow-[0_0_25px_rgba(16,185,129,0.6)] border-l-4 border-emerald-300'
                  : 'text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 border-l-4 border-transparent hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:border-l-emerald-500'
              }`}
            >
              Achievements
            </button>
            <button
              onClick={() => scrollToSection('sports')}
              className={`block w-full text-left px-5 py-3.5 rounded-xl text-lg font-bold transition-all duration-300 cursor-pointer ${
                activeSection === 'sports'
                  ? 'text-white bg-gradient-to-r from-blue-500 via-orange-500 to-blue-600 shadow-[0_0_25px_rgba(59,130,246,0.6),0_0_40px_rgba(249,115,22,0.3)] border-l-4 border-blue-300'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 border-l-4 border-transparent hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:border-l-blue-500'
              }`}
            >
              Sports
            </button>
            <Link
              href="/admin"
              className={`block w-full text-left px-5 py-3.5 rounded-xl text-lg font-bold transition-all duration-300 cursor-pointer ${
                pathname === '/admin'
                  ? 'text-white bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 shadow-[0_0_25px_rgba(16,185,129,0.6)] border-l-4 border-emerald-300'
                  : 'text-gray-700 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 border-l-4 border-transparent hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:border-l-emerald-500'
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
