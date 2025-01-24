import { DashboardProps, Task } from "../../type"; // Assuming these types exist
import api from "../../api/api";

// Adjusted parameter types for setTasks and activeSection
const fetchTasks = async ({ setTasks, activeSection }: { setTasks: (tasks: Task[]) => void, activeSection: DashboardProps['activeSection'] }) => {
    if (activeSection === 'manageTasks') {
        try {
            const response = await api.get(`api/tasks/all`);
            
            const tasks: Task[] = response.data; // Assuming response.data is of type Task[]
            setTasks(tasks); // Update the state with fetched tasks
            
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }
};

export default fetchTasks;
