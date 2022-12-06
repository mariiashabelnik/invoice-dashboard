import { useContext } from "react";

import { StoreContext } from "../store";
import { Typography, Box } from "@mui/material";
import InvoiceProject from "../components/InvoiceProject";

export default function CreateInvoice() {
  const { projectStore, taskStore, timeStore } =
    useContext<AppContextInterface>(StoreContext);

  const projectsUi = projectStore?.projects.map((item) => {
    const projectTasks = taskStore?.tasks.filter((taskItem) => {
      return item.id === taskItem.projectId;
    });
    const projectTimers = timeStore?.timers.filter((timerItem) => {
      return item.id === timerItem.projectId;
    });

    return (
      <InvoiceProject
        key={item.id}
        title={item.title}
        id={item.id}
        tasks={projectTasks}
        timers={projectTimers}
      />
    );
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
