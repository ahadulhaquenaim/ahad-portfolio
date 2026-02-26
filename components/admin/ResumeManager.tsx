'use client';

import { useState, useEffect } from 'react';

interface Resume {
  id: string;
  fileName: string;
  fileUrl: string;
  uploadedDate: string;
}

export default function ResumeManager() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [resumeUrl, setResumeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchResume();
  }, []);

  async function fetchResume() {
    try {
      const res = await fetch('/api/resume');
      const data = await res.json();
      if (data?.id) {
        setResumes([data]);
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
    } finally {
      setFetching(false);
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      alert('Please upload a PDF file');
      return;
    }

    setLoading(true);
    try {
      const uploadRes = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        body: file,
      });
      const { url } = await uploadRes.json();

      const saveRes = await fetch('/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name, fileUrl: url }),
      });

      if (saveRes.ok) {
        const newResume = await saveRes.json();
        setResumes([newResume]);
        alert('Resume uploaded successfully!');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload resume');
    } finally {
      setLoading(false);
    }
  };

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeUrl) {
      alert('Please enter a valid URL');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: 'Resume from URL', fileUrl: resumeUrl }),
      });

      if (res.ok) {
        const newResume = await res.json();
        setResumes([newResume]);
        setResumeUrl('');
        alert('Resume URL saved successfully!');
      }
    } catch (error) {
      console.error('Error saving resume URL:', error);
      alert('Failed to save resume URL');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resume?')) return;

    setLoading(true);
    try {
      const resume = resumes.find(r => r.id === id);
      if (resume?.fileUrl?.includes('blob.vercel-storage.com')) {
        await fetch('/api/upload', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: resume.fileUrl }),
        });
      }

      const res = await fetch('/api/resume', { method: 'DELETE' });
      if (res.ok) {
        setResumes([]);
        alert('Resume deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting resume:', error);
      alert('Failed to delete resume');
    } finally {
      setLoading(false);
    }
  };

  const handleView = (fileUrl: string) => {
    window.open(fileUrl, '_blank');
  };

  if (fetching) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Resume Management</h2>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Resume Management</h2>
        <p className="text-gray-600">Upload or set your resume file (PDF only)</p>
      </div>

      {resumes.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Resume</h3>
          {resumes.map((resume) => (
            <div key={resume.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-red-100 rounded-lg p-3">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{resume.fileName}</p>
                  <p className="text-sm text-gray-500">Uploaded: {new Date(resume.uploadedDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleView(resume.fileUrl)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  View
                </button>
                <button onClick={() => handleDelete(resume.id)} disabled={loading} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50">
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {resumes.length > 0 ? 'Upload New Resume (will replace current)' : 'Upload Resume'}
          </h3>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="mt-4">
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    {loading ? 'Uploading...' : 'Upload PDF Resume'}
                  </span>
                  <input id="resume-upload" type="file" className="sr-only" accept=".pdf,application/pdf" onChange={handleFileUpload} disabled={loading} />
                </label>
              </div>
              <p className="mt-2 text-xs text-gray-500">PDF files only, up to 10MB</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Or enter resume URL</h3>
          <form onSubmit={handleUrlSubmit} className="space-y-4">
            <div>
              <input
                type="url"
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                placeholder="https://example.com/resume.pdf"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="mt-1 text-xs text-gray-500">Enter a direct link to your resume PDF file</p>
            </div>
            <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Resume URL'}
            </button>
          </form>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-2">💡 Tips</h4>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>Keep your resume updated with your latest experiences and skills</li>
          <li>Use a professional format and keep it to 1-2 pages</li>
          <li>Only PDF format is supported for consistency across devices</li>
          <li>You can only have one active resume at a time</li>
        </ul>
      </div>
    </div>
  );
}
