import { useNavigate } from 'react-router-dom';
import { Board } from '../sections/Board';
import styles from './TasksPage.module.css';

/** Tasks page: the Kanban board, moved off the dashboard (the new dashboard frames don't include it). */
export default function TasksPage() {
    const navigate = useNavigate();
    const handleOpen = (taskKey) => navigate(taskKey === 'inProgress' ? '/in-progress' : '/todo');

    return (
        <div className={styles.page}>
            <Board onOpen={handleOpen} />
        </div>
    );
}
