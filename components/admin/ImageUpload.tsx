'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ImageUpload() {
  const [imageUrl, setImageUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // In production, you would upload to a server and get back a URL
      // For now, we'll simulate this
      console.log('File selected:', file.name);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPreviewUrl(imageUrl);
    // In production, this would save to database
    console.log('Image URL saved:', imageUrl);
    alert('Image URL saved successfully!');
  };

  const handleDelete = () => {
    setImageUrl('');
    setPreviewUrl('');
    alert('Image deleted successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Image</h2>
        <p className="text-gray-600">Upload or set your profile image URL</p>
      </div>

      {/* Image Preview */}
      {previewUrl && (
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-gray-200">
            <Image
              src={previewUrl}
              alt="Profile preview"
              fill
              className="object-cover"
            />
          </div>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Delete Image
          </button>
        </div>
      )}

      {/* File Upload */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="mt-4">
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Upload Image
              </span>
              <input
                id="file-upload"
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <p className="mt-2 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>

      {/* URL Input */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Or enter image URL</h3>
        <form onSubmit={handleUrlSubmit} className="space-y-4">
          <div>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Image URL
          </button>
        </form>
      </div>
    </div>
  );
}
