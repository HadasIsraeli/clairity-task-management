import { Panel } from './Panel';

const design = (node) => ({ design: { type: 'figma', url: `https://www.figma.com/design/cLshpuj2nu9IbalJF3hM0G/Task-Management-AI?node-id=${node}` } });

export default {
    title: 'UI Kit/Panel',
    component: Panel,
    tags: ['autodocs'],
    parameters: design('972-35173'),
    decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

export const Default = { args: { padded: true, children: 'Next Break' } };
export const Brief = { args: { tone: 'brief', padded: true, children: 'Sprint Brief' }, parameters: design('1005-40982') };
