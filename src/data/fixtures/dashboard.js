// Dashboard fixtures. All copy is verbatim from the Figma frames:
//   Delivery Confidence 52% / 69% / 72%  (972:33165, 1005:27434, 1005:27540)
//   Sprint Brief (972:33336, 1005:41031, Final 1005:40982)
//   Today's Schedule (1005:40477), Next Break (1005:35733), Team (972:33342)
// Session phases map to score states: entry = 52%, in-progress = 69%, complete = 72%.

export const DELIVERY_SUMMARY =
    'Your team is making solid progress with 4 tasks done, and with focused attention on the risks ahead you can absolutely close this sprint strong!';

export const DELIVERY_CAPTION = 'Calculated from 7 operational factors across team capacity, dependencies, and task health';

const reason = (impact, tone, title, detail) => ({ impact, tone, title, detail });

// Segmented bar: [start column (1-100), span, tone]
export const SCORE_STATES = {
    entry: {
        score: 52,
        scoreTone: 'yellow',
        status: { label: 'Steady but risky', tone: 'yellow' },
        bar: [[1, 14, 'red'], [15, 13, 'red'], [28, 10, 'orange'], [38, 6, 'yellow'], [44, 5, 'yellow'], [49, 4, 'green'], [53, 2, 'green']],
        reasons: [
            reason('-14%', 'red', 'Team member unavailable', 'Yoni Ben-David is sick - Day 2. TM-112 auth task unattended'),
            reason('-13%', 'red', 'Blocked dependency', 'TM-119 cannot begin until TM-107 (Platform Team) is started'),
            reason('-10%', 'orange', 'Task over AI estimate', 'TM-112 is 125% over its AI estimate with 3 steps remaining'),
            reason('-6%', 'yellow', 'Sprint window pressure', '7 days remaining with current workload requiring full team capacity'),
            reason('-5%', 'yellow', 'Unresolved scope', 'TM-112 scope not aligned between estimate and actual complexity'),
            reason('+4%', 'green', 'Developer availability', '3 of 5 team members have available bandwidth today'),
            reason('+2%', 'green', 'Review pipeline clear', 'No tasks stuck in review or QA, TM-115 on track to merge today'),
        ],
    },
    'in-progress': {
        score: 69,
        scoreTone: 'yellow',
        status: { label: 'Steady but risky', tone: 'yellow' },
        bar: [[1, 13, 'red'], [14, 6, 'yellow'], [20, 5, 'yellow'], [25, 4, 'yellow'], [29, 3, 'yellow'], [32, 4, 'green'], [36, 3, 'green']],
        reasons: [
            reason('-13%', 'red', 'Blocked dependency', 'TM-119 cannot begin until TM-107 (Platform Team) is started'),
            reason('-6%', 'yellow', 'Sprint window pressure', '7 days remaining with current workload requiring full team capacity'),
            reason('-5%', 'yellow', 'Unresolved scope', 'TM-112 scope not aligned between estimate and actual complexity'),
            reason('-4%', 'yellow', 'Owner availability - mitigated', 'TM-112 coverage addressed, logged action - "Reassign to Gali"'),
            reason('-3%', 'yellow', 'Task over AI estimate', 'TM-112 is 125% over its AI estimate with 3 steps remaining'),
            reason('+4%', 'green', 'Developer availability', '3 of 5 team members have available bandwidth today'),
            reason('+3%', 'green', 'Review pipeline moving', 'No tasks stuck in review or QA, TM-115 on track to merge today'),
        ],
    },
    complete: {
        score: 72,
        scoreTone: 'green',
        status: { label: 'On track', tone: 'green' },
        bar: [[1, 10, 'orange'], [11, 6, 'yellow'], [17, 5, 'yellow'], [22, 4, 'yellow'], [26, 3, 'yellow'], [29, 4, 'green'], [33, 3, 'green']],
        reasons: [
            reason('-10%', 'orange', 'Blocked dependency - mitigated', 'TM-119 cannot begin until TM-107 (Platform Team) is started'),
            reason('-6%', 'yellow', 'Sprint window pressure', '7 days remaining with current workload requiring full team capacity'),
            reason('-5%', 'yellow', 'Unresolved scope', 'TM-112 scope not aligned between estimate and actual complexity'),
            reason('-4%', 'yellow', 'Owner availability - mitigated', 'TM-112 coverage addressed, logged action - "Reassign to Gali"'),
            reason('-3%', 'yellow', 'Task over AI estimate', 'TM-112 is 125% over its AI estimate with 3 steps remaining'),
            reason('+4%', 'green', 'Developer availability', '3 of 5 team members have available bandwidth today'),
            reason('+3%', 'green', 'Review pipeline moving', 'No tasks stuck in review or QA, TM-115 on track to merge today'),
        ],
    },
};

// Points each logged action adds to the delivery-confidence score (52 -> 69 -> 72).
export const ACTION_POINTS = { 'TM-112': 17, 'TM-119': 3 };

const briefTask = (taskKey, id, title, tag) => ({ taskKey, id, title, tag });
export const BRIEF_TASKS = {
    'TM-112': briefTask('inProgress', 'TM-112', 'OAuth2 Token Refresh Flow', { label: 'Auth', tone: 'red' }),
    'TM-119': briefTask('todo', 'TM-119', 'Deploy Notification Service', { label: 'DevOps', tone: 'orange' }),
};

// `body` is an array of runs so highlighted figures keep their Figma colors.
export const BRIEF_STATES = {
    entry: {
        title: "Sprint 24 has 7 days left and I'm tracking it at 52% delivery confidence",
        body: ["Yoni's absence has added pressure to TM-112 - that's the most urgent situation to address. I'd start there."],
        rows: [{ task: 'TM-112', person: 'yoni', action: 'review' }],
    },
    'in-progress': {
        title: 'Good progress on TM-112, TM-119 is now your primary concern',
        body: ["The dependency on TM-107 hasn't started yet and the timing window is tight."],
        rows: [{ task: 'TM-119', person: 'daria', action: 'review' }],
    },
    complete: {
        title: 'All Risks Addressed - Sprint 24 is in a stronger position',
        body: [
            'Delivery confidence improved from ',
            { text: '52%', tone: 'yellow' },
            ' ',
            { text: '→', tone: null },
            { text: ' 72%', tone: 'green' },
            '. ',
            { br: true },
            "I'm projecting ",
            { text: '76 - 80%', tone: 'green' },
            ' by end of sprint if both actions are followed through.',
        ],
        rows: [
            { task: 'TM-112', person: 'gali', points: '+17pts', action: 'done', doneLabel: 'Assigned to Gali' },
            { task: 'TM-119', person: 'daria', points: '+3pts', action: 'done', doneLabel: 'Flagged for review' },
        ],
    },
};

// Today's Schedule. `time` is 24h "H:MM"; `state` drives emphasis.
export const SCHEDULE_DATE = 'Thursday, Aug 20';
export const SCHEDULE_HOURS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
export const SCHEDULE = [
    { id: 'daily', time: '9:00', title: 'Daily', state: 'ended', bar: 'neutral' },
    { id: 'design', time: '10:15', title: 'Design Review', state: 'later', bar: 'orange' },
    { id: 'arch', time: '11:00', title: 'Architecture Sync', state: 'now', bar: 'teal' },
    { id: 'wrap', time: '13:00', title: 'Wrap-up Notes', state: 'later', bar: 'neutral', faded: true },
    { id: 'leadership', time: '14:30', title: 'Leadership Sync', state: 'later', bar: 'neutral' },
    { id: 'focus', time: '15:00', title: 'Focus Time', state: 'later', bar: 'neutral' },
    { id: 'retro', time: '16:00', title: 'Sprint Retro', state: 'later', bar: 'red' },
    { id: 'oneonone', time: '16:45', title: '1:1 with Sarah', state: 'later', bar: 'teal' },
];

export const BREAK_SECONDS = 15 * 60;

// Team status. `presence` colors the avatar dot; `tone` colors the status text.
export const TEAM_STATUS = [
    { name: 'Yoni B.', status: 'Sick', tone: 'red', presence: 'red' },
    { name: 'Gali C.', status: 'Available', tone: 'green', presence: 'green' },
    { name: 'Daria S.', status: 'Available', tone: 'green', presence: 'green' },
    { name: 'Rotem L.', status: 'In meeting', tone: 'yellow', presence: 'yellow' },
    { name: 'Guy T.', status: 'Focus time', tone: 'yellow', presence: 'yellow' },
];
