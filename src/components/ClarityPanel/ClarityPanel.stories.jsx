import { ClarityPanel } from './ClarityPanel';
import { TASKS } from '../../data/fixtures/tasks';

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
