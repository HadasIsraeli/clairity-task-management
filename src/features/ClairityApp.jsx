import { useState } from 'react';
import { C, F } from '../constants/theme';
import { Sidebar } from '../components/Sidebar';
import { ChatPanel } from './ChatPanel';
import { Pill } from '../components/Pill';
import { SPRINT, TASKS, ALL_TASKS } from '../data/tasks';
import { Outlet, useLocation } from 'react-router-dom';

export default function ClairityApp() {
    const [chatOpen, setChatOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [msgs, setMsgs] = useState([
        {
            role: 'assistant',
            content:
                "Hi Alon 👋 I'm Clairity, your sprint intelligence advisor. I've already reviewed Sprint 24 and I'm seeing two tasks that could use your attention before the week is out. Want to start there, or is there something else on your mind?",
        },
    ]);

    const location = useLocation();
    const path = location.pathname || '/';

    let leftLabel = 'Dashboard';
    let rightLabel = SPRINT.name;
    if (path.startsWith('/task/')) {
        const id = path.replace('/task/', '').split('/')[0];
        leftLabel = id || 'Task';
        if (id === TASKS.inProgress.id) rightLabel = TASKS.inProgress.title;
        else if (id === TASKS.todo.id) rightLabel = TASKS.todo.title;
        else {
            const found = ALL_TASKS.find((t) => t.id === id);
            if (found) rightLabel = found.title;
        }
    } else if (path === '/settings') {
        leftLabel = 'Settings';
        rightLabel = '';
    }

    return (
        <div className="app-shell" style={{ color: C.textPri, fontFamily: F }}>
            <h2 className="sr-only">Clairity — AI sprint intelligence for engineering managers</h2>

            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

            <div className="app-column app-main">
                <div className="app-toolbar">
                    <div className="page-header">
                        <span style={{ fontSize: 13, fontWeight: 700, color: C.textPri }}>{leftLabel}</span>
                        <i className="ti ti-chevron-right" style={{ fontSize: 11, color: C.textTer }} aria-hidden="true" />
                        <span className="page-header__trail">{rightLabel}</span>
                    </div>
                    <div className="page-meta">
                        <Pill label={`${SPRINT.daysLeft}d left`} color={C.yellow} small />
                        <Pill label={`${SPRINT.atRisk} at risk`} color={C.red} small />
                    </div>
                </div>

                <main className="app-content">
                    <Outlet />
                </main>
            </div>

            <ChatPanel open={chatOpen} onClose={() => setChatOpen(false)} msgs={msgs} setMsgs={setMsgs} />

            {!chatOpen && (
                <button
                    onClick={() => setChatOpen(true)}
                    title="Chat with Clairity"
                    className="floating-action"
                    style={{ background: `linear-gradient(135deg,${C.indigo},${C.teal})`, boxShadow: `0 4px 18px ${C.indigo}55, 0 0 0 4px ${C.indigo}25` }}
                >
                    <i className="ti ti-sparkles" style={{ fontSize: 22, color: '#fff' }} aria-hidden="true" />
                    <span
                        style={{
                            position: 'absolute',
                            top: -2,
                            right: -2,
                            width: 14,
                            height: 14,
                            borderRadius: '50%',
                            background: C.red,
                            border: `2px solid ${C.bg}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 8,
                            color: '#fff',
                            fontWeight: 700,
                        }}
                    >
                        2
                    </span>
                </button>
            )}
        </div>
    );
}
