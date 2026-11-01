import PropTypes from 'prop-types';
import { Badge } from '../../ui/Badge';
import { Panel } from '../../ui/Panel';
import { DELIVERY_CAPTION, DELIVERY_SUMMARY, SCORE_STATES } from '../../data/fixtures/dashboard';
import lampIcon from '../../assets/figma/lamp-icon.svg';
import styles from './DeliveryConfidence.module.css';

/**
 * Sprint Delivery Confidence card (Figma "sprint delivery potential",
 * 52% / 69% / 72%). `phase` selects the score state; the reasoning list is
 * always visible, as in the frames.
 */
export function DeliveryConfidence({ phase = 'entry', className = '' }) {
    const state = SCORE_STATES[phase] ?? SCORE_STATES.entry;

    return (
        <Panel className={[styles.card, className].filter(Boolean).join(' ')} aria-labelledby="delivery-confidence-title">
            <div className={styles.top}>
                <h2 id="delivery-confidence-title" className={styles.title}>
                    Sprint Delivery Confidence
                </h2>
                <div className={styles.summaryRow}>
                    <div className={styles.score}>
                        <p className={`${styles.scoreValue} ${styles[state.scoreTone]}`} aria-label={`${state.score} percent`}>
                            <span className={styles.scoreNumber}>{state.score}</span>
                            <span className={styles.scorePercent}>%</span>
                        </p>
                        <Badge label={state.status.label} tone={state.status.tone} soft status />
                    </div>
                    <div className={styles.summary}>
                        <div className={styles.bar} role="img" aria-label={`Delivery confidence factors, ${state.score}% overall`}>
                            {state.bar.map(([start, span, tone], i) => (
                                <span key={i} className={`${styles.segment} ${styles[`bar_${tone}`]}`} style={{ gridColumn: `${start} / span ${span}` }} />
                            ))}
                        </div>
                        <p className={styles.text}>{DELIVERY_SUMMARY}</p>
                        <p className={styles.caption}>
                            <img src={lampIcon} alt="" className={styles.lamp} />
                            <span>{DELIVERY_CAPTION}</span>
                        </p>
                    </div>
                </div>
            </div>

            <ul className={styles.reasons}>
                {state.reasons.map((item) => (
                    <li key={item.title} className={styles.reason}>
                        <span className={`${styles.impact} ${styles[item.tone]}`}>{item.impact}</span>
                        <div className={styles.reasonText}>
                            <p className={styles.reasonTitle}>{item.title}</p>
                            <p className={styles.reasonDetail}>{item.detail}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </Panel>
    );
}

DeliveryConfidence.propTypes = {
    phase: PropTypes.oneOf(['entry', 'in-progress', 'complete']),
    className: PropTypes.string,
};
