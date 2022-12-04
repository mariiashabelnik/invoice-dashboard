const server = import.meta.env.VITE_API;

function apiProjectCall(): Promise<Project[]> {
  return fetch(`${server}/projects`, {
    method: "GET",
    headers: {},
  }).then((res) => res.json());
}

function apiAllTasksCall(): Promise<Task[]> {
  return fetch(`${server}/tasks`, {
    method: "GET",
    headers: {},
  }).then((res) => res.json());
}

function apiAllTimersCall(): Promise<Timer[]> {
  return fetch(`${server}/timers`, {
    method: "GET",
    headers: {},
  }).then((res) => res.json());
}

export { apiProjectCall, apiAllTasksCall, apiAllTimersCall };
