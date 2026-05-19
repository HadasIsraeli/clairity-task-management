import { Tip } from './Tip';

export default {
    title: 'Components/Tip',
    component: Tip,
    tags: ['autodocs'],
};

export const Default = {
    args: {
        text: 'Helpful contextual guidance appears on hover.',
        children: <button style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)', color: '#E4EDFF' }}>Hover me</button>,
    },
};
