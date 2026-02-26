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
      <section id="certifications" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse text-center text-gray-600 dark:text-gray-400">Loading certifications...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="certifications" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Certifications
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Professional certifications and credentials
          </p>
        </div>

        {certifications.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400">
            No certifications added yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
              >
                {cert.imageUrl && (
                  <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700">
                    <Image
                      src={cert.imageUrl}
                      alt={cert.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">
                    {cert.issuer}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {formatDate(cert.date)}
                  </p>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      View Credential
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
