import React, { useState, useEffect } from 'react';
import { Task } from '../type';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import socialMediaOptions from '@/utils/socialMediaOptions';

interface EditTaskProps {
  task: Task;
  onCancel: () => void;
  onTaskUpdated: (updatedTask: Task) => Promise<void>;
}

const EditTask: React.FC<EditTaskProps> = ({ task, onCancel, onTaskUpdated }) => {
  const [formData, setFormData] = useState<Task>(task);
  const [imagePreview, setImagePreview] = useState<string | null>(task.taskImage || null);

  useEffect(() => {
    setFormData(task);
    setImagePreview(task.taskImage || null);
  }, [task]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'taskImage' && value) {
      setImagePreview(value); // Update image preview if URL is entered
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onTaskUpdated(formData);
      toast.success('Task updated successfully!'); // Success toast
    } catch (error) {
      toast.error('Error updating task. Please try again.'); // Error toast
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

      <div>
        <label htmlFor="companyName" className="block text-sm font-medium mb-1">Task Name</label>
        <input
          type="text"
          name="companyName"
          id="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mt-2">
        <label htmlFor="taskDescription" className="block text-sm font-medium mb-1">Task Description</label>
        <textarea
          name="taskDescription"
          id="taskDescription"
          value={formData.taskDescription}
          onChange={handleChange}
          className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mt-2">
        <label htmlFor="task" className="block text-sm font-medium mb-1">Task</label>
        <input
          type="text"
          name="task"
          id="task"
          value={formData.task}
          onChange={handleChange}
          className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mt-2">
        <label htmlFor="points" className="block text-sm font-medium mb-1">Points</label>
        <input
          type="number"
          name="points"
          id="points"
          value={formData.point || ''}
          onChange={handleChange}
          className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the points for this task"
          required
        />
      </div>

      <div className="mt-2">
        <label htmlFor="socialMedia" className="block text-sm font-medium mb-1">Social Media</label>
        <select
          name="socialMedia"
          value={formData.socialMedia}
          onChange={handleChange}
          className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {socialMediaOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-2">
        <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="task">Task</option>
          <option value="bug">Bug</option>
          <option value="feature">Feature</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      <div className="mt-2">
        <label htmlFor="taskImage" className="block text-sm font-medium mb-1">Task Image URL</label>
        <input
          type="text"
          name="taskImage"
          id="taskImage"
          value={formData.taskImage || ''}
          onChange={handleChange}
          className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the image URL"
        />
        {imagePreview && (
          <div className="mt-2">
            <img src={imagePreview} alt="Task Preview" className="max-w-full h-auto rounded-md" />
          </div>
        )}
      </div>

      <div className="mt-4">
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md mr-2 hover:bg-blue-600 transition duration-150">Update Task</button>
        <button type="button" onClick={onCancel} className="bg-gray-300 p-2 rounded-md hover:bg-gray-400 transition duration-150">Cancel</button>
      </div>
    </form>
  );
};

export default EditTask;
