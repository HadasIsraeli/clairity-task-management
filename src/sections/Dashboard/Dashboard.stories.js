import { fn } from 'storybook/test';

import { Dashboard } from './Dashboard';

export default {
    title: 'Clairity/Dashboard',
    component: Dashboard,
    tags: ['autodocs'],
    parameters: {
        design: { type: 'figma', url: 'https://www.figma.com/design/cLshpuj2nu9IbalJF3hM0G/Task-Management-AI?node-id=972-35173' },
        layout: 'fullscreen',
    },
    args: {
        onOpen: fn(),
    },
};

export const Default = {};
