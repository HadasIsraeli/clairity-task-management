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
        if (!text.trim() || loading) return;
        const next = [...msgs, { role: 'user', content: text }];
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

    return (
        <div style={{ width: open ? 380 : 0, flexShrink: 0, overflow: 'hidden', transition: 'width 0.28s cubic-bezier(0.4,0,0.2,1)', borderLeft: open ? `1px solid ${C.borderMid}` : 'none', background: C.bgNav, display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: 380, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '14px 18px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 10, background: C.indigoDim, flexShrink: 0 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 10, background: C.indigo + '22', border: `1.5px solid ${C.indigo}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <i className="ti ti-sparkles" style={{ fontSize: 16, color: C.indigo }} aria-hidden="true" />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 15, fontWeight: 700, color: C.textPri }}>Clairity</div>
                        <div style={{ fontSize: 12, color: C.indigo, display: 'flex', alignItems: 'center', gap: 5 }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.green, boxShadow: `0 0 5px ${C.green}`, display: 'inline-block' }} />
                            Monitoring Sprint 24
                        </div>
                    </div>
                    <button onClick={onClose} aria-label="Close Clairity" style={{ width: 28, height: 28, borderRadius: 7, background: 'rgba(255,255,255,0.05)', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: C.textSec, flexShrink: 0, outline: 'none' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; e.currentTarget.style.color = C.textPri; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = C.textSec; }}>
                        <i className="ti ti-x" style={{ fontSize: 14, color: C.textSec }} aria-hidden="true" />
                    </button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {msgs.map((message, index) => (
                        <div key={index} style={{ display: 'flex', gap: 9, flexDirection: message.role === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-start' }}>
                            {message.role === 'assistant' && (
                                <div style={{ width: 26, height: 26, borderRadius: 8, background: C.indigo + '22', border: `1px solid ${C.indigo}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                                    <i className="ti ti-sparkles" style={{ fontSize: 12, color: C.indigo }} aria-hidden="true" />
                                </div>
                            )}
                            <div style={{ maxWidth: '80%', padding: '10px 13px', borderRadius: message.role === 'user' ? '12px 4px 12px 12px' : '4px 12px 12px 12px', background: message.role === 'user' ? C.indigoDim : C.cardAlt, border: `1px solid ${message.role === 'user' ? C.indigo + '28' : C.border}`, fontSize: 14, color: C.textSec, lineHeight: 1.7 }}>
                                {message.content}
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                            <div style={{ width: 26, height: 26, borderRadius: 8, background: C.indigo + '22', border: `1px solid ${C.indigo}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <i className="ti ti-sparkles" style={{ fontSize: 12, color: C.indigo }} aria-hidden="true" />
                            </div>
                            <div style={{ padding: '11px 14px', borderRadius: '4px 12px 12px 12px', background: C.cardAlt, border: `1px solid ${C.border}`, display: 'flex', gap: 5 }}>
                                {[0, 1, 2].map((frame) => (
                                    <span key={frame} style={{ width: 6, height: 6, borderRadius: '50%', background: C.indigo, display: 'inline-block', opacity: 0.6, animation: `blink 1.2s ease ${frame * 0.2}s infinite` }} />
                                ))}
                            </div>
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>

                {msgs.length === 1 && (
                    <div style={{ padding: '0 18px 12px', display: 'flex', flexDirection: 'column', gap: 5 }}>
                        <p style={{ fontSize: 11, fontWeight: 700, color: C.textTer, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 4px' }}>Quick questions</p>
                        {QUICK.map((question, index) => (
                            <button key={index} onClick={() => send(question)} style={{ textAlign: 'left', padding: '8px 12px', background: 'rgba(255,255,255,0.025)', border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, color: C.textSec, cursor: 'pointer', fontFamily: 'Afacad,Inter,system-ui,sans-serif', lineHeight: 1.45, outline: 'none' }} onMouseEnter={(e) => { e.currentTarget.style.background = C.indigoDim; e.currentTarget.style.borderColor = C.indigo + '30'; e.currentTarget.style.color = C.textPri; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.025)'; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSec; }}>
                                {question}
                            </button>
                        ))}
                    </div>
                )}

                <div style={{ padding: '13px 18px', borderTop: `1px solid ${C.border}`, display: 'flex', gap: 8, flexShrink: 0, background: C.bgNav }}>
                    <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), send(input))} placeholder="Ask Clairity about risks, dependencies, workload…" style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.borderMid}`, borderRadius: 8, padding: '9px 13px', color: C.textPri, fontSize: 14, outline: 'none', fontFamily: 'Afacad,Inter,system-ui,sans-serif', caretColor: C.indigo }} />
                    <button onClick={() => send(input)} disabled={!input.trim() || loading} style={{ width: 40, height: 40, borderRadius: 8, flexShrink: 0, border: 'none', outline: 'none', background: input.trim() ? C.indigo : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: input.trim() ? 'pointer' : 'default', transition: 'background 0.2s' }}>
                        <i className="ti ti-send" style={{ fontSize: 15, color: input.trim() ? C.textPri : C.textTer }} aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    );
}
