import { fn } from 'storybook/test';
import { IconButton } from './IconButton';

export default {
    title: 'UI Kit/IconButton',
    component: IconButton,
    tags: ['autodocs'],
};

export const Active = {
    args: { icon: 'send', label: 'Send message', active: true, onClick: fn() },
};

export const Inactive = {
    args: { icon: 'send', label: 'Send message', active: false, onClick: fn() },
};

export const Close = {
    args: { icon: 'x', label: 'Close', active: false, onClick: fn() },
};
