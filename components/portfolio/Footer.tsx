'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-black via-gray-950 to-gray-900 relative overflow-hidden border-t border-emerald-500/20">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div className="group">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              Portfolio
            </h3>
            <p className="text-gray-100 leading-relaxed">
              Thank you for visiting my portfolio. Feel free to reach out for collaborations or opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div className="group">
            <h3 className="text-2xl font-bold mb-4 text-emerald-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-100 hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2 group/link"
                >
                  <span className="w-0 h-0.5 bg-emerald-500 group-hover/link:w-4 transition-all duration-300 rounded-full"></span>
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-100 hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2 group/link"
                >
                  <span className="w-0 h-0.5 bg-emerald-500 group-hover/link:w-4 transition-all duration-300 rounded-full"></span>
                  Skills
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-100 hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2 group/link"
                >
                  <span className="w-0 h-0.5 bg-emerald-500 group-hover/link:w-4 transition-all duration-300 rounded-full"></span>
                  Experience
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('certifications')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-100 hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2 group/link"
                >
                  <span className="w-0 h-0.5 bg-emerald-500 group-hover/link:w-4 transition-all duration-300 rounded-full"></span>
                  Certifications
                </button>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="group">
            <h3 className="text-2xl font-bold mb-4 text-emerald-400">Connect</h3>
            <p className="text-gray-100 mb-4 leading-relaxed">
              Let&apos;s connect and create something amazing together.
            </p>
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 border border-emerald-500/30 rounded-lg flex items-center justify-center hover:bg-emerald-500/30 hover:border-emerald-400 transition-all duration-300 cursor-pointer hover:scale-110">
                <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <div className="w-10 h-10 bg-emerald-500/20 border border-emerald-500/30 rounded-lg flex items-center justify-center hover:bg-emerald-500/30 hover:border-emerald-400 transition-all duration-300 cursor-pointer hover:scale-110">
                <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <div className="w-10 h-10 bg-emerald-500/20 border border-emerald-500/30 rounded-lg flex items-center justify-center hover:bg-emerald-500/30 hover:border-emerald-400 transition-all duration-300 cursor-pointer hover:scale-110">
                <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-500/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-100 text-center md:text-left">
            &copy; {currentYear} Portfolio. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-gray-100">
            <span>Made with</span>
            <svg className="w-5 h-5 text-emerald-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span>and</span>
            <span className="text-emerald-400 font-semibold">Next.js</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </footer>
  );
}
