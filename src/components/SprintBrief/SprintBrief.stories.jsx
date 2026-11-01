import { fn } from 'storybook/test';
import { SprintBrief } from './SprintBrief';

const design = (node) => ({ design: { type: 'figma', url: `https://www.figma.com/design/cLshpuj2nu9IbalJF3hM0G/Task-Management-AI?node-id=${node}` } });

export default {
    title: 'Components/SprintBrief',
    component: SprintBrief,
    tags: ['autodocs'],
    args: { onReview: fn() },
    decorators: [(Story) => <div style={{ width: 829 }}><Story /></div>],
};

export const Score52 = { args: { phase: 'entry' }, parameters: design('972-33336') };
export const Score69 = { args: { phase: 'in-progress' }, parameters: design('1005-41031') };
export const Final72 = { args: { phase: 'complete' }, parameters: design('1005-40982') };
