import type {FC} from 'react';

import styles from './Welcome.module.css';

const Welcome: FC = () => {
    return (
        <section className={styles.welcome}>
            <h1 className={styles.title}>Astro + React</h1>
            <p className={styles.text}>Bootstrap template with vanilla CSS and CSS Modules.</p>
        </section>
    );
};

export default Welcome;
