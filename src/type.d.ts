interface Task {
  taskId: string;
  companyName: string;
  taskDescription: string;
  task: string;
  socialMedia: string;
  taskImage: string; 
  point: number;
}

interface TaskError {
  companyName?: string;
  taskDescription?: string;
  task?: string;
  socialMedia?: string;
  image?: string;
  point?: string; // Added error field for points
  general?: string;
}


export interface User {
    id: string;                 // UUID
    telegramId: number;          // Telegram ID, assuming it's a string, you can adjust to number if needed
    firstName: string;           // First Name
    lastName?: string;           // Last Name (optional, in case it can be null)
    username?: string;            // Username
    balance: number;             // Balance (assuming it's a number, as the balance seems to represent a numeric value)
    referredBy?: string | null;  // Referred By (can be null or string)
    referral_count: number;      // Referral count
    createdAt: string;           // Creation timestamp (using string for ISO date)
    updatedAt: string;           // Last update timestamp (also string for ISO date)
}

export type ActiveSection = 'dashboard' | 'addTask' | 'manageTasks' | 'manageUsers' | 'withdrawals';


export interface DashboardProps {
    activeSection: ActiveSection; // Use ActiveSection here
}