import React, { useState, useEffect } from 'react';
import { Task } from '../type';
import { db } from '@/firebase/firebase-config';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskList from './TaskList';
import EditTask from './EditTask';

const TaskPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Fetch tasks from Firebase
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskCollection = collection(db, 'tasks');
        const taskSnapshot = await getDocs(taskCollection);
        const fetchedTasks: Task[] = taskSnapshot.docs.map(doc => ({
          taskId: doc.id,
          ...doc.data(),
        })) as Task[];

        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast.error('Failed to fetch tasks. Please try again later.');
      }
    };

    fetchTasks();
  }, []);

  // Derived state for filtered tasks
  const filteredTasks = tasks.filter(task =>
    task.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.taskDescription?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteTask = async (taskId: string) => {
    console.log('Deleting task with ID:', taskId);  
    if (!taskId) {
      console.error('Error: taskId is undefined or empty');
      return;
    }
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await deleteDoc(taskRef);
  
      setTasks(prevTasks => prevTasks.filter(task => task.taskId !== taskId));
  
      toast.success('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Error deleting task. Please try again.');
    }
  };
  
  
  

  // Handle task update completion
  const handleTaskUpdated = async (updatedTask: Task) => {
    try {
      const taskRef = doc(db, 'tasks', updatedTask.taskId);
      const taskUpdateData = {
        companyName: updatedTask.companyName,
        taskDescription: updatedTask.taskDescription,
        task: updatedTask.task,
        taskImage: updatedTask.taskImage,
        taskPoint: updatedTask.point,
        socialMedia: updatedTask.socialMedia,
      };
      await updateDoc(taskRef, taskUpdateData);

      setTasks(prevTasks =>
        prevTasks.map(task => (task.taskId === updatedTask.taskId ? updatedTask : task))
      );
      setEditingTask(null);
      toast.success('Task updated successfully!');
    } catch (error) {
      console.error('Error updating task in Firebase:', error);
      toast.error('Failed to update task. Please try again.');
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Task Management</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {editingTask ? (
        <EditTask
          task={editingTask}
          onCancel={() => setEditingTask(null)}
          onTaskUpdated={handleTaskUpdated}
        />
      ) : (
        <TaskList tasks={filteredTasks} onEditTask={setEditingTask} deleteTask={deleteTask} />
      )}

      <ToastContainer />
    </div>
  );
};

export default TaskPage;
