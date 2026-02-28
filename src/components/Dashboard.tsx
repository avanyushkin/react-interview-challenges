import React from "react";
import { Link } from "react-router-dom";

interface Task {
  id: string;
  title: string;
}
const tasks: Task[] = [
  {
    id: "01",
    title: "Guessing color",
  },
];
function Dashboard () {
  return (
    <div className = "dashboard">
      {tasks.map ( (task) => (
        <Link to = {`/task/${task.id}`} key = {task.id}>
          <div className = "task-card">
            <div className = "task-id">Task {task.id}</div>
            <div className = "task-title">{task.title}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Dashboard;