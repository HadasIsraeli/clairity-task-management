import { Card, C } from '../ui';
import profile1 from '../assets/figma/profile-1.png';
import profile2 from '../assets/figma/profile-2.png';
import profile3 from '../assets/figma/profile-3.png';
import profile4 from '../assets/figma/profile-4.png';
import profile5 from '../assets/figma/profile-5.png';
import voiceIcon from '../assets/figma/voice-icon.svg';

// Illustrative team roster + chat preview chrome — static, not wired to any
// real chat backend. Mirrors the Figma "Team / Chats" widget (node 265:7621),
// including its real profile photos and per-person presence colors.
const TEAM = [
    { photo: profile1, presence: C.red },
    { photo: profile2, presence: C.green },
    { photo: profile3, presence: C.green },
    { photo: profile4, presence: C.yellow },
    { photo: profile5, presence: C.yellow },
];

const CHATS = [
    { photo: profile2, presence: C.green, name: 'Gali Cohen', preview: 'Awesome 🔥', time: '10:40', unread: 1 },
    { photo: profile3, presence: C.green, name: 'Daria Shmueli', preview: 'voice', time: '10:55', unread: 2 },
];

export function TeamChatsWidget({ maxHeight }) {
    return (
        <Card
            padding="lg"
            className="team-chats-widget"
            style={maxHeight ? { maxHeight, overflowY: 'auto' } : undefined}
        >
            <span className="title-sm text-ter" style={{ letterSpacing: '0.06em', textTransform: 'uppercase' }}>Team</span>
            <div className="team-chats-widget__avatars">
                {TEAM.map((member, i) => (
                    <div
                        key={i}
                        className="team-chats-widget__avatar-wrap"
                        style={{ marginLeft: i === 0 ? 0 : -8, zIndex: TEAM.length - i }}
                    >
                        <img src={member.photo} alt="" className="team-chats-widget__photo" />
                        <span className="team-chats-widget__presence" style={{ background: member.presence }} />
                    </div>
                ))}
            </div>

            <span className="title-sm text-ter" style={{ letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 16, display: 'block' }}>Chats</span>
            <div className="team-chats-widget__list">
                {CHATS.map((chat) => (
                    <div key={chat.name} className="team-chats-widget__row">
                        <div className="team-chats-widget__avatar-wrap">
                            <img src={chat.photo} alt="" className="team-chats-widget__photo team-chats-widget__photo--sm" />
                            <span className="team-chats-widget__presence" style={{ background: chat.presence }} />
                        </div>
                        <div className="team-chats-widget__row-body">
                            <span className="team-chats-widget__row-name">{chat.name}</span>
                            {chat.preview === 'voice' ? (
                                <span className="team-chats-widget__row-preview">
                                    <img src={voiceIcon} alt="" className="team-chats-widget__voice-icon" /> Voice message
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
