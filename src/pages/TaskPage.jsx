import { useParams, useNavigate } from 'react-router-dom';
import { TaskView } from '../sections/TaskView';
import { TASKS, ALL_TASKS } from '../data/fixtures/tasks';

export default function TaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Map a task id to our internal taskKey used by TaskView
  const mapIdToKey = (taskId) => {
    if (!taskId) return 'todo';
    if (taskId === TASKS.inProgress.id) return 'inProgress';
    if (taskId === TASKS.todo.id) return 'todo';
    // try to infer from ALL_TASKS
    const found = ALL_TASKS.find((t) => t.id === taskId);
    if (found) return found.status === 'In Progress' ? 'inProgress' : 'todo';
    return 'todo';
  };

  const taskKey = mapIdToKey(id);

  return <TaskView taskKey={taskKey} onBack={() => navigate('/')} />;
}
