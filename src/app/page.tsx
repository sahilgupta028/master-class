"use client";
import React, { useState } from 'react';
import InputField from '@/components/InputField';

const IndexPage: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [videoLink, setVideoLink] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ title, description, videoLink });
    // Handle form submission logic here
  };

  return (
    <div className="container mx-auto p-6 w-full max-w-screen-xl">
      <h1 className="text-3xl font-semibold mb-8">Master Class Upload</h1>
      <form onSubmit={handleSubmit} className="mx-auto">
        <InputField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <InputField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <InputField label="Video Link" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default IndexPage;
