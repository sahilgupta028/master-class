import React from 'react';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: 'text' | 'textarea';
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, type = 'text', placeholder }) => {
  return (
    <div>
      <label className="block text-gray-700 font-bold mb-2">{label}</label>
      {type === 'textarea' ? (
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
        />
      ) : (
        <input
          type={type}
          className="w-full p-2 border border-gray-300 rounded-md"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default InputField;
