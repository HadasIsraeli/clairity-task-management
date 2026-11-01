import { TeamStatusList } from './TeamStatusList';

const design = (node) => ({ design: { type: 'figma', url: `https://www.figma.com/design/cLshpuj2nu9IbalJF3hM0G/Task-Management-AI?node-id=${node}` } });

export default {
    title: 'Components/TeamStatusList',
    component: TeamStatusList,
    tags: ['autodocs'],
    parameters: design('972-33342'),
    decorators: [(Story) => <div style={{ width: 200 }}><Story /></div>],
};

export const Default = {};
