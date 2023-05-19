import styles from "./Loader.module.css";

export const Loader = ({ className = ''  }) => (
    <div className={styles.Loader + ' ' + className}>
        <div />
        <div />
        <div />
        <div />
    </div>
);

