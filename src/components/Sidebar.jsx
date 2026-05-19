import { useState } from 'react';
import { Avatar } from './Avatar';
import { Tip } from './Tip';
import { C } from '../constants/theme';

const NAV_TOP = [
    { icon: 'layout-dashboard', label: 'Dashboard', view: 'dashboard' },
    { icon: 'calendar-stats', label: 'Sprint Overview', view: null },
    { icon: 'checklist', label: 'Tasks', view: null },
    { icon: 'users-group', label: 'Teams', view: null },
];

const NAV_MID = [
    { icon: 'git-branch', label: 'Dependencies', view: null },
    { icon: 'alert-triangle', label: 'Risks & Delays', view: null },
    { icon: 'sparkles', label: 'AI Insights', view: null },
    { icon: 'chart-bar', label: 'Analytics', view: null },
];

function NavItem({ icon, label, active, onClick, collapsed }) {
    const [hover, setHover] = useState(false);
    const button = (
        <button onClick={onClick} aria-label={label} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 9, justifyContent: collapsed ? 'center' : 'flex-start', padding: collapsed ? '8px 0' : '7px 11px', borderRadius: 7, border: 'none', outline: 'none', background: active ? 'rgba(43,176,230,0.11)' : hover ? 'rgba(255,255,255,0.055)' : 'transparent', cursor: onClick ? 'pointer' : 'default', transition: 'background 0.15s', textAlign: 'left' }}>
            <i className={`ti ti-${icon}`} style={{ fontSize: 16, flexShrink: 0, color: active ? C.teal : hover ? C.textSec : C.textTer, transition: 'color 0.15s' }} aria-hidden="true" />
            <span style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: active ? C.teal : hover ? C.textSec : C.textTer, whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: collapsed ? 0 : 160, opacity: collapsed ? 0 : 1, transition: 'max-width 0.25s ease, opacity 0.18s ease', display: 'block' }}>
                {label}
            </span>
        </button>
    );

    return collapsed ? <Tip text={label}>{button}</Tip> : button;
}

export function Sidebar({ view, setView, collapsed, setCollapsed }) {
    return (
        <div style={{ width: collapsed ? 56 : 220, background: C.bgNav, borderRight: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', padding: collapsed ? '13px 8px' : '13px 10px', flexShrink: 0, transition: 'width 0.25s ease, padding 0.25s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', gap: 9, padding: collapsed ? '2px 0' : '2px 3px', marginBottom: 20, overflow: 'hidden' }}>
                <div style={{ width: 29, height: 29, borderRadius: 8, flexShrink: 0, background: `linear-gradient(135deg,${C.indigo},${C.teal})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="ti ti-sparkles" style={{ fontSize: 14, color: '#fff' }} aria-hidden="true" />
                </div>
                <span style={{ fontSize: 17, fontWeight: 700, color: C.textPri, whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: collapsed ? 0 : 120, opacity: collapsed ? 0 : 1, transition: 'max-width 0.25s ease, opacity 0.18s ease', display: 'block' }}>
                    Clairity
                </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {NAV_TOP.map((item) => (
                    <NavItem key={item.icon} {...item} collapsed={collapsed} active={view === item.view} onClick={() => item.view && setView(item.view)} />
                ))}
            </div>

            <div style={{ height: 1, background: C.border, margin: '8px 3px' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {NAV_MID.map((item) => (
                    <NavItem key={item.icon} {...item} collapsed={collapsed} active={false} onClick={() => { }} />
                ))}
            </div>

            <div style={{ marginTop: 'auto' }}>
                <div style={{ height: 1, background: C.border, margin: '8px 3px' }} />
                <NavItem icon="settings" label="Settings" active={false} collapsed={collapsed} onClick={() => { }} />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', gap: 9, padding: collapsed ? '8px 0' : '8px 11px', marginTop: 2, overflow: 'hidden' }}>
                    <Avatar initials="AL" color={C.indigo} size={26} />
                    <div style={{ overflow: 'hidden', maxWidth: collapsed ? 0 : 120, opacity: collapsed ? 0 : 1, transition: 'max-width 0.25s ease, opacity 0.18s ease' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: C.textSec, whiteSpace: 'nowrap' }}>Alon M.</div>
                        <div style={{ fontSize: 11, color: C.textTer, whiteSpace: 'nowrap' }}>R&D Manager</div>
                    </div>
                </div>

                <button onClick={() => setCollapsed((prev) => !prev)} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', gap: 7, padding: collapsed ? '6px 0' : '6px 11px', background: 'none', border: 'none', outline: 'none', cursor: 'pointer', borderRadius: 7, marginTop: 2, transition: 'all 0.15s' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}>
                    <i className={`ti ${collapsed ? 'ti-layout-sidebar-right' : 'ti-layout-sidebar-left'}`} style={{ fontSize: 15, color: C.textTer }} aria-hidden="true" />
                    <span style={{ fontSize: 12, color: C.textTer, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: collapsed ? 0 : 80, opacity: collapsed ? 0 : 1, transition: 'max-width 0.25s ease, opacity 0.18s ease', display: 'block' }}>
                        Collapse
                    </span>
                </button>
            </div>
        </div>
    );
}
