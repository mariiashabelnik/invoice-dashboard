import { Typography, Box } from "@mui/material";

import InvoiceProject from "../components/InvoiceProject";

const data = {
  timers: [
    {
      userId: 1,
      projectId: 2,
      taskId: 1,
      start: "2022-10-29T08:27:09.671Z",
      id: 1,
      stop: "2022-10-29T09:27:29.159Z",
    },
    {
      userId: 2,
      projectId: 3,
      taskId: 4,
      start: "2022-10-31T09:31:49.414Z",
      id: 2,
      stop: "2022-10-31T09:31:54.556Z",
    },
    {
      userId: 1,
      projectId: 2,
      taskId: 1,
      start: "2022-11-17T16:03:37.682Z",
      id: 3,
      stop: "2022-11-17T16:03:57.756Z",
    },
    {
      userId: 5,
      projectId: 4,
      taskId: 5,
      start: "2022-11-18T15:02:38.159Z",
      id: 4,
      stop: "2022-11-18T15:03:29.278Z",
    },
    {
      userId: 1,
      projectId: 2,
      taskId: 6,
      start: "2022-11-18T16:07:40.966Z",
      id: 5,
      stop: "2022-11-18T16:07:47.275Z",
    },
  ],
  users: [
    {
      username: "mariia",
      password: "123qwe",
      id: 1,
    },
    {
      username: "man",
      password: "1234",
      id: 2,
    },
    {
      username: "man",
      password: "1234",
      id: 3,
    },
  ],
  projects: [
    {
      title: "Super project ",
      userId: 1,
      color: "#f51f1f",
      id: 1,
    },
    {
      title: "New webpage",
      userId: 1,
      color: "#4a1ff5",
      id: 2,
    },
    {
      title: "Clean house",
      userId: 2,
      color: "#59318c",
      id: 3,
    },
    {
      title: "k2",
      userId: 5,
      color: "#ff0000",
      id: 4,
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
    {
      title: "Clean up",
      userId: 1,
      projectId: 2,
      complete: false,
      timer: false,
      id: 3,
    },
    {
      title: "Bathroom",
      userId: 2,
      projectId: 3,
      complete: false,
      timer: false,
      id: 4,
    },
    {
      title: "test",
      userId: 5,
      projectId: 4,
      complete: false,
      timer: false,
      id: 5,
    },
    {
      title: "api",
      userId: 1,
      projectId: 2,
      complete: false,
      timer: false,
      id: 6,
    },
  ],
};

function Home() {
  const projectsUi = data.projects.map((item) => {
    return <InvoiceProject key={item.id} title={item.title} id={item.id} />;
  });

  return (
    <Box>
      <Typography variant="h5" align="center">
        Last 30 days
      </Typography>
      {projectsUi}
    </Box>
  );
}

export default Home;
