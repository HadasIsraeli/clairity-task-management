import { DeliveryConfidence } from './DeliveryConfidence';

const design = (node) => ({ design: { type: 'figma', url: `https://www.figma.com/design/cLshpuj2nu9IbalJF3hM0G/Task-Management-AI?node-id=${node}` } });

export default {
    title: 'Components/DeliveryConfidence',
    component: DeliveryConfidence,
    tags: ['autodocs'],
    decorators: [(Story) => <div style={{ width: 646 }}><Story /></div>],
};

export const Score52 = { args: { phase: 'entry' }, parameters: design('972-33165') };
export const Score69 = { args: { phase: 'in-progress' }, parameters: design('1005-27434') };
export const Score72 = { args: { phase: 'complete' }, parameters: design('1005-27540') };
