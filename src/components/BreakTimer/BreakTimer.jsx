import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Panel } from '../../ui/Panel';
import { BREAK_SECONDS } from '../../data/fixtures/dashboard';
import playIcon from '../../assets/figma/play-icon.svg';
import refreshIcon from '../../assets/figma/refresh-icon.svg';
import styles from './BreakTimer.module.css';

// Ring geometry from the Figma "Progress Ring" asset: 80px, 6px stroke.
const SIZE = 80;
const STROKE = 6;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
// The frame shows the idle ring with a quarter arc; elapsed time grows it to a full ring.
const IDLE_ARC = 0.25;

const format = (total) => {
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

/** "Next Break" countdown (Figma "Time Tracker Widget"). Play/pause and restart work. */
export function BreakTimer({ seconds = BREAK_SECONDS, className = '' }) {
    const [remaining, setRemaining] = useState(seconds);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        if (!running) return undefined;
        const id = setInterval(() => setRemaining((r) => Math.max(r - 1, 0)), 1000);
        return () => clearInterval(id);
    }, [running]);

    const finished = remaining === 0;
    const elapsed = 1 - remaining / seconds;
    const arc = (IDLE_ARC + (1 - IDLE_ARC) * elapsed) * CIRCUMFERENCE;

    const toggle = () => {
        if (finished) {
            setRemaining(seconds);
            setRunning(true);
            return;
        }
        setRunning((r) => !r);
    };
    const restart = () => {
        setRemaining(seconds);
        setRunning(false);
    };

    return (
        <Panel padded className={[styles.card, className].filter(Boolean).join(' ')} aria-labelledby="break-title">
            <h2 id="break-title" className={styles.title}>
                Next Break
            </h2>
            <div className={styles.timer}>
                <div className={styles.ring}>
                    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
                        <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" className={styles.track} strokeWidth={STROKE} />
                        <circle
                            cx={SIZE / 2}
                            cy={SIZE / 2}
                            r={RADIUS}
                            fill="none"
                            className={styles.progress}
                            strokeWidth={STROKE}
                            strokeDasharray={`${arc} ${CIRCUMFERENCE - arc}`}
                            transform={`scale(-1 1) translate(-${SIZE} 0) rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
                        />
                    </svg>
                    <p className={styles.time} role="timer" aria-live="off">
                        {format(remaining)}
                    </p>
                </div>
                <div className={styles.controls}>
                    <button type="button" className={`${styles.round} ${styles.play}`} onClick={toggle} aria-label={running ? 'Pause break timer' : 'Start break timer'}>
                        {running ? <span className={styles.pause} aria-hidden="true" /> : <img src={playIcon} alt="" className={styles.icon} />}
                    </button>
                    <button type="button" className={`${styles.round} ${styles.restart}`} onClick={restart} aria-label="Restart break timer">
                        <img src={refreshIcon} alt="" className={styles.icon} />
                    </button>
                </div>
            </div>
        </Panel>
    );
}

BreakTimer.propTypes = {
    seconds: PropTypes.number,
    className: PropTypes.string,
};
