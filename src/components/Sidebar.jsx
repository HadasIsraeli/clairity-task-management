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

    return (
        <Tip text={collapsed ? label : ''}>
            <button
                onClick={onClick}
                aria-label={label}
                className={`sidebar__item ${active ? 'sidebar__item--active nav-button--active' : ''} ${collapsed ? 'nav-button--collapsed' : ''}`}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{ gap: collapsed ? 0 : 9, justifyContent: collapsed ? 'center' : 'flex-start' }}
            >
                <i className={`ti ti-${icon} nav-button__icon`} style={{ color: active ? C.teal : hover ? C.textSec : C.textTer }} aria-hidden="true" />
                <span className="nav-button__label" style={{ maxWidth: collapsed ? 0 : 160, opacity: collapsed ? 0 : 1 }}>
                    {label}
                </span>
            </button>
        </Tip>
    );
}

export function Sidebar({ view, setView, collapsed, setCollapsed }) {
    return (
        <div className="sidebar" style={{ width: collapsed ? 56 : 220, padding: collapsed ? '13px 8px' : '13px 10px', background: C.bgNav, borderRight: `1px solid ${C.border}` }}>
            <div className="sidebar__brand" style={{ justifyContent: collapsed ? 'center' : 'flex-start', padding: collapsed ? '2px 0' : '2px 3px' }}>
                <div className="icon-box icon-box--large" style={{ background: `linear-gradient(135deg,${C.indigo},${C.teal})` }}>
                    <i className="ti ti-sparkles" style={{ fontSize: 14, color: '#fff' }} aria-hidden="true" />
                </div>
                <span className="sidebar__brand-name" style={{ maxWidth: collapsed ? 0 : 120, opacity: collapsed ? 0 : 1 }}>
                    Clairity
                </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {NAV_TOP.map((item) => (
                    <NavItem key={item.icon} {...item} collapsed={collapsed} active={view === item.view} onClick={() => item.view && setView(item.view)} />
                ))}
            </div>

            <div className="sidebar__divider" />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {NAV_MID.map((item) => (
                    <NavItem key={item.icon} {...item} collapsed={collapsed} active={false} onClick={() => { }} />
                ))}
            </div>

            <div style={{ marginTop: 'auto' }}>
                <div className="sidebar__divider" />
                <NavItem icon="settings" label="Settings" collapsed={collapsed} active={false} onClick={() => { }} />

                <div className="sidebar__account" style={{ justifyContent: collapsed ? 'center' : 'flex-start', padding: collapsed ? '8px 0' : '8px 11px' }}>
                    <Avatar initials="AL" color={C.indigo} size={26} />
                    <div style={{ maxWidth: collapsed ? 0 : 120, opacity: collapsed ? 0 : 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: C.textSec, whiteSpace: 'nowrap' }}>Alon M.</div>
                        <div style={{ fontSize: 11, color: C.textTer, whiteSpace: 'nowrap' }}>R&D Manager</div>
                    </div>
                </div>

                <button
                    onClick={() => setCollapsed((prev) => !prev)}
                    aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    className={`sidebar__toggle ${collapsed ? 'sidebar__toggle--collapsed' : ''}`}
                    style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
                >
                    <i className={`ti ${collapsed ? 'ti-layout-sidebar-right' : 'ti-layout-sidebar-left'}`} style={{ fontSize: 15, color: C.textTer }} aria-hidden="true" />
                    <span className="sidebar__toggle-label" style={{ maxWidth: collapsed ? 0 : 80, opacity: collapsed ? 0 : 1 }}>
                        Collapse
                    </span>
                </button>
            </div>
        </div>
    );
}
