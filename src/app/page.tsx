"use client";
import React, { useState } from 'react';
import InputField from '@/components/InputField';

const IndexPage: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageLink: '',
    coursePrice: '',
    premiumPrice: '',
    tags: '',
    downloadLink: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title, description, imageLink, coursePrice, premiumPrice, tags, downloadLink } = formData;
    if (!title || !description || !imageLink || !coursePrice || !premiumPrice || !tags || !downloadLink) {
      setError('All fields are required');
      setSuccess('');
      return;
    }

    setError('');
    setSuccess('');

    console.log(formData);

    try {
      const response = await fetch('/api/course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);

      setFormData({
        title: '',
        description: '',
        imageLink: '',
        coursePrice: '',
        premiumPrice: '',
        tags: '',
        downloadLink: ''
      });
      setSuccess('Course uploaded successfully');
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to submit the form');
      setSuccess('');
    }
  };

  return (
    <div className="container min-h-screen mx-auto p-4 sm:p-6 md:p-8 w-full max-w-screen-lg">
      <h1 className="text-3xl font-semibold mb-8 text-center text-gray-800">Admin Course Upload</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 sm:p-8 space-y-6">
        {error && <p className="text-red-600 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}
        <div className="grid grid-cols-1 gap-6">
          <InputField
            label="Title"
            value={formData.title}
            onChange={handleChange('title')}
            placeholder="Enter the course title"
          />
          <InputField
            label="Description"
            value={formData.description}
            onChange={handleChange('description')}
            type="textarea"
            placeholder="Enter the course description"
          />
          <InputField
            label="Image Link"
            value={formData.imageLink}
            onChange={handleChange('imageLink')}
            placeholder="Enter the image URL"
          />
          <InputField
            label="Course Price"
            value={formData.coursePrice}
            onChange={handleChange('coursePrice')}
            placeholder="Enter the course price in ₹"
          />
          <InputField
            label="Premium Price"
            value={formData.premiumPrice}
            onChange={handleChange('premiumPrice')}
            placeholder="Enter the premium price in ₹"
          />
          <div>
            <label className="block text-gray-700 font-bold mb-2">Tags</label>
            <select
              value={formData.tags}
              onChange={handleChange('tags')}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select a tag</option>
              <option value="Software">Software</option>
              <option value="Courses">Courses</option>
              <option value="Premium Graphics">Premium Graphics</option>
              <option value="Influencer Media">Influencer Media</option>
              <option value="Extra Premium">Extra Premium</option>
            </select>
          </div>
          <InputField
            label="Download Link"
            value={formData.downloadLink}
            onChange={handleChange('downloadLink')}
            placeholder="Enter the download link"
          />
        </div>
        <div className="flex justify-center mt-6">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default IndexPage;
