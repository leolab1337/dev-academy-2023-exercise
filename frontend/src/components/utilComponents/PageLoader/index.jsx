import styles from "./PageLoader.module.css"
import {Loader} from "../Loader";

export const PageLoader = ({ className = '' }) => (
    <div className={styles.PageLoader + ' ' + className}>
        <div>.</div>
        <Loader />
    </div>
);
