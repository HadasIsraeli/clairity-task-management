import { ScheduleCard } from './ScheduleCard';

const design = (node) => ({ design: { type: 'figma', url: `https://www.figma.com/design/cLshpuj2nu9IbalJF3hM0G/Task-Management-AI?node-id=${node}` } });

export default {
    title: 'Components/ScheduleCard',
    component: ScheduleCard,
    tags: ['autodocs'],
    parameters: design('1005-40477'),
    decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>],
};

export const Default = {};
export const NoEvents = { args: { events: [] } };
