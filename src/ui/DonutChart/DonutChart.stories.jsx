import { DonutChart } from './DonutChart';
import { C } from '../../styles/tokens';

const design = (node) => ({ design: { type: 'figma', url: `https://www.figma.com/design/cLshpuj2nu9IbalJF3hM0G/Task-Management-AI?node-id=${node}` } });

export default {
    title: 'UI Kit/DonutChart',
    component: DonutChart,
    tags: ['autodocs'],
    parameters: design('972-35173'),
};

// Figma "Doughnut Chart": 132px, ~20px ring, 0.7 opacity, soft segment colors.
const sprintSegments = [
    { label: 'In Progress', value: 4, color: C.tealSoft },
    { label: 'Blocked', value: 1, color: C.redSoft },
    { label: 'To Do', value: 5, color: C.textSec },
    { label: 'Done', value: 4, color: C.greenSoft },
];

export const Default = {
    args: { segments: sprintSegments, centerLabel: '29%', centerColor: C.greenSoft, centerFontSize: 24, size: 132, thickness: 20, segmentGap: 4, opacity: 0.7 },
};

export const Small = {
    args: { segments: sprintSegments, centerLabel: '29%', size: 80, thickness: 10 },
};
