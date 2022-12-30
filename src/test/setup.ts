import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { fetch } from "cross-fetch";
global.fetch = fetch;

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const start = new Date(yesterday.getTime());
const stop = new Date(yesterday.getTime());
stop.setHours(stop.getHours() + 2);

const testData = {
  projects: [
    {
      title: "Project 1",
      userId: 1,
      color: "#ff00ff",
      id: 1,
    },
    {
      title: "Project 2",
      userId: 1,
      color: "#ff0000",
      id: 2,
    },
  ],
  tasks: [
    {
      title: "Build CSS",
      userId: 1,
      projectId: 2,
      complete: false,
      timer: false,
      id: 1,
    },
    {
      title: "Build JS",
      userId: 1,
      projectId: 2,
      complete: false,
      timer: false,
      id: 2,
    },
  ],
  timers: [
    {
      userId: 1,
      projectId: 2,
      taskId: 1,
      start: start.toISOString(),
      id: 1,
      stop: stop.toISOString(),
    },
  ],
  invoices: [
    {
      status: "payed",
      expireDate: "2023-01-03T19:27:46.526Z",
      customer: "Jane doe",
      sumPrice: 250,
      id: 1,
    },
    {
      status: "payed",
      expireDate: "2023-01-03T23:09:12.256Z",
      customer: "John Doe",
      sumPrice: 50,
      id: 2,
    },
  ],
};

const handlers = [
  rest.get("http://localhost:3000/projects", (req, res, ctx) => {
    return res(ctx.json(testData.projects));
  }),
  rest.get("http://localhost:3000/tasks", (req, res, ctx) => {
    return res(ctx.json(testData.tasks));
  }),
  rest.get("http://localhost:3000/timers", (req, res, ctx) => {
    return res(ctx.json(testData.timers));
  }),
  rest.get("http://localhost:3000/invoices", (req, res, ctx) => {
    return res(ctx.json(testData.invoices));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

afterAll(() => {
  server.close();
});
