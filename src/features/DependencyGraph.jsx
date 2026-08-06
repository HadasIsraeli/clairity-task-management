import { ALL_TASKS, DEPENDENCIES, TAG_CLR } from '../data/tasks';
import { Avatar, Badge, Card, C } from '../ui';

const STATUS_TONE = { Done: 'green', 'In Progress': 'teal', 'To Do': 'neutral', Blocked: 'red' };

function initialsOf(name) {
    return name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
}

function TaskNode({ task }) {
    if (!task) return null;
    return (
        <Card padding="lg" className="dependency-edge__node">
            <Avatar initials={initialsOf(task.assignee)} color={TAG_CLR[task.tag] || C.textSec} size={32} />
            <div className="dependency-edge__node-body">
                <div className="flex-center" style={{ gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: C.textTer }}>{task.id}</span>
                    <Badge label={task.status} tone={STATUS_TONE[task.status] || 'neutral'} size="sm" />
                </div>
                <p style={{ margin: '0 0 6px', fontSize: 14, fontWeight: 600, color: C.textPri }}>{task.title}</p>
                <div className="flex-center" style={{ gap: 8 }}>
                    <span style={{ fontSize: 12, color: C.textTer }}>{task.assignee}</span>
                    <Badge label={task.tag} color={TAG_CLR[task.tag] || C.textSec} size="sm" />
                </div>
            </div>
        </Card>
    );
}

export function DependencyGraph() {
    const edges = DEPENDENCIES.map((dep) => ({
        ...dep,
        blocker: ALL_TASKS.find((t) => t.id === dep.blockerId),
        blocked: ALL_TASKS.find((t) => t.id === dep.blockedId),
    }));

    return (
        <div className="dependency-graph">
            {edges.map((edge) => (
                <div key={`${edge.blockerId}-${edge.blockedId}`} className="dependency-edge">
                    <TaskNode task={edge.blocker} />
                    <div className="dependency-edge__connector">
                        <div className="dependency-edge__line" />
                        <i className="ti ti-arrow-down" style={{ fontSize: 14 }} aria-hidden="true" />
                    </div>
                    <TaskNode task={edge.blocked} />
                    <p
                        className="dependency-edge__status"
                        style={{ color: edge.status === 'resolved' ? C.green : C.red }}
                    >
                        <i className={`ti ${edge.status === 'resolved' ? 'ti-circle-check' : 'ti-alert-triangle'}`} style={{ marginRight: 6 }} aria-hidden="true" />
                        {edge.note}
                    </p>
                </div>
            ))}
        </div>
    );
}
