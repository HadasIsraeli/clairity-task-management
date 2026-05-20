import { useState } from 'react';
import { C, F } from '../constants/theme';
import { Sidebar } from '../components/Sidebar';
import { Dashboard } from './Dashboard';
import { TaskView } from './TaskView';
import { ChatPanel } from './ChatPanel';
import { Pill } from '../components/Pill';
import { SPRINT, TASKS } from '../data/tasks';

export default function ClairityApp() {
    const [view, setView] = useState('dashboard');
    const [chatOpen, setChatOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [msgs, setMsgs] = useState([
        {
            role: 'assistant',
            content: "Hi Alon 👋 I'm Clairity, your sprint intelligence advisor. I've already reviewed Sprint 24 and I'm seeing two tasks that could use your attention before the week is out. Want to start there, or is there something else on your mind?",
        },
    ]);

    const activeTask = view === 'inProgress' ? TASKS.inProgress : TASKS.todo;

    return (
        <div className="app-shell" style={{ background: C.bg, color: C.textPri, fontFamily: F }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Afacad:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button, input { font-family: ${F}; }
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius: 2px; }
        @keyframes blink { 0%,80%,100%{opacity:0.15} 40%{opacity:0.9} }
      `}</style>
            <h2 className="sr-only">Clairity — AI sprint intelligence for engineering managers</h2>

            <Sidebar view={view} setView={setView} collapsed={collapsed} setCollapsed={setCollapsed} />

            <div className="app-column app-main">
                <div className="app-toolbar">
                    <div className="page-header">
                        <span style={{ fontSize: 13, fontWeight: 700, color: C.textPri }}>
                            {view === 'dashboard' ? 'Dashboard' : view === 'inProgress' ? 'TM-112' : 'TM-119'}
                        </span>
                        <i className="ti ti-chevron-right" style={{ fontSize: 11, color: C.textTer }} aria-hidden="true" />
                        <span className="page-header__trail">{view === 'dashboard' ? SPRINT.name : activeTask.title}</span>
                    </div>
                    <div className="page-meta">
                        <Pill label={`${SPRINT.daysLeft}d left`} color={C.yellow} small />
                        <Pill label={`${SPRINT.atRisk} at risk`} color={C.red} small />
                    </div>
                </div>

                <main className="app-content">
                    {view === 'dashboard' && <Dashboard onOpen={(taskKey) => setView(taskKey)} />}
                    {view === 'inProgress' && <TaskView taskKey="inProgress" onBack={() => setView('dashboard')} />}
                    {view === 'todo' && <TaskView taskKey="todo" onBack={() => setView('dashboard')} />}
                </main>
            </div>

            <ChatPanel open={chatOpen} onClose={() => setChatOpen(false)} msgs={msgs} setMsgs={setMsgs} />

            {!chatOpen && (
                <button
                    onClick={() => setChatOpen(true)}
                    title="Chat with Clairity"
                    className="floating-action"
                    style={{ background: `linear-gradient(135deg,${C.indigo},${C.teal})`, boxShadow: `0 4px 18px ${C.indigo}55, 0 0 0 4px ${C.indigo}25` }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.08)';
                        e.currentTarget.style.boxShadow = `0 6px 26px ${C.indigo}75, 0 0 0 6px ${C.indigo}35`;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = `0 4px 18px ${C.indigo}55, 0 0 0 4px ${C.indigo}25`;
                    }}
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
