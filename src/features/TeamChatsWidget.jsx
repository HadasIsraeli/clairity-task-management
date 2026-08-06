import { Avatar, Card, C } from '../ui';

// Illustrative team roster + chat preview chrome — static, not wired to any
// real chat backend. Mirrors the Figma "Team / Chats" widget.
const TEAM = [
    { initials: 'YB', color: C.indigo, presence: C.green },
    { initials: 'DS', color: C.teal, presence: C.red },
    { initials: 'GP', color: C.green, presence: C.green },
    { initials: 'ML', color: C.orange, presence: C.yellow },
    { initials: 'RS', color: C.yellow, presence: C.yellow },
];

const CHATS = [
    { initials: 'GC', color: C.teal, name: 'Gali Cohen', preview: 'Awesome 🔥', time: '10:40', unread: 1 },
    { initials: 'DS', color: C.indigo, name: 'Daria Shmueli', preview: 'voice', time: '10:55', unread: 2 },
];

export function TeamChatsWidget() {
    return (
        <Card padding="lg" className="team-chats-widget">
            <span className="title-sm text-ter" style={{ letterSpacing: '0.06em', textTransform: 'uppercase' }}>Team</span>
            <div className="team-chats-widget__avatars">
                {TEAM.map((member, i) => (
                    <div
                        key={i}
                        className="team-chats-widget__avatar-wrap"
                        style={{ marginLeft: i === 0 ? 0 : -8, zIndex: TEAM.length - i }}
                    >
                        <Avatar initials={member.initials} color={member.color} size={30} />
                        <span className="team-chats-widget__presence" style={{ background: member.presence }} />
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
                            {chat.preview === 'voice' ? (
                                <span className="team-chats-widget__row-preview">
                                    <i className="ti ti-microphone" aria-hidden="true" /> Voice message
                                </span>
                            ) : (
                                <span className="team-chats-widget__row-preview">{chat.preview}</span>
                            )}
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
