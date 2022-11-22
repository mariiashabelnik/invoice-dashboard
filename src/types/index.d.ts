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
}

interface Task {
  title: string;
  userId: number;
  projectId: number;
  complete: boolean;
  timer: boolean;
  id: number;
}
