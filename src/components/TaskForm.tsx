import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db, collection, addDoc } from '../firebase/firebase-config';
import socialMediaOptions from '@/utils/socialMediaOptions';
import { Task, TaskError } from '@/type';

interface TaskFormProps {
    addTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
    const [task, setTask] = useState<Task>({
        taskId: '',
        companyName: '',
        taskDescription: '',
        task: '',
        socialMedia: '',
        taskImage: '',
        point: 0,
    });

    const [errors, setErrors] = useState<TaskError>({});
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };

    const validate = (): TaskError => {
        const validationErrors: TaskError = {};

        if (!task.companyName.trim()) validationErrors.companyName = 'Company name is required.';
        if (!task.taskDescription.trim()) validationErrors.taskDescription = 'Task description is required.';
        if (!task.task.trim()) validationErrors.task = 'Task is required.';
        if (!task.socialMedia) validationErrors.socialMedia = 'Please select a social media platform.';
        if (!task.taskImage.trim()) validationErrors.image = 'Please provide an image URL.';
        if (task.point <= 0) validationErrors.point = 'Points must be greater than 0.';

        return validationErrors;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
    
        setLoading(true);
        try {
            // Add the task to Firebase and get the document reference
            const taskRef = await addDoc(collection(db, 'tasks'), {
                companyName: task.companyName,
                taskDescription: task.taskDescription,
                task: task.task,
                socialMedia: task.socialMedia,
                taskImage: task.taskImage,
                point: task.point,
                createdAt: new Date(),
            });
    
            // Use the generated ID to update the taskId
            const newTask = { ...task, taskId: taskRef.id };
            addTask(newTask);
    
            // Reset the form
            setTask({
                taskId: '',
                companyName: '',
                taskDescription: '',
                task: '',
                socialMedia: '',
                taskImage: '',
                point: 0,
            });
            setErrors({});
            toast.success('Task added successfully!');
        } catch (error: any) {
            setErrors({ general: 'Failed to add the task. Please try again later.' });
            toast.error('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Add Task</h1>
            <form onSubmit={handleSubmit} className="mb-6">
                {errors.general && <p className="text-red-500">{errors.general}</p>}

                <input
                    name="companyName"
                    type="text"
                    placeholder="Company Name"
                    value={task.companyName}
                    onChange={handleChange}
                    className={`border p-2 mb-4 w-full ${errors.companyName ? 'border-red-500' : ''}`}
                />
                {errors.companyName && <p className="text-red-500">{errors.companyName}</p>}

                <textarea
                    name="taskDescription"
                    placeholder="Task Description"
                    value={task.taskDescription}
                    onChange={handleChange}
                    className={`border p-2 mb-4 w-full ${errors.taskDescription ? 'border-red-500' : ''}`}
                />
                {errors.taskDescription && <p className="text-red-500">{errors.taskDescription}</p>}

                <input
                    name="task"
                    type="text"
                    placeholder="Task"
                    value={task.task}
                    onChange={handleChange}
                    className={`border p-2 mb-4 w-full ${errors.task ? 'border-red-500' : ''}`}
                />
                {errors.task && <p className="text-red-500">{errors.task}</p>}

                <select
                    name="socialMedia"
                    value={task.socialMedia}
                    onChange={handleChange}
                    className={`border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.socialMedia ? 'border-red-500' : ''
                    }`}
                >
                    <option value="" disabled>
                        Select a platform
                    </option>
                    {socialMediaOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {errors.socialMedia && <p className="text-red-500">{errors.socialMedia}</p>}

                <input
                    name="taskImage"
                    type="text"
                    placeholder="Image URL"
                    value={task.taskImage}
                    onChange={handleChange}
                    className={`border p-2 mb-4 w-full ${errors.image ? 'border-red-500' : ''}`}
                />
                {errors.image && <p className="text-red-500">{errors.image}</p>}

                <input
                    name="point"
                    type="number"
                    placeholder="Points"
                    value={task.point}
                    onChange={handleChange}
                    className={`border p-2 mb-4 w-full ${errors.point ? 'border-red-500' : ''}`}
                />
                {errors.point && <p className="text-red-500">{errors.point}</p>}

                <button type="submit" className="bg-blue-500 text-white px-4 py-2" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Task'}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default TaskForm;
