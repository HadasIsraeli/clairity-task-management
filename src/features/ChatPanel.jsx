import { useEffect, useRef, useState } from 'react';
import { C } from '../constants/theme';
import { callClaude, SYS_CHAT } from '../lib/claude';

const QUICK = [
    "What's the biggest sprint risk right now?",
    "How should I handle TM-112 being over estimate?",
    "What are my options for the blocked TM-119?",
    "Will we ship Sprint 24 on time?",
];

export function ChatPanel({ open, onClose, msgs, setMsgs }) {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [msgs, open]);

    const send = async (text) => {
        const trimmed = text.trim();
        if (!trimmed || loading) return;

        const next = [...msgs, { role: 'user', content: trimmed }];
        setMsgs(next);
        setInput('');
        setLoading(true);

        try {
            const reply = await callClaude(SYS_CHAT, next.map((m) => ({ role: m.role, content: m.content })));
            setMsgs((previous) => [...previous, { role: 'assistant', content: reply }]);
        } catch {
            setMsgs((previous) => [...previous, { role: 'assistant', content: "I'm having a moment — please try again and I'll be right back." }]);
        } finally {
            setLoading(false);
        }
    };

    const showQuickQuestions = msgs.length === 1 && msgs[0]?.role === 'assistant';

    return (
        <div className={`chat-panel${open ? ' chat-panel--open' : ''}`}>
            <div className="chat-panel__content">
                <div className="chat-panel__header">
                    <div className="chat-avatar">
                        <i className="ti ti-sparkles" style={{ fontSize: 16, color: C.indigo }} aria-hidden="true" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div className="chat-panel__title">Clairity</div>
                        <div className="chat-panel__subtitle">
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.green, boxShadow: `0 0 5px ${C.green}` }} />
                            Monitoring Sprint 24
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close Clairity"
                        className="chat-panel__close"
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; e.currentTarget.style.color = C.textPri; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = C.textSec; }}
                    >
                        <i className="ti ti-x" style={{ fontSize: 14, color: C.textSec }} aria-hidden="true" />
                    </button>
                </div>

                <div className="chat-panel__body" role="log" aria-live="polite">
                    {msgs.map((message, index) => (
                        <div
                            key={index}
                            className={`chat-message${message.role === 'user' ? ' chat-message--user' : ''}`}
                        >
                            {message.role === 'assistant' && (
                                <div className="chat-avatar" style={{ marginTop: 2 }}>
                                    <i className="ti ti-sparkles" style={{ fontSize: 12, color: C.indigo }} aria-hidden="true" />
                                </div>
                            )}
                            <div className={`chat-bubble${message.role === 'user' ? ' chat-bubble--user' : ''}`}>
                                {message.content}
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="chat-panel__loader">
                            <div className="chat-avatar">
                                <i className="ti ti-sparkles" style={{ fontSize: 12, color: C.indigo }} aria-hidden="true" />
                            </div>
                            <div className="chat-panel__loader-dots">
                                {[0, 1, 2].map((frame) => (
                                    <span key={frame} />
                                ))}
                            </div>
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>

                {showQuickQuestions && (
                    <div className="chat-panel__quick">
                        <p className="chat-panel__quick-label">Quick questions</p>
                        {QUICK.map((question, index) => (
                            <button
                                key={index}
                                onClick={() => send(question)}
                                className="chat-panel__quick-button"
                                onMouseEnter={(e) => { e.currentTarget.style.background = C.indigoDim; e.currentTarget.style.borderColor = C.indigo + '30'; e.currentTarget.style.color = C.textPri; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.025)'; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSec; }}
                            >
                                {question}
                            </button>
                        ))}
                    </div>
                )}

                <div className="chat-panel__input-row">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), send(input))}
                        placeholder="Ask Clairity about risks, dependencies, workload…"
                        className="chat-panel__input"
                    />
                    <button
                        onClick={() => send(input)}
                        disabled={!input.trim() || loading}
                        className={`chat-panel__send${!input.trim() || loading ? ' chat-panel__send--disabled' : ''}`}
                    >
                        <i className="ti ti-send" style={{ fontSize: 15, color: input.trim() ? C.textPri : C.textTer }} aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    );
}
