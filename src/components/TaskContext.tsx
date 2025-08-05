import React, { createContext, useState, ReactNode } from 'react';

export interface Task {
  id: string;
  title: string;
  description: string;
  responsible: string;
  status: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateStatus: (id: string, status: Task['status']) => void;
  updateTask: (Etask: Task) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };

  const updateStatus = (id: string, status: Task['status']) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, status } : task))
    );
  };

  const updateTask = (Etaks: Task) => {
    setTasks((prev) =>
      prev.map(task =>
        task.id === Etaks.id
          ? {
            ...task,
            title: Etaks.title,
            description: Etaks.description,
            responsible: Etaks.responsible,
            status: Etaks.status,
          }
          : task
      )
    );
  };
  const deleteTaskById = (id: string) => {
    setTasks((prev) => prev.filter(task => task.id !== id));
  };


  return (
    <TaskContext.Provider value={{ tasks, addTask, updateStatus, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};
