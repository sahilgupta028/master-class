"use client";
import React, { useState } from 'react';
import InputField from '@/components/InputField';

const IndexPage: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    videoLink: '',
    categoryName: '',
    courseName: '',
    batch: '',
    isActive: true,
    courseType: '',
    orderNo: '',
    price: '',
    imageUrl: '',
    emiMode: false,
    numberOfEmi: '',
    zoomLink: '',
    zoomId: '',
    zoomPassword: '',
    youtubeLink: '',
    videoDescription: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title, videoDescription, videoLink } = formData;
    if (!title || !videoDescription || !videoLink) {
      setError('Title, description, and video link are required');
      setSuccess('');
      return;
    }

    setError('');
    setSuccess('');

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
        videoLink: '',
        categoryName: '',
        courseName: '',
        batch: '',
        isActive: true,
        courseType: '',
        orderNo: '',
        price: '',
        imageUrl: '',
        emiMode: false,
        numberOfEmi: '',
        zoomLink: '',
        zoomId: '',
        zoomPassword: '',
        youtubeLink: '',
        videoDescription: ''
      });
      setSuccess('Video uploaded successfully');
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to submit the form');
      setSuccess('');
    }
  };

  return (
    <div className="container min-h-screen mx-auto p-6 w-full max-w-screen-lg">
      <h1 className="text-3xl font-semibold mb-8 text-center text-gray-800">Admin Video Upload</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 space-y-6">
        {error && <p className="text-red-600 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Title" value={formData.title} onChange={handleChange('title')} />
          <InputField label="Video Link" value={formData.videoLink} onChange={handleChange('videoLink')} />
          <InputField label="Category Name" value={formData.categoryName} onChange={handleChange('categoryName')} />
          <InputField label="Course Name" value={formData.courseName} onChange={handleChange('courseName')} />
          <InputField label="Batch" value={formData.batch} onChange={handleChange('batch')} />
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={handleChange('isActive')}
              className="mr-2 leading-tight"
            />
            <label className="block text-gray-700 text-sm font-bold">Active</label>
          </div>
          <InputField label="Course Type" value={formData.courseType} onChange={handleChange('courseType')} />
          <InputField label="Order No." value={formData.orderNo} onChange={handleChange('orderNo')} />
          <InputField label="Price" value={formData.price} onChange={handleChange('price')} />
          <InputField label="Image URL" value={formData.imageUrl} onChange={handleChange('imageUrl')} />
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={formData.emiMode}
              onChange={handleChange('emiMode')}
              className="mr-2 leading-tight"
            />
            <label className="block text-gray-700 text-sm font-bold">EMI Mode</label>
          </div>
          <InputField label="No. of EMI" value={formData.numberOfEmi} onChange={handleChange('numberOfEmi')} />
          <InputField label="Zoom Link" value={formData.zoomLink} onChange={handleChange('zoomLink')} />
          <InputField label="Zoom ID" value={formData.zoomId} onChange={handleChange('zoomId')} />
          <InputField label="Zoom Password" value={formData.zoomPassword} onChange={handleChange('zoomPassword')} />
          <InputField label="YouTube Link" value={formData.youtubeLink} onChange={handleChange('youtubeLink')} />
          <InputField label="Video Description" value={formData.videoDescription} onChange={handleChange('videoDescription')} type="textarea" />
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
