import React from 'react';
import { Task } from '../type';

interface TaskListProps {
  tasks: Task[];
  categories: { id: string; name: string }[]; // Ensure categories are passed down
  onEditTask: (task: Task) => void;
  deleteTask: (taskId: string) => Promise<void>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, categories, onEditTask, deleteTask }) => {
  console.log('Tasks passed to TaskList:', tasks);
  console.log('Categories passed to TaskList:', categories);

  // Helper function to get category name based on categoryId
  const getCategoryName = (categoryId: string) => {
    if (!categories || categories.length === 0) {
      console.error('Categories data is missing or empty.');
      return 'Unknown Category'; // Return fallback if categories are not available
    }

    // Find the category using the provided categoryId
    const category = categories.find((cat) => cat.id === categoryId);

    if (!category) {
      console.error(`Category with ID ${categoryId} not found.`);
      return 'Unknown Category'; // Return fallback if category is not found
    }

    return category.name; // Return the name of the found category
  };

  // Handle task deletion
  const handleDelete = async (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(taskId);
    }
  };

  return (
    <div className="overflow-hidden rounded-lg shadow-md">
      <ul className="divide-y divide-gray-200">
        {tasks.length === 0 ? (
          <li className="p-4 text-center text-gray-500">No tasks available.</li>
        ) : (
          tasks.map((task) => (
            <li
              key={task.taskId}
              className="p-4 hover:bg-gray-100 transition duration-150 flex flex-col md:flex-row items-start md:items-center"
            >
              <div className="mr-4 mb-4 md:mb-0">
                {task.taskImage && (
                  <img
                    src={task.taskImage}
                    alt={task.companyName}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{task.companyName}</h2>
                <p className="text-gray-700">{task.taskDescription}</p>
                <p className="text-gray-600">Task: {task.task}</p>
                <p className="text-gray-600">Social Media: {task.socialMedia}</p>
                <p className="text-gray-600">Points: {task.point}</p>
                {/* Use getCategoryName to fetch the category name */}
                <p className="text-gray-600">Category: {getCategoryName(task.category)}</p>
              </div>
              <div className="ml-4 flex flex-row sm:flex-col gap-2">
                <button
                  onClick={() => onEditTask(task)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-150"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.taskId)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-150"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskList;
