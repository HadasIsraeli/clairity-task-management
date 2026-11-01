import { ALL_TASKS, SPRINT, TAG_CLR } from "../../data/fixtures/tasks";
import { Badge, Card, Tooltip, C } from "../../ui/index";
import { useSession } from "../../state/SessionContext";
import profile1 from "../../assets/figma/profile-1.png";
import profile2 from "../../assets/figma/profile-2.png";
import profile3 from "../../assets/figma/profile-3.png";
import profile4 from "../../assets/figma/profile-4.png";
import profile5 from "../../assets/figma/profile-5.png";

const PHOTOS = [profile1, profile2, profile3, profile4, profile5];

/**
 * Kanban board (Blocked / To Do / In Progress / Done).
 * NOT rendered on the dashboard: the updated Figma dashboard frames no longer
 * include the board. Kept here, intact, until we decide where it lives.
 */
export function Board({ onOpen }) {
    const { actionsLog } = useSession();
    const cols = ["Blocked", "To Do", "In Progress", "Done"];
    const byStatus = {};
    cols.forEach((column) => {
        byStatus[column] = ALL_TASKS.filter((task) => task.status === column);
    });
    const colDot = { Blocked: C.red, Done: C.green, "In Progress": C.teal, "To Do": C.textTer };

    return (
        <>
            <div className="dashboard__board-header">
                <span className="title-lg">Board</span>
                <Badge label={`${SPRINT.atRisk} at risk`} tone="red" size="sm" />
                <button type="button" className="dashboard__filter-view" disabled>
                    <i className="ti ti-filter" aria-hidden="true" />
                    Filter View
                    <span className="dashboard__filter-view-count">4/7</span>
                </button>
            </div>

            <div className="dashboard__section">
                {cols.map((column) => (
                    <div key={column}>
                        <div className="dashboard__section-header">
                            <div
                                style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    background: colDot[column],
                                    boxShadow: `0 0 5px ${colDot[column]}`,
                                }}
                            />
                            <span className="title-sm text-ter" style={{ letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                {column}
                            </span>
                            <Badge label={byStatus[column].length} color={C.textTer} size="sm" />
                        </div>
                        <div className="dashboard__task-column">
                            {byStatus[column].map((task) => {
                                const actionTaken = actionsLog.some((action) => action.taskId === task.id);
                                const cardClass = task.atRisk
                                    ? actionTaken
                                        ? 'dashboard__task-card--actioned'
                                        : 'dashboard__task-card--at-risk'
                                    : '';
                                const photo = PHOTOS[ALL_TASKS.indexOf(task) % PHOTOS.length];

                                return (
                                    <Card
                                        key={task.id}
                                        as="div"
                                        className={`dashboard__task-card ${cardClass}`}
                                        onClick={() => task.atRisk && onOpen(task.status === 'In Progress' ? 'inProgress' : 'todo')}
                                    >
                                        <div className="flex" style={{ alignItems: 'flex-start', gap: 6 }}>
                                            <p className="dashboard__task-title">{task.title}</p>
                                            {task.atRisk && (
                                                <Tooltip
                                                    text={
                                                        task.riskType === 'overtime'
                                                            ? '125% over AI estimate — click to review with Clairity'
                                                            : 'Blocked by dependency — click to review'
                                                    }
                                                >
                                                    <i className="ti ti-alert-triangle" style={{ fontSize: 14, color: C.red }} aria-hidden="true" />
                                                </Tooltip>
                                            )}
                                        </div>
                                        <div className="dashboard__task-meta">
                                            <div className="dashboard__task-owner">
                                                <img src={photo} alt="" className="dashboard__task-avatar" />
                                                <span style={{ fontSize: 12, color: C.textTer }}>{task.id}</span>
                                            </div>
                                            <Badge label={task.tag} color={TAG_CLR[task.tag] || C.textSec} size="sm" />
                                        </div>
                                        {task.atRisk && (
                                            <p className={`dashboard__task-insight ${actionTaken ? 'dashboard__task-insight--actioned' : ''}`}>
                                                {actionTaken
                                                    ? '✓ Action taken · Clairity monitoring'
                                                    : task.riskType === 'overtime'
                                                        ? '18h logged · review options →'
                                                        : 'Pending dependency · review options →'}
                                            </p>
                                        )}
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
