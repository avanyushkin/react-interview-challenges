import React, { lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface TaskComponent {
    Solve: React.LazyExoticComponent<React.ComponentType<any>>;
}
const taskComponents: Record<string, TaskComponent> = {
  "01": {
    Solve: lazy (() => import ("../tasks/task-01/Solve")),
  },
  "02": {
    Solve: lazy (() => import ("../tasks/task-02/Solve")),
  },
  "03": {
    Solve: lazy (() => import ("../tasks/task-03/Solve")),
  },
  "04": {
    Solve: lazy (() => import ("../tasks/task-04/Solve")),
  },
  "05": {
    Solve: lazy (() => import ("../tasks/task-05/Solve")),
  },
  "06": {
    Solve: lazy (() => import ("../tasks/task-06/Solve")),
  }
};
function TaskPage () {
  const { taskId } = useParams< {taskId: string} > ();
  const navigate = useNavigate ();

  if (!taskId) {
    return ( <div>Task ID is not provided</div> );
  }

  const components = taskComponents[taskId];

  if (!components) {
    return (
      <div className = "container">
        <h1>Tak not found</h1>
        <button onClick = {() => navigate ("/")}>Back to Dashboard</button>
      </div>
    )
  }
  const SolveComponent = components.Solve;
  return (
    <div className = "container task-page">
      <button className = "back-button" onClick = {() => navigate ("/")}>
        Back to Dashboard
      </button>
      <div className = "task-content">
        <Suspense fallback = {<div>Loading...</div>}>
          <SolveComponent />
        </Suspense>
      </div>
    </div>
  );
}

export default TaskPage;