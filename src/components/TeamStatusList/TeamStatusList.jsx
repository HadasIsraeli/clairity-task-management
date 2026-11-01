import PropTypes from 'prop-types';
import { Avatar } from '../../ui/Avatar';
import { Panel } from '../../ui/Panel';
import { TEAM_STATUS } from '../../data/fixtures/dashboard';
import { PEOPLE } from '../../data/fixtures/people';
import styles from './TeamStatusList.module.css';

const PERSON_BY_NAME = Object.fromEntries(Object.values(PEOPLE).map((p) => [p.short, p]));

/** Team availability list (Figma "Team" / "team status"). */
export function TeamStatusList({ members = TEAM_STATUS, className = '' }) {
    return (
        <Panel className={[styles.card, className].filter(Boolean).join(' ')} aria-labelledby="team-title">
            <h2 id="team-title" className={styles.title}>
                Team
            </h2>
            <ul className={styles.list}>
                {members.map((member) => (
                    <li key={member.name} className={styles.row}>
                        <Avatar src={PERSON_BY_NAME[member.name]?.photo} size={24} presence={member.presence} dimmed alt="" />
                        <span className={styles.name}>{member.name}</span>
                        <span className={`${styles.status} ${styles[member.tone]}`}>{member.status}</span>
                    </li>
                ))}
            </ul>
        </Panel>
    );
}

TeamStatusList.propTypes = {
    members: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            tone: PropTypes.oneOf(['red', 'green', 'yellow']).isRequired,
            presence: PropTypes.oneOf(['red', 'green', 'yellow']).isRequired,
        }),
    ),
    className: PropTypes.string,
};
