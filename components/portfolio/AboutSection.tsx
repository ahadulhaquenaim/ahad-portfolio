'use client';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-900 via-gray-950 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
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
              About Me
            </span>
          </h2>
          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-transparent rounded"></div>
            <p className="text-xl text-emerald-400/80">
              Get to know me better
            </p>
            <div className="h-1 w-16 bg-gradient-to-l from-emerald-500 to-transparent rounded"></div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto group animate-fade-in-up">
          {/* Glowing Border Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500 rounded-3xl blur opacity-50 group-hover:opacity-75 transition duration-1000 animate-pulse-glow"></div>

          <div className="relative bg-gray-900/90 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-8 md:p-12 shadow-2xl">
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5 rounded-3xl"></div>

            <div className="relative">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                This section provides additional context about my journey, interests, and what drives me in my professional career.
                The bio information from the hero section gives you an overview, and this space can be used to elaborate further.
              </p>

              {/* Decorative Quote */}
              <div className="mt-8 pt-6 border-t border-emerald-500/20">
                <p className="text-emerald-400 italic text-center">
                  &ldquo;Passionate about creating innovative solutions and continuous learning&rdquo;
                </p>
              </div>
            </div>
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

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.75;
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
