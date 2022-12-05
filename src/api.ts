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

function apiCreateInvoice(invoice: Invoice): Promise<any> {
  return fetch(`${server}/invoices`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(invoice),
  }).then((res) => res.json());
}

function apiAllInvoicesCall(): Promise<Invoice[]> {
  return fetch(`${server}/invoices`, {
    method: "GET",
    headers: {},
  }).then((res) => res.json());
}

export {
  apiProjectCall,
  apiAllTasksCall,
  apiAllTimersCall,
  apiCreateInvoice,
  apiAllInvoicesCall,
};
