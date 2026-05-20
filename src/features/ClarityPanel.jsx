import { useEffect, useRef, useState } from 'react';
import { C } from '../constants/theme';
import { SPRINT } from '../data/tasks';
import { CtaButton } from '../components/CtaButton';
import { callClaude, SYS_TASK } from '../lib/claude';

export function ClarityPanel({ task }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetched = useRef(false);

  const impactCfg = {
    high: { color: C.teal, dim: C.tealDim },
    medium: { color: C.indigo, dim: C.indigoDim },
    low: { color: C.green, dim: C.greenDim },
  };

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    setLoading(true);

    const isIP = task.status === 'In Progress';
    const msg = isIP
      ? `Task: "${task.title}" | In Progress | Assignee: ${task.assignee.name} | Original: ${task.originalEstimate}h | AI estimate: ${task.aiEstimateHours}h | Actual: ${task.actualHours}h | ${SPRINT.daysLeft} days left | Steps remaining: ${task.steps.filter((s) => !s.done).length}/${task.steps.length}`
      : `Task: "${task.title}" | To Do | Assignee: ${task.assignee.name} | AI estimate: ${task.aiEstimateHours}h | Sprint capacity: ~11h | Blocked by: "${task.dependency.title}" (${task.dependency.assignee}, ${task.dependency.team}) — ${task.dependency.status}`;

    callClaude(SYS_TASK, [{ role: 'user', content: msg }])
      .then((t) => {
        const d = JSON.parse(t.replace(/```json|```/g, '').trim());
        d.actions = (d.actions || []).slice(0, 3);
        setData(d);
      })
      .catch(() =>
        setData({
          headline: "I'll reconnect in a moment.",
          insight: 'Try refreshing — I am here.',
          actions: [],
          mentorNote: null,
        }),
      )
      .finally(() => setLoading(false));
  }, [task]);

  const showBlockedFallback = task.id === 'TM-119';

  const renderAction = (action, index) => {
    const impact = impactCfg[action.impact] || impactCfg.medium;
    return (
      <div
        key={index}
        className={`panel__action-card${action.recommended ? ' panel__action-card--recommended' : ''}`}
      >
        <p className="title-md" style={{ margin: '0 0 4px', color: C.textPri, lineHeight: 1.35 }}>
          {action.label}
        </p>
        <div className="flex-between" style={{ marginBottom: 5 }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              padding: '1px 7px',
              borderRadius: 20,
              background: action.recommended ? C.greenDim : 'transparent',
              color: action.recommended ? C.green : C.textSec,
              border: action.recommended ? `1px solid ${C.green}22` : 'none',
            }}
          >
            {action.recommended ? '✓ Recommended' : <span />}
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              padding: '1px 8px',
              borderRadius: 20,
              background: impact.dim,
              color: impact.color,
              border: `1px solid ${impact.color}22`,
            }}
          >
            {action.impact} impact
          </span>
        </div>
        <p style={{ margin: action.cta ? '0 0 7px' : 0, color: C.textSec, fontSize: 13, lineHeight: 1.55 }}>
          {action.detail}
        </p>
        {action.cta && (
          <div className="flex" style={{ justifyContent: 'flex-end' }}>
            <CtaButton label={action.cta} recommended={action.recommended} />
          </div>
        )}
      </div>
    );
  };

  if (showBlockedFallback) {
    return (
      <div
        className="panel"
        style={{
          marginBottom: 14,
          background: 'rgb(13, 23, 41)',
          borderColor: 'rgba(255, 255, 255, 0.055)',
          boxShadow: 'rgba(90, 79, 207, 0.063) 0px 0px 0px 1px, rgba(90, 79, 207, 0.024) 0px 8px 28px',
        }}
      >
        <div className="panel__header" style={{ background: 'rgba(90, 79, 207, 0.11)' }}>
          <div className="icon-box icon-box--large" style={{ width: 22, height: 22, borderRadius: 6, background: 'rgba(90, 79, 207, 0.157)' }}>
            <i className="ti ti-sparkles" style={{ fontSize: 12, color: C.indigo }} aria-hidden="true" />
          </div>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.indigo, letterSpacing: '0.06em' }}>CLAIRITY</span>
            <span style={{ display: 'inline-block', marginLeft: 7, fontSize: 11, color: C.indigo, opacity: 0.6 }}>
              Sprint Intelligence Advisor
            </span>
          </div>
        </div>

        <div className="panel__body">
          <p className="panel__title" style={{ color: '#E4EDFF' }}>
            Deployment blocked before it can begin.
          </p>
          <p className="panel__text" style={{ color: 'rgb(150, 175, 204)' }}>
            The 14h estimate already exceeds sprint capacity, and the upstream dependency hasn't started yet. This task needs either unblocking coordination or a scope decision before Daria can move forward.
          </p>

          <div className="panel__callout" style={{ background: 'rgba(90, 79, 207, 0.11)', border: '1px solid rgba(90, 79, 207, 0.125)' }}>
            <i className="ti ti-quote" style={{ fontSize: 13, color: C.indigo }} aria-hidden="true" />
            <p style={{ margin: 0, color: C.indigo, lineHeight: 1.6, fontStyle: 'italic', opacity: 0.88 }}>
              I'd prioritize the sync first — unblocking Rotem's work is the lever that makes everything else possible.
            </p>
          </div>

          <p className="title-sm text-ter" style={{ margin: '0 0 7px', letterSpacing: '0.09em', textTransform: 'uppercase' }}>
            Suggested actions
          </p>

          <div className="stack stack-gap-6">
            <div className="panel__action-card panel__action-card--recommended" style={{ borderColor: 'rgba(39, 201, 154, 0.157)' }}>
              <p className="title-md" style={{ margin: '0 0 4px', color: '#E4EDFF' }}>Sync with Rotem's team</p>
              <div className="flex-between" style={{ marginBottom: 5 }}>
                <span className="badge badge--small" style={{ background: 'rgba(39, 201, 154, 0.1)', color: C.green, border: '1px solid rgba(39, 201, 154, 0.133)' }}>
                  ✓ Recommended
                </span>
                <span className="badge badge--small" style={{ background: 'rgba(43, 176, 230, 0.1)', color: C.teal, border: '1px solid rgba(43, 176, 230, 0.133)' }}>
                  high impact
                </span>
              </div>
              <p style={{ margin: '0 0 7px', color: C.textSec, fontSize: 13, lineHeight: 1.55 }}>
                Align on API Gateway timeline before sprint ends
              </p>
              <div className="flex" style={{ justifyContent: 'flex-end' }}>
                <button className="button button--ghost button--small" style={{ borderColor: 'rgba(43, 176, 230, 0.25)', color: C.teal, background: 'rgba(43, 176, 230, 0.1)' }}>
                  Schedule a sync →
                </button>
              </div>
            </div>

            <div className="panel__action-card" style={{ borderColor: 'rgba(255, 255, 255, 0.055)' }}>
              <div className="flex-between" style={{ marginBottom: 5 }}>
                <span />
                <span className="badge badge--small" style={{ background: 'rgba(90, 79, 207, 0.11)', color: C.indigo, border: '1px solid rgba(90, 79, 207, 0.133)' }}>
                  medium impact
                </span>
              </div>
              <p className="title-md" style={{ margin: '0 0 4px', color: '#E4EDFF' }}>
                Reduce deployment scope
              </p>
              <p style={{ margin: '0 0 7px', color: C.textSec, fontSize: 13, lineHeight: 1.55 }}>
                Scope to partial staging deploy within 11h capacity
              </p>
              <div className="flex" style={{ justifyContent: 'flex-end' }}>
                <button className="button button--ghost button--small" style={{ borderColor: 'rgba(255, 255, 255, 0.055)', color: C.textSec }}>
                  Reduce scope →
                </button>
              </div>
            </div>

            <div className="panel__action-card" style={{ borderColor: 'rgba(255, 255, 255, 0.055)' }}>
              <div className="flex-between" style={{ marginBottom: 5 }}>
                <span />
                <span className="badge badge--small" style={{ background: 'rgba(39, 201, 154, 0.1)', color: C.green, border: '1px solid rgba(39, 201, 154, 0.133)' }}>
                  low impact
                </span>
              </div>
              <p className="title-md" style={{ margin: '0 0 4px', color: '#E4EDFF' }}>
                Move to next sprint
              </p>
              <p style={{ margin: '0 0 7px', color: C.textSec, fontSize: 13, lineHeight: 1.55 }}>
                Defer until dependency is resolved and capacity fits
              </p>
              <div className="flex" style={{ justifyContent: 'flex-end' }}>
                <button className="button button--ghost button--small" style={{ borderColor: 'rgba(255, 255, 255, 0.055)', color: C.textSec }}>
                  Move to next sprint →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="panel panel--glow" style={{ marginBottom: 14, '--glow': C.indigo }}>
      <div className="panel__header">
        <div className="icon-box icon-box--large" style={{ background: C.indigo + '28' }}>
          <i className="ti ti-sparkles" style={{ fontSize: 12, color: C.indigo }} aria-hidden="true" />
        </div>
        <div>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.indigo, letterSpacing: '0.06em' }}>CLAIRITY</span>
          <span style={{ display: 'inline-block', marginLeft: 7, fontSize: 11, color: C.indigo, opacity: 0.6 }}>
            Sprint Intelligence Advisor
          </span>
        </div>
        {loading && <span style={{ marginLeft: 'auto', fontSize: 11, color: C.textTer }}>Reviewing…</span>}
      </div>

      {loading && (
        <div className="panel__body">
          {[65, 45, 80, 38].map((width, index) => (
            <div
              key={index}
              style={{
                height: 10,
                width: `${width}%`,
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 4,
                marginBottom: 10,
              }}
            />
          ))}
        </div>
      )}

      {data && (
        <div className="panel__body">
          <p className="panel__title">{data.headline}</p>
          <p className="panel__text">{data.insight}</p>

          <p className="title-sm text-ter" style={{ margin: '0 0 7px', letterSpacing: '0.09em', textTransform: 'uppercase' }}>
            Suggested actions
          </p>

          <div className="stack stack-gap-6" style={{ marginBottom: 12 }}>
            {data.actions.map((action, index) => renderAction(action, index))}
          </div>

          {data.mentorNote && (
            <div className="panel__callout" style={{ background: C.indigoDim, border: `1px solid ${C.indigo}20` }}>
              <i className="ti ti-quote" style={{ fontSize: 13, color: C.indigo }} aria-hidden="true" />
              <p style={{ margin: 0, color: C.indigo, lineHeight: 1.6, fontStyle: 'italic', opacity: 0.88 }}>
                {data.mentorNote}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
