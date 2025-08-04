import { TaskStatus } from "../constants/TaskStatus";

export interface Task {
  id: string;
  title: string;
  description: string;
  responsible: string;
  status: TaskStatus | string;
};
