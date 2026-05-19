import { fn } from 'storybook/test';
import { CtaButton } from './CtaButton';

export default {
    title: 'Components/CtaButton',
    component: CtaButton,
    tags: ['autodocs'],
};

export const Default = {
    args: {
        label: 'Action',
        recommended: false,
        onClick: fn(),
    },
};

export const Recommended = {
    args: {
        label: 'Primary action',
        recommended: true,
        onClick: fn(),
    },
};
