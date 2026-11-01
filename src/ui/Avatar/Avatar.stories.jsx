import { Avatar } from './Avatar';
import photo from '../../assets/figma/profile-1.png';

const design = (node) => ({ design: { type: 'figma', url: `https://www.figma.com/design/cLshpuj2nu9IbalJF3hM0G/Task-Management-AI?node-id=${node}` } });

export default {
    title: 'UI Kit/Avatar',
    component: Avatar,
    tags: ['autodocs'],
    parameters: design('720-14825'),
};

export const Initials = { args: { initials: 'AB', color: '#2bb0e6', size: 48 } };
export const Photo = { args: { src: photo, size: 48, alt: 'Gali Cohen' } };
export const PresenceAvailable = { args: { src: photo, size: 48, presence: 'green' } };
export const PresenceBusy = { args: { src: photo, size: 48, presence: 'yellow' } };
export const PresenceUnavailable = { args: { src: photo, size: 48, presence: 'red' } };
export const Small = { args: { src: photo, size: 18 } };
