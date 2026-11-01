import { useState } from 'react';
import { Sidebar } from './Sidebar';

function SidebarWrapper(args) {
    const [view, setView] = useState(args.view || 'dashboard');
    const [collapsed, setCollapsed] = useState(args.collapsed || false);

    return <Sidebar {...args} view={view} setView={setView} collapsed={collapsed} setCollapsed={setCollapsed} />;
}

export default {
    title: 'Components/Sidebar',
    component: Sidebar,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
};

export const Expanded = {
    render: (args) => <SidebarWrapper {...args} />,
    args: {
        view: 'dashboard',
        collapsed: false,
    },
};

export const Collapsed = {
    render: (args) => <SidebarWrapper {...args} />,
    args: {
        view: 'dashboard',
        collapsed: true,
    },
};
