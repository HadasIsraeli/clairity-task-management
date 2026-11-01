import { BreakTimer } from './BreakTimer';

const design = (node) => ({ design: { type: 'figma', url: `https://www.figma.com/design/cLshpuj2nu9IbalJF3hM0G/Task-Management-AI?node-id=${node}` } });

export default {
    title: 'Components/BreakTimer',
    component: BreakTimer,
    tags: ['autodocs'],
    parameters: design('1005-35733'),
    decorators: [(Story) => <div style={{ width: 200 }}><Story /></div>],
};

export const Idle = {};
export const ShortTimer = { args: { seconds: 10 } };
