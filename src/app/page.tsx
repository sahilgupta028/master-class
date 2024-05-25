"use client";
import React, { useState } from 'react';
import InputField from '@/components/InputField';

const IndexPage: React.FC = () => {
  const [formData, setFormData] = useState({
    courseTitle: '',
    courseDescription: '',
    price: '',
    totalApplied: '',
    downloadSyllabus: '',
    courseType: '',
    startDate: '',
    endDate: '',
    duration: '',
    aboutCourse: '',
    tools: ['']
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (field: keyof typeof formData, index?: number) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (field === 'tools' && typeof index === 'number') {
      const tools = [...formData.tools];
      tools[index] = e.target.value;
      setFormData({ ...formData, tools });
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };

  const handleAddTool = () => {
    setFormData({ ...formData, tools: [...formData.tools, ''] });
  };

  const handleRemoveTool = (index: number) => {
    const tools = [...formData.tools];
    tools.splice(index, 1);
    setFormData({ ...formData, tools });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { courseTitle, courseDescription, price, totalApplied, downloadSyllabus, courseType, startDate, endDate, duration, aboutCourse, tools } = formData;
    if (!courseTitle || !courseDescription || !price || !courseType || !startDate || !endDate || !duration || !aboutCourse) {
      setError('All fields except tools are required');
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
        courseTitle: '',
        courseDescription: '',
        price: '',
        totalApplied: '',
        downloadSyllabus: '',
        courseType: '',
        startDate: '',
        endDate: '',
        duration: '',
        aboutCourse: '',
        tools: ['']
      });
      setSuccess('Course uploaded successfully');
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to submit the form');
      setSuccess('');
    }
  };

  return (
    <div className="container min-h-screen mx-auto p-6 w-full max-w-screen-lg">
      <h1 className="text-3xl font-semibold mb-8 text-center text-gray-800">Admin Course Upload</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 space-y-6">
        {error && <p className="text-red-600 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Course Title" value={formData.courseTitle} onChange={handleChange('courseTitle')} />
          <InputField label="Course Description" value={formData.courseDescription} onChange={handleChange('courseDescription')} type="textarea" />
          <InputField label="Price" value={formData.price} onChange={handleChange('price')} />
          <InputField label="Total Applied" value={formData.totalApplied} onChange={handleChange('totalApplied')} />
          <InputField label="Download Syllabus Link" value={formData.downloadSyllabus} onChange={handleChange('downloadSyllabus')} />
          <InputField label="Course Type" value={formData.courseType} onChange={handleChange('courseType')} />
          <InputField label="Start Date" value={formData.startDate} onChange={handleChange('startDate')} type="date" />
          <InputField label="End Date" value={formData.endDate} onChange={handleChange('endDate')} type="date" />
          <InputField label="Duration" value={formData.duration} onChange={handleChange('duration')} />
          <InputField label="About Course" value={formData.aboutCourse} onChange={handleChange('aboutCourse')} type="textarea" />
          {formData.tools.map((tool, index) => (
            <div key={index} className="flex items-center space-x-2">
              <InputField label={`Tool ${index + 1}`} value={tool} onChange={handleChange('tools', index)} />
              <button type="button" onClick={() => handleRemoveTool(index)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button type="button" onClick={handleAddTool} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded">
            Add Tool
          </button>
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
