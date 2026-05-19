import { ClarityPanel } from '../features/ClarityPanel';
import { TASKS } from '../data/tasks';

export default {
    title: 'Features/ClarityPanel',
    component: ClarityPanel,
    tags: ['autodocs'],
};

export const InProgressTask = {
    args: {
        task: TASKS.inProgress,
    },
};

export const ToDoTask = {
    args: {
        task: TASKS.todo,
    },
};
