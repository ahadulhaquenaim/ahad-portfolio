'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  imageUrl: string;
}

export default function CertificationsSection() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const res = await fetch('/api/certifications');
        if (res.ok) {
          const data = await res.json();
          setCertifications(data);
        }
      } catch (error) {
        console.error('Error fetching certifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  if (loading) {
    return (
      <section id="certifications" className="py-20 bg-gradient-to-br from-black via-gray-950 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse text-center text-emerald-400 text-xl relative z-10">Loading certifications...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="certifications" className="py-20 bg-gradient-to-br from-black via-gray-950 to-gray-900 relative overflow-hidden">
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
              Certifications
            </span>
          </h2>
          <div className="flex items-center gap-3 justify-center">
            <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-transparent rounded"></div>
            <p className="text-xl text-emerald-400/80">
              Professional certifications and credentials
            </p>
            <div className="h-1 w-16 bg-gradient-to-l from-emerald-500 to-transparent rounded"></div>
          </div>
        </div>

        {certifications.length === 0 ? (
          <div className="text-center text-emerald-400/70 text-lg">
            No certifications added yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
            {certifications.map((cert, idx) => (
              <div
                key={cert.id}
                className="group relative"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Glowing Border */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-1000 animate-pulse-glow"></div>

                <div className="relative bg-gray-900/90 backdrop-blur-xl border border-emerald-500/20 rounded-2xl overflow-hidden shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 group-hover:scale-105">
                  {/* Inner Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-green-500/5"></div>

                  {cert.imageUrl && (
                    <div className="relative w-full h-48 bg-gray-800 border-b border-emerald-500/20 overflow-hidden">
                      <Image
                        src={cert.imageUrl}
                        alt={cert.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  )}

                  <div className="relative p-6">
                    <h3 className="text-xl font-bold text-emerald-400 mb-2 group-hover:text-emerald-300 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-green-300 font-semibold mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      {cert.issuer}
                    </p>
                    <p className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(cert.date)}
                    </p>

                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-green-600 transition-all duration-300 shadow-sm hover:shadow-emerald-500/50 group-hover:scale-105"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View Credential
                      </a>
                    )}
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
