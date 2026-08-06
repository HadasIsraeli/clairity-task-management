import { C } from '../constants/theme';

export const SPRINT = { name: "Sprint 24", dates: "May 6–20, 2026", daysLeft: 7, total: 15, completed: 4, inProgress: 4, atRisk: 2 };

export const TASKS = {
    inProgress: {
        id: "TM-112", title: "Implement OAuth2 Token Refresh Flow",
        description: "Implement the OAuth2 token refresh mechanism for the authentication service, including silent refresh logic, cross-tab session persistence, and backward compatibility with the legacy session system.",
        assignee: { name: "Yoni Ben-David", initials: "YB", color: C.indigo },
        priority: "High", actualHours: 18, aiEstimateHours: 10, originalEstimate: 8,
        tags: ["Backend", "Auth", "API"], status: "In Progress",
        steps: [
            { label: "Token refresh endpoint", done: true },
            { label: "Silent refresh logic", done: true },
            { label: "Cross-tab session sync", done: false },
            { label: "Legacy system bridge", done: false },
            { label: "E2E test suite", done: false },
        ],
    },
    todo: {
        id: "TM-119", title: "Deploy Notification Service to Staging",
        description: "Deploy the event-driven notification microservice to staging. Requires API Gateway routing config (TM-107) first. Includes K8s manifest updates, environment setup, smoke testing, and alerting.",
        assignee: { name: "Daria Shmueli", initials: "DS", color: C.teal },
        priority: "Medium", actualHours: 0, aiEstimateHours: 14, originalEstimate: 6,
        tags: ["DevOps", "K8s", "Staging"], status: "To Do",
        dependency: { id: "TM-107", title: "Configure API Gateway Routing Rules", assignee: "Rotem Levi", team: "Platform Team", status: "Not Started" },
        steps: [
            { label: "API Gateway config (pending dependency)", done: false },
            { label: "K8s manifest update", done: false },
            { label: "Env variable setup", done: false },
            { label: "Smoke testing", done: false },
            { label: "Alerting configuration", done: false },
        ],
    },
};

export const ALL_TASKS = [
    { id: "TM-108", title: "User profile API endpoints", assignee: "Tali Cohen", status: "Done", tag: "Backend" },
    { id: "TM-109", title: "Redis caching layer", assignee: "Eran Mizrahi", status: "Done", tag: "Infra" },
    { id: "TM-110", title: "Frontend routing refactor", assignee: "Noa Katz", status: "Done", tag: "Frontend" },
    { id: "TM-111", title: "Database migration scripts", assignee: "Avi Segal", status: "Done", tag: "DB" },
    { id: "TM-112", title: "OAuth2 Token Refresh Flow", assignee: "Yoni Ben-David", status: "In Progress", tag: "Auth", atRisk: true, riskType: "overtime" },
    { id: "TM-113", title: "Rate limiting middleware", assignee: "Gal Peretz", status: "In Progress", tag: "Backend" },
    { id: "TM-114", title: "Webhook event processor", assignee: "Maya Lior", status: "In Progress", tag: "API" },
    { id: "TM-115", title: "Admin dashboard UI", assignee: "Ron Shapiro", status: "In Progress", tag: "Frontend" },
    { id: "TM-116", title: "Mobile push notifications", assignee: "Shira Dahan", status: "To Do", tag: "Mobile" },
    { id: "TM-117", title: "Analytics event schema", assignee: "Liron Bar", status: "To Do", tag: "Data" },
    { id: "TM-118", title: "E2E test coverage", assignee: "Itai Friedman", status: "To Do", tag: "QA" },
    { id: "TM-119", title: "Deploy Notification Service", assignee: "Daria Shmueli", status: "Blocked", tag: "DevOps", atRisk: true, riskType: "blocked" },
    { id: "TM-120", title: "Load testing & optimization", assignee: "Barak Cohen", status: "To Do", tag: "Infra" },
    { id: "TM-121", title: "Security audit", assignee: "Dana Levy", status: "To Do", tag: "Security" },
    { id: "TM-107", title: "Configure API Gateway Routing Rules", assignee: "Rotem Levi", status: "To Do", tag: "Platform" },
];

// Cross-task dependency edges, used by the Dependencies graph view.
// Each edge points from a blocking task to the task it blocks.
export const DEPENDENCIES = [
    {
        blockerId: "TM-107",
        blockedId: "TM-119",
        status: "active",
        note: "Active blocker — hasn't started",
    },
    {
        blockerId: "TM-108",
        blockedId: "TM-113",
        status: "resolved",
        note: "Resolved — dependency complete",
    },
];

export const TAG_CLR = {
    Backend: C.indigo, Auth: C.red, API: C.teal, Frontend: C.orange,
    Infra: C.textSec, DB: C.yellow, Mobile: C.teal, Data: C.indigo,
    QA: C.green, DevOps: C.orange, Security: C.red, Platform: C.indigo,
};