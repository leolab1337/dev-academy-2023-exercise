import styles from "./PageLoader.module.css"
import {Loader} from "../../utilComponents/Loader";

export const PageLoader = ({ className = '' }) => (
    <div className={styles.PageLoader + ' ' + className}>
        <div>.</div>
        <Loader />
    </div>
);
