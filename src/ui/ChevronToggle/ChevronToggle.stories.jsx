import { useState } from 'react';
import { ChevronToggle } from './ChevronToggle';

const design = (node) => ({ design: { type: 'figma', url: `https://www.figma.com/design/cLshpuj2nu9IbalJF3hM0G/Task-Management-AI?node-id=${node}` } });

export default {
    title: 'UI Kit/ChevronToggle',
    component: ChevronToggle,
    tags: ['autodocs'],
    parameters: design('706-10893'),
};

export const Collapsed = { args: { expanded: false } };
export const Expanded = { args: { expanded: true } };
function InteractiveToggle() {
    const [open, setOpen] = useState(false);
    return <ChevronToggle expanded={open} onClick={() => setOpen((v) => !v)} />;
}

export const Interactive = { render: () => <InteractiveToggle /> };
