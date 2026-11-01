import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ACTION_POINTS, SCORE_STATES } from '../../data/fixtures/dashboard';

const STORAGE_KEY = 'clairitySessionState';
const BASE_SCORE = SCORE_STATES.entry.score;
const AT_RISK_TASKS = Object.keys(ACTION_POINTS);

const defaultState = {
    actionsLog: [],
    tasksReviewed: [],
};

const buildAcknowledgment = (actionLabel) => {
    const label = actionLabel.toLowerCase();

    if (label.includes('sync') || label.includes('schedule')) {
        return 'Logged. I updated the sprint health model — delivery confidence now reflects this. I’ll monitor progress and flag you if the timeline does not improve.';
    }
    if (label.includes('move to next sprint')) {
        return 'Logged. Removing this task from this sprint reduces pressure meaningfully. I’ll update the delivery forecast accordingly.';
    }
    if (label.includes('reduce scope') || label.includes('scope')) {
        return 'Logged. That scope adjustment gives us more runway. I’ll keep watching sprint confidence as this progresses.';
    }
    if (label.includes('request an update') || label.includes('update')) {
        return 'Logged. I’ll keep an eye on the dependency and alert you if the situation does not improve in the next two days.';
    }

    return 'Logged. Delivery confidence is updated and I’m monitoring this action for changes.';
};

function loadState() {
    try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (!saved) return defaultState;
        return JSON.parse(saved);
    } catch {
        return defaultState;
    }
}

function saveState(state) {
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
        // ignore storage errors
    }
}

const SessionContext = createContext(null);

/**
 * Tracks what the manager has done this session. The delivery-confidence score
 * is derived from the Figma fixtures (ACTION_POINTS), so it is always
 * 52% -> 69% (TM-112 actioned) -> 72% (TM-119 actioned too), regardless of
 * which option was chosen.
 */
export function SessionProvider({ children }) {
    const [actionsLog, setActionsLog] = useState(() => loadState().actionsLog ?? []);
    const [tasksReviewed, setTasksReviewed] = useState(() => loadState().tasksReviewed ?? []);

    useEffect(() => {
        saveState({ actionsLog, tasksReviewed });
    }, [actionsLog, tasksReviewed]);

    const logAction = useCallback((taskId, actionLabel) => {
        setActionsLog((prev) => {
            if (prev.some((item) => item.taskId === taskId)) return prev;
            const scoreImpact = ACTION_POINTS[taskId] ?? 0;
            return [...prev, { taskId, actionLabel, scoreImpact, acknowledged: buildAcknowledgment(actionLabel), date: new Date().toISOString() }];
        });
    }, []);

    const markReviewed = useCallback((taskId) => {
        setTasksReviewed((prev) => (prev.includes(taskId) ? prev : [...prev, taskId]));
    }, []);

    const totalImpact = useMemo(
        () => actionsLog.reduce((sum, item) => sum + (ACTION_POINTS[item.taskId] ?? 0), 0),
        [actionsLog],
    );

    const projectedScore = Math.min(100, BASE_SCORE + totalImpact);
    const completedActions = useMemo(
        () => AT_RISK_TASKS.every((id) => actionsLog.some((action) => action.taskId === id)),
        [actionsLog],
    );

    const sessionPhase = actionsLog.length === 0 ? 'entry' : completedActions ? 'complete' : 'in-progress';

    return (
        <SessionContext.Provider value={{ actionsLog, tasksReviewed, markReviewed, logAction, projectedScore, sessionPhase }}>
            {children}
        </SessionContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components -- context hook lives with its provider by convention
export function useSession() {
    const context = useContext(SessionContext);
    if (!context) throw new Error('useSession must be used within a SessionProvider');
    return context;
}
