import { useEffect, useRef, useState } from 'react';
import { Badge, Button, C } from '../../ui/index';
import { SPRINT } from '../../data/fixtures/tasks';
import { callClaude, SYS_TASK } from '../../lib/claude';
import { useSession } from '../../state/SessionContext';

export function ClarityPanel({ task }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hoveredAction, setHoveredAction] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);
  const fetched = useRef(false);
  const { actionsLog, logAction, projectedScore, markReviewed } = useSession();

  const impactTone = { high: 'teal', medium: 'indigo', low: 'green' };

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

  useEffect(() => {
    markReviewed(task.id);
  }, [markReviewed, task.id]);

  const showBlockedFallback = task.id === 'TM-119';

  const renderAction = (action, index) => {
    const taskAction = actionsLog.find((item) => item.taskId === task.id);
    const actionKey = action.cta || action.label;
    const actionTaken = taskAction?.actionLabel === actionKey;
    const scoreImpact = actionTaken
      ? taskAction.scoreImpact
      : action.impact === 'high'
        ? 17
        : action.impact === 'medium'
          ? 8
          : 5;
    const projectedAfter = Math.min(100, projectedScore + (actionTaken ? 0 : scoreImpact));
    const impactBadge = `↑ Confidence: ${projectedScore} → ${projectedAfter} +${scoreImpact} pts`;

    const handleAction = () => {
      if (actionTaken || !action.cta || pendingAction) return;
      setPendingAction(actionKey);
      setTimeout(() => {
        logAction(task.id, actionKey);
        setPendingAction(null);
      }, 160);
    };

    return (
      <ActionCard
        key={index}
        title={action.label}
        recommended={action.recommended}
        impactTone={impactTone[action.impact] || 'indigo'}
        impactLabel={`${action.impact} impact`}
        detail={action.detail}
        cta={action.cta}
        actionTaken={actionTaken}
        acknowledged={taskAction?.acknowledged}
        pending={pendingAction === actionKey}
        onAction={handleAction}
        onHover={(hovering) => setHoveredAction(hovering ? index : null)}
        impactBadge={hoveredAction === index ? impactBadge : null}
      />
    );
  };

  if (showBlockedFallback) {
    return (
      <div className="panel" style={{ marginBottom: 14 }}>
        <PanelHeader />
        <div className="panel__body">
          <p className="panel__title">Deployment blocked before it can begin.</p>
          <p className="panel__text">
            The 14h estimate already exceeds sprint capacity, and the upstream dependency hasn't started yet. This task needs either unblocking coordination or a scope decision before Daria can move forward.
          </p>

          <div className="panel__callout" style={{ background: C.indigoDim, border: `1px solid ${C.indigo}20` }}>
            <i className="ti ti-quote" style={{ fontSize: 13, color: C.indigo }} aria-hidden="true" />
            <p style={{ margin: 0, color: C.indigo, lineHeight: 1.6, fontStyle: 'italic', opacity: 0.88 }}>
              I'd prioritize the sync first — unblocking Rotem's work is the lever that makes everything else possible.
            </p>
          </div>

          <p className="title-sm text-ter" style={{ margin: '0 0 7px', letterSpacing: '0.09em', textTransform: 'uppercase' }}>
            Suggested actions
          </p>

          <div className="stack stack-gap-6">
            <ActionCard
              title="Sync with Rotem's team"
              recommended
              impactTone="teal"
              impactLabel="high impact"
              detail="Align on API Gateway timeline before sprint ends"
              cta="Schedule a sync"
            />
            <ActionCard
              title="Reduce deployment scope"
              impactTone="indigo"
              impactLabel="medium impact"
              detail="Scope to partial staging deploy within 11h capacity"
              cta="Reduce scope"
            />
            <ActionCard
              title="Move to next sprint"
              impactTone="green"
              impactLabel="low impact"
              detail="Defer until dependency is resolved and capacity fits"
              cta="Move to next sprint"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="panel panel--glow" style={{ marginBottom: 14, '--glow': C.indigo }}>
      <PanelHeader right={loading ? <span style={{ marginLeft: 'auto', fontSize: 11, color: C.textTer }}>Reviewing…</span> : null} />

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

function PanelHeader({ right }) {
  return (
    <div className="panel__header">
      <div className="icon-box icon-box--large" style={{ background: `${C.indigo}28` }}>
        <i className="ti ti-sparkles" style={{ fontSize: 12, color: C.indigo }} aria-hidden="true" />
      </div>
      <div>
        <span style={{ fontSize: 11, fontWeight: 700, color: C.indigo, letterSpacing: '0.06em' }}>CLAIRITY</span>
        <span style={{ display: 'inline-block', marginLeft: 7, fontSize: 11, color: C.indigo, opacity: 0.6 }}>
          Sprint Intelligence Advisor
        </span>
      </div>
      {right}
    </div>
  );
}

function ActionCard({
  title,
  recommended,
  impactTone,
  impactLabel,
  detail,
  cta,
  actionTaken = false,
  acknowledged,
  pending = false,
  onAction,
  onHover,
  impactBadge,
}) {
  return (
    <div
      className={`panel__action-card${recommended ? ' panel__action-card--recommended' : ''}${actionTaken ? ' panel__action-card--logged' : ''}`}
    >
      <p className="title-md" style={{ margin: '0 0 4px', color: C.textPri, lineHeight: 1.35 }}>{title}</p>
      <div className="flex-between" style={{ marginBottom: 5 }}>
        {recommended ? <Badge label="✓ Recommended" tone="green" size="sm" /> : <span />}
        <Badge label={impactLabel} tone={impactTone} size="sm" />
      </div>
      <p style={{ margin: cta ? '0 0 7px' : 0, color: C.textSec, fontSize: 13, lineHeight: 1.55 }}>{detail}</p>
      {cta && (
        actionTaken ? (
          <div style={{ padding: '12px 14px', borderRadius: 12, background: 'rgba(39, 201, 154, 0.08)' }}>
            <div className="flex-between" style={{ gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.green }}>✓ Logged · Delivery confidence updated</span>
            </div>
            <p style={{ margin: 0, color: C.textSec, fontSize: 13, lineHeight: 1.65, fontStyle: 'italic' }}>
              {acknowledged || 'Logged. Delivery confidence is updated and I’m monitoring this action.'}
            </p>
          </div>
        ) : (
          <div className="flex" style={{ justifyContent: 'flex-end' }}>
            <div style={{ position: 'relative' }}>
              <Button
                label={pending ? 'Logging…' : cta}
                arrow={!pending}
                variant={recommended ? 'recommended' : 'ghost'}
                tone={C.teal}
                size="sm"
                onClick={onAction}
                disabled={pending}
                onMouseEnter={() => onHover?.(true)}
                onMouseLeave={() => onHover?.(false)}
              />
              {impactBadge && <div className="projected-impact-badge">{impactBadge}</div>}
            </div>
          </div>
        )
      )}
    </div>
  );
}
