import { useState } from 'react';
import { ChatPanel } from './ChatPanel';

function ChatPanelWrapper(args) {
    const [open, setOpen] = useState(args.open);
    const [msgs, setMsgs] = useState(args.msgs);

    return <ChatPanel {...args} open={open} onClose={() => setOpen(false)} msgs={msgs} setMsgs={setMsgs} />;
}

export default {
    title: 'Features/ChatPanel',
    component: ChatPanel,
    tags: ['autodocs'],
};

export const Default = {
    render: (args) => <ChatPanelWrapper {...args} />,
    args: {
        open: true,
        msgs: [
            {
                role: 'assistant',
                content: "Hi Alon 👋 I'm Clairity, your sprint intelligence advisor. I've reviewed Sprint 24 and I'm seeing two tasks that could use attention.",
            },
        ],
    },
};
