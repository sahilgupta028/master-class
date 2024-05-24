"use client";
import React, { useState } from 'react';
import InputField from '@/components/InputField';

const IndexPage: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [videoLink, setVideoLink] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!title || !description || !videoLink) {
      setError('All fields are required');
      setSuccess('');
      return;
    }

    setError(''); // Clear any previous errors
    setSuccess(''); // Clear any previous success messages

    try {
      // Mock API call
      const response = await fetch('/api/course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, videoLink }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      // Reset form fields after successful submission
      setTitle('');
      setDescription('');
      setVideoLink('');
      setSuccess('Video uploaded successfully');
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to submit the form');
      setSuccess('');
    }
  };

  return (
    <div className="container min-h-screen mx-auto p-6 w-full max-w-screen-md">
      <h1 className="text-3xl font-semibold mb-8 text-center">Admin Video Upload</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <div className="mb-4">
          <InputField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mb-4">
          <InputField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="mb-4">
          <InputField label="Video Link" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default IndexPage;
