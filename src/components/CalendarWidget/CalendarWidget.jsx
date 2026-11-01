import { Card, C } from '../../ui/index';
import { SPRINT } from '../../data/fixtures/tasks';

// Illustrative agenda chrome (not wired to task data) — mirrors the small
// agenda list under the week strip in the Figma dashboard mock. Only the
// current item shows a live status; future items show no status at all,
// matching the design.
const AGENDA = [
    { time: '9:00', title: 'Daily', status: 'ended', dim: true },
    { time: '11:00', title: 'Architecture Sync', status: 'now', dim: false },
    { time: '14:30', title: 'Leadership Sync', status: null, dim: true },
    { time: '15:00', title: 'Focus Time', status: null, dim: true },
];

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

function monthYearLabel(dates) {
    // SPRINT.dates looks like "May 6–20, 2026" — pull the month name and year
    // out rather than hardcoding them.
    const match = /^([A-Za-z]+)\s.*?,\s*(\d{4})/.exec(dates);
    if (!match) return dates;
    return `${match[1]}, ${match[2]}`;
}

export function CalendarWidget({ maxHeight }) {
    // Illustrative single-week strip anchored on the mock's highlighted day
    // (Wed). Day numbers are chrome, not derived from real calendar math.
    const days = [11, 12, 13, 14, 15];
    const todayIndex = 2;

    return (
        <Card
            padding="lg"
            className="calendar-widget"
            style={maxHeight ? { maxHeight, overflowY: 'auto' } : undefined}
        >
            <span className="title-md" style={{ color: C.textPri }}>{monthYearLabel(SPRINT.dates)}</span>

            <div className="calendar-widget__week">
                <button type="button" className="calendar-widget__chevron" aria-label="Previous week" disabled>
                    <i className="ti ti-chevron-left" aria-hidden="true" />
                </button>

                <div className="calendar-widget__days">
                    {WEEKDAYS.map((day, i) => (
                        <div key={day} className="calendar-widget__day">
                            <span className="calendar-widget__day-label">{day}</span>
                            <span className={`calendar-widget__day-num ${i === todayIndex ? 'calendar-widget__day-num--today' : ''}`}>
                                {days[i]}
                            </span>
                        </div>
                    ))}
                </div>

                <button type="button" className="calendar-widget__chevron" aria-label="Next week" disabled>
                    <i className="ti ti-chevron-right" aria-hidden="true" />
                </button>
            </div>

            <div className="calendar-widget__agenda">
                {AGENDA.map((item) => (
                    <div key={item.title} className={`calendar-widget__agenda-row${item.dim ? ' calendar-widget__agenda-row--dim' : ''}`}>
                        <span className="calendar-widget__bullet">|</span>
                        <span className="calendar-widget__agenda-text">
                            {item.time} &nbsp; {item.title}
                        </span>
                        {item.status && (
                            <span className="calendar-widget__agenda-status" style={{ color: item.status === 'now' ? C.teal : C.textTer }}>
                                {item.status}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </Card>
    );
}
