import { useState, createContext, useEffect, ReactNode } from "react";
import {
  apiProjectCall,
  apiAllTasksCall,
  apiAllTimersCall,
  apiAllInvoicesCall,
} from "./api";

export const StoreContext = createContext<AppContextInterface>({});

interface StoreProps {
  children?: ReactNode;
}

function Store({ children }: StoreProps) {
  const [shouldLoad, setLoading] = useState<boolean>(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [timers, setTimers] = useState<Timer[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const loadAllProjects = async () => {
    const projectData = await apiProjectCall();
    setProjects(projectData);
  };

  const loadAllTasks = async () => {
    const taskData = await apiAllTasksCall();
    setTasks(taskData);
  };

  const loadAllTimers = async () => {
    const timeData = await apiAllTimersCall();
    setTimers(timeData);
  };

  const loadAllInvoices = async () => {
    const invoiceData = await apiAllInvoicesCall();
    setInvoices(invoiceData);
  };

  // store is loaded
  useEffect(() => {
    const fetchData = async () => {
      await loadAllProjects();
      await loadAllTasks();
      await loadAllTimers();
      await loadAllInvoices();
      setLoading(false);
    };

    if (shouldLoad === true) {
      fetchData();
    }
  }, [shouldLoad]);

  const store = {
    projectStore: { projects, loadAllProjects },
    taskStore: { tasks, loadAllTasks },
    timeStore: { timers, loadAllTimers },
    invoiceStore: { invoices, loadAllInvoices },
  };

  if (shouldLoad === true) {
    return <div aria-label="loading">Loading</div>;
  }

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

export default Store;
