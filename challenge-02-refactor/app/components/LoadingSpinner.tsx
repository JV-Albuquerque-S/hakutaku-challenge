import styles from './LoadingSpinner.module.css';

export const LoadingSpinner = () => (
    <div className={styles.container}>
        <div className={styles.spinner}></div>
        <p>Carregando base de conhecimento...</p>
    </div>
);