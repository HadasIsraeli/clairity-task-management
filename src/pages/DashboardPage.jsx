import { useNavigate } from 'react-router-dom';
import { Dashboard } from '../sections/Dashboard';

export default function DashboardPage() {
  const navigate = useNavigate();

  const handleOpen = (taskKey) => {
    // Preserve original Dashboard behavior: map keys to shortcut routes
    if (taskKey === 'inProgress') return navigate('/in-progress');
    if (taskKey === 'todo') return navigate('/todo');
    // fallback to home
    return navigate('/');
  };

  return <Dashboard onOpen={handleOpen} />;
}
