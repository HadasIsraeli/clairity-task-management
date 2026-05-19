import { fn } from 'storybook/test';

import { Dashboard } from '../features/Dashboard';

export default {
    title: 'Clairity/Dashboard',
    component: Dashboard,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    args: {
        onOpen: fn(),
    },
};

export const Default = {};
