import { useState } from 'react';
import { Pager } from './Pager';

const design = (node) => ({ design: { type: 'figma', url: `https://www.figma.com/design/cLshpuj2nu9IbalJF3hM0G/Task-Management-AI?node-id=${node}` } });

export default {
    title: 'UI Kit/Pager',
    component: Pager,
    tags: ['autodocs'],
    parameters: design('706-18580'),
};

export const First = { args: { page: 1, total: 3 } };
export const Middle = { args: { page: 2, total: 3 } };
export const Last = { args: { page: 3, total: 3 } };
function InteractivePager() {
    const [page, setPage] = useState(1);
    return <Pager page={page} total={3} onPrev={() => setPage((p) => p - 1)} onNext={() => setPage((p) => p + 1)} />;
}

export const Interactive = { render: () => <InteractivePager /> };
