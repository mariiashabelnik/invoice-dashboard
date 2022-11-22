const server = import.meta.env.VITE_API;

function projects(): Promise<Project[]> {
  return fetch(`${server}/projects`, {
    method: "GET",
    headers: {},
  }).then((res) => res.json());
}

function projectTasks(projectId: number): Promise<Task[]> {
  return fetch(`${server}/tasks?projectId=${projectId}`, {
    method: "GET",
    headers: {},
  }).then((res) => res.json());
}

export { projects, projectTasks };
