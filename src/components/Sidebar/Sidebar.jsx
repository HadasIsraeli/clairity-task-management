import { useState } from 'react';
import { Avatar, C, Tooltip } from '../../ui/index';
import { NavLink } from 'react-router-dom';

const NAV_TOP = [
    { icon: 'layout-dashboard', label: 'Dashboard', to: '/' },
    { icon: 'calendar-stats', label: 'Sprint Overview', to: null },
    { icon: 'checklist', label: 'Tasks', to: '/tasks' },
    { icon: 'users-group', label: 'Teams', to: null },
];

const NAV_MID = [
    { icon: 'git-branch', label: 'Dependencies', to: '/dependencies' },
    { icon: 'alert-triangle', label: 'Risks & Delays', to: null },
    { icon: 'sparkles', label: 'AI Insights', to: null },
    { icon: 'chart-bar', label: 'Analytics', to: null },
];

function NavItem({ icon, label, to, collapsed }) {
    const [hover, setHover] = useState(false);

    const content = (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: collapsed ? 0 : 9,
                justifyContent: collapsed ? 'center' : 'flex-start',
                padding: collapsed ? '8px 0' : '7px 11px',
                borderRadius: 7,
                textAlign: 'left',
            }}
        >
            <i className={`ti ti-${icon} nav-button__icon`} style={{ color: hover ? C.textSec : C.textTer, fontSize: 16 }} aria-hidden="true" />
            <span style={{ fontSize: 13, fontWeight: 500, color: hover ? C.textSec : C.textTer, whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: collapsed ? 0 : 160, opacity: collapsed ? 0 : 1, transition: 'max-width 0.25s ease, opacity 0.18s ease', display: 'block' }}>{label}</span>
        </div>
    );

    if (!to) return collapsed ? <Tooltip text={label}>{content}</Tooltip> : content;

    return (
        <NavLink to={to} style={{ textDecoration: 'none' }} className={({ isActive }) => (isActive ? 'sidebar__item sidebar__item--active' : 'sidebar__item')}>
            {content}
        </NavLink>
    );
}

export function Sidebar({ collapsed, setCollapsed }) {
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
                    <NavItem key={item.icon} icon={item.icon} label={item.label} to={item.to} collapsed={collapsed} />
                ))}
            </div>

            <div className="sidebar__divider" />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {NAV_MID.map((item) => (
                    <NavItem key={item.icon} icon={item.icon} label={item.label} to={item.to} collapsed={collapsed} />
                ))}
            </div>

            <div style={{ marginTop: 'auto' }}>
                <div className="sidebar__divider" />
                <NavItem icon="settings" label="Settings" to="/settings" collapsed={collapsed} />

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
                    <i className={`ti ${collapsed ? 'ti-layout-sidebar-left-expand' : 'ti-layout-sidebar-left-collapse'}`} style={{ fontSize: 15, color: C.textTer }} aria-hidden="true" />
                </button>
            </div>
        </div>
    );
}
