import { Avatar, Card, C } from '../ui';

// Illustrative team roster + chat preview chrome — static, not wired to any
// real chat backend. Mirrors the Figma "Team / Chats" widget.
const TEAM = [
    { initials: 'YB', color: C.indigo },
    { initials: 'DS', color: C.teal },
    { initials: 'GP', color: C.green },
    { initials: 'ML', color: C.orange },
    { initials: 'RS', color: C.yellow },
];

const CHATS = [
    { initials: 'GC', color: C.teal, name: 'Gali Cohen', preview: 'Awesome 🔥', time: '10:40', unread: 1 },
    { initials: 'DS', color: C.indigo, name: 'Daria Shmueli', preview: 'Got it, thanks!', time: '10:55', unread: 0 },
];

export function TeamChatsWidget() {
    return (
        <Card padding="lg" className="team-chats-widget">
            <span className="title-sm text-ter" style={{ letterSpacing: '0.06em', textTransform: 'uppercase' }}>Team</span>
            <div className="team-chats-widget__avatars">
                {TEAM.map((member, i) => (
                    <div key={i} style={{ marginLeft: i === 0 ? 0 : -8, zIndex: TEAM.length - i }}>
                        <Avatar initials={member.initials} color={member.color} size={30} />
                    </div>
                ))}
            </div>

            <span className="title-sm text-ter" style={{ letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 16, display: 'block' }}>Chats</span>
            <div className="team-chats-widget__list">
                {CHATS.map((chat) => (
                    <div key={chat.name} className="team-chats-widget__row">
                        <Avatar initials={chat.initials} color={chat.color} size={28} />
                        <div className="team-chats-widget__row-body">
                            <span className="team-chats-widget__row-name">{chat.name}</span>
                            <span className="team-chats-widget__row-preview">{chat.preview}</span>
                        </div>
                        <div className="team-chats-widget__row-meta">
                            <span className="team-chats-widget__row-time">{chat.time}</span>
                            {chat.unread > 0 && <span className="team-chats-widget__unread">{chat.unread}</span>}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
