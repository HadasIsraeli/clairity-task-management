import { StatusDonut } from './StatusDonut';

const design = (node) => ({ design: { type: 'figma', url: `https://www.figma.com/design/cLshpuj2nu9IbalJF3hM0G/Task-Management-AI?node-id=${node}` } });

export default {
    title: 'Components/StatusDonut',
    component: StatusDonut,
    tags: ['autodocs'],
    parameters: design('972-33337'),
    decorators: [(Story) => <div style={{ width: 315 }}><Story /></div>],
};

export const Default = { args: { counts: { blocked: 1, todo: 5, done: 4, inProgress: 4 } } };
export const AllDone = { args: { counts: { blocked: 0, todo: 0, done: 14, inProgress: 0 } } };
