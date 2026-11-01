import { fn } from 'storybook/test';
import { TaskView } from './TaskView';

export default {
    title: 'Features/TaskView',
    component: TaskView,
    tags: ['autodocs'],
};

export const InProgress = {
    args: {
        taskKey: 'inProgress',
        onBack: fn(),
    },
};

export const ToDo = {
    args: {
        taskKey: 'todo',
        onBack: fn(),
    },
};
