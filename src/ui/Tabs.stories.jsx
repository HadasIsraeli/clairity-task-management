import { useState } from 'react';
import { Tabs } from './Tabs';

function TabsWrapper(args) {
    const [value, setValue] = useState(args.value);
    return <Tabs {...args} value={value} onChange={setValue} />;
}

export default {
    title: 'UI Kit/Tabs',
    component: Tabs,
    tags: ['autodocs'],
};

export const Default = {
    render: (args) => <TabsWrapper {...args} />,
    args: {
        value: 'description',
        items: [
            { value: 'description', icon: 'file-text', label: 'Task brief' },
            { value: 'steps', icon: 'checklist', label: 'Progress' },
        ],
    },
};
