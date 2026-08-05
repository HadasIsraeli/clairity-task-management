import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'clairitySessionState';
const BASE_SCORE = 52;
const AT_RISK_TASKS = ['TM-112', 'TM-119'];

const defaultState = {
    briefingDismissed: false,
    summaryClosed: false,
    actionsLog: [],
    tasksReviewed: [],
};

const scoreImpactForAction = (actionLabel, taskId) => {
    const label = actionLabel.toLowerCase();

    if (label.includes('move to next sprint')) {
        return taskId === 'TM-112' ? 22 : 12;
    }
    if (label.includes('sync') || label.includes('schedule')) {
        return 17;
    }
    if (label.includes('reduce scope') || label.includes('scope')) {
        return 14;
    }
    if (label.includes('request an update') || label.includes('update')) {
        return 5;
    }
    if (label.includes('flag') || label.includes('review')) {
        return 3;
    }

    return label.includes('high') ? 15 : label.includes('medium') ? 8 : 5;
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

export function SessionProvider({ children }) {
    const [briefingDismissed, setBriefingDismissed] = useState(() => loadState().briefingDismissed ?? false);
    const [summaryClosed, setSummaryClosed] = useState(() => loadState().summaryClosed ?? false);
    const [actionsLog, setActionsLog] = useState(() => loadState().actionsLog ?? []);
    const [tasksReviewed, setTasksReviewed] = useState(() => loadState().tasksReviewed ?? []);

    useEffect(() => {
        saveState({ briefingDismissed, summaryClosed, actionsLog, tasksReviewed });
    }, [briefingDismissed, summaryClosed, actionsLog, tasksReviewed]);

    const logAction = useCallback((taskId, actionLabel) => {
        setActionsLog((prev) => {
            if (prev.some((item) => item.taskId === taskId)) return prev;
            const scoreImpact = scoreImpactForAction(actionLabel, taskId);
            return [...prev, { taskId, actionLabel, scoreImpact, acknowledged: buildAcknowledgment(actionLabel, taskId), date: new Date().toISOString() }];
        });
    }, []);

    const markReviewed = useCallback((taskId) => {
        setTasksReviewed((prev) => (prev.includes(taskId) ? prev : [...prev, taskId]));
    }, []);

    const dismissBriefing = useCallback(() => setBriefingDismissed(true), []);
    const closeSummary = useCallback(() => setSummaryClosed(true), []);

    const totalImpact = useMemo(
        () => actionsLog.reduce((sum, item) => sum + item.scoreImpact, 0),
        [actionsLog],
    );

    const projectedScore = Math.min(100, BASE_SCORE + totalImpact);
    const completedActions = useMemo(
        () => AT_RISK_TASKS.every((id) => actionsLog.some((action) => action.taskId === id)),
        [actionsLog],
    );

    const sessionPhase = actionsLog.length === 0 ? 'entry' : completedActions ? 'complete' : 'in-progress';

    const briefingText = useMemo(() => {
        if (sessionPhase === 'complete') {
            return 'Both flagged items have been addressed. Sprint 24 is tracking better — I’ll continue watching and alert you if anything shifts before the sprint ends.';
        }
        if (sessionPhase === 'in-progress') {
            return 'Good progress. TM-112 has been addressed. TM-119 is now your primary concern — the dependency situation there needs your input.';
        }
        return 'Sprint 24 has 7 days left and I’m tracking it at 52% delivery confidence. Two situations need your attention — TM-112 is the more pressing. I’d start there.';
    }, [sessionPhase]);

    const summaryText = useMemo(() => {
        if (sessionPhase !== 'complete') return '';
        const finished = actionsLog.map((item) => `· ${item.taskId} — ${item.actionLabel}`).join('\n');
        return `You’ve reviewed and addressed ${actionsLog.length} flagged item${actionsLog.length === 1 ? '' : 's'} in Sprint 24. Delivery confidence improved from 52 → ${projectedScore} this session. I’m projecting ${Math.max(projectedScore + 4, projectedScore)}–${Math.min(projectedScore + 8, 100)}/100 by end of sprint if both actions are followed through. I’ll continue monitoring and will alert you if anything changes.\n\nActions logged this session:\n${finished}`;
    }, [actionsLog, projectedScore, sessionPhase]);

    return (
        <SessionContext.Provider
            value={{
                briefingDismissed,
                dismissBriefing,
                summaryClosed,
                closeSummary,
                actionsLog,
                tasksReviewed,
                markReviewed,
                logAction,
                projectedScore,
                sessionPhase,
                briefingText,
                summaryText,
                showSummary: sessionPhase === 'complete' && !summaryClosed,
            }}
        >
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
