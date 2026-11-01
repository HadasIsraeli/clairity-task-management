import { ActionButton } from './ActionButton';

const design = (node) => ({ design: { type: 'figma', url: `https://www.figma.com/design/cLshpuj2nu9IbalJF3hM0G/Task-Management-AI?node-id=${node}` } });

export default {
    title: 'UI Kit/ActionButton',
    component: ActionButton,
    tags: ['autodocs'],
    parameters: design('706-10893'),
    decorators: [(Story) => <div style={{ width: 380 }}><Story /></div>],
};

export const Primary = { args: { children: 'Assign to Gali', variant: 'primary', fullWidth: true } };
export const Neutral = { args: { children: 'Reduce scope', variant: 'neutral', fullWidth: true } };
export const Disabled = { args: { children: 'Assign to Gali', disabled: true, fullWidth: true } };
export const Inline = { args: { children: 'Schedule a sync', fullWidth: false } };
