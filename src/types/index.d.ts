interface Project {
  title: string;
  userId: number;
  id: number;
  color: string;
}

interface InvoiceProjectProps {
  title: string;
  id: number;
  color?: string;
  tasks?: Task[];
  timers?: Timer[];
}

interface TitleProps {
  title: string;
}

interface TextboxProps {
  label: string;
  color?: string;
  title?: string;
}

interface ButtonProps {
  title: string;
  color?: string;
  disabled?: boolean;
  opacity?: number;
}

interface Task {
  title: string;
  userId: number;
  projectId: number;
  complete: boolean;
  timer: boolean;
  id: number;
}

interface Timer {
  userId: number;
  projectId: number;
  taskId: number;
  start: string;
  id: number;
  stop?: string;
}

interface Invoice {
  status?: string;
  expireDate?: string;
  customer?: string;
  sumPrice?: number;
  id?: number;
}

interface ProjectStore {
  projects: Project[];
  loadAllProjects: () => Promise<void>;
}

interface TaskStore {
  tasks: Task[];
  loadAllTasks: () => Promise<void>;
}

interface TimeStore {
  timers: Timer[];
  loadAllTimers: () => Promise<void>;
}

interface InvoiceStore {
  invoices: Invoice[];
  loadAllInvoices: () => Promise<void>;
}

interface AppContextInterface {
  projectStore?: ProjectStore;
  taskStore?: TaskStore;
  timeStore?: TimeStore;
  invoiceStore?: InvoiceStore;
}
