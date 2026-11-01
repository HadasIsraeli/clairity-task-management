import { DonutChart } from './DonutChart';
import { C } from '../styles/tokens';

export default {
    title: 'UI Kit/DonutChart',
    component: DonutChart,
    tags: ['autodocs'],
};

const sprintSegments = [
    { label: 'Blocked', value: 1, color: C.red },
    { label: 'To Do', value: 6, color: C.textTer },
    { label: 'Done', value: 4, color: C.green },
    { label: 'In Progress', value: 4, color: C.teal },
];

export const Default = {
    args: {
        segments: sprintSegments,
        centerLabel: '27%',
    },
};

export const NoLegend = {
    args: {
        segments: sprintSegments,
        centerLabel: '27%',
        legend: false,
    },
};

export const Small = {
    args: {
        segments: sprintSegments,
        centerLabel: '27%',
        size: 80,
        thickness: 10,
    },
};
