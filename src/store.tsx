import { useState, createContext, useEffect, ReactNode } from "react";
import { apiProjectCall, apiAllTasksCall, apiAllTimersCall } from "./api";

export const StoreContext = createContext<AppContextInterface>({});

interface StoreProps {
  children?: ReactNode;
}

function Store({ children }: StoreProps) {
  const [shouldLoad, setLoading] = useState<boolean>(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [timers, setTimers] = useState<Timer[]>([]);

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

  // store is loaded
  useEffect(() => {
    const fetchData = async () => {
      await loadAllProjects();
      await loadAllTasks();
      await loadAllTimers();
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
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
export default Store;
