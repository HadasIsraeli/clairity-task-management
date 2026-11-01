import { fn } from 'storybook/test';
import { Board } from './Board';

export default {
    title: 'Sections/Board',
    component: Board,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        design: { type: 'figma', url: 'https://www.figma.com/design/cLshpuj2nu9IbalJF3hM0G/Task-Management-AI?node-id=720-14825' },
    },
    args: { onOpen: fn() },
};

export const Default = {};
