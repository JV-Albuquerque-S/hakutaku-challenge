import { Document } from '../types';
import { formatDate, getCategoryColor } from '../utils/helpers';
import styles from './DocumentCard.module.css';

type DocumentCardProps = {
    doc: Document;
};

export const DocumentCard = ({ doc }: DocumentCardProps) => (
    <div className={styles.card}>
        <div className={styles.header}>
            <h3 className={styles.title}>{doc.title}</h3>
            <span
                className={styles.category}
                style={{ backgroundColor: getCategoryColor(doc.category) }}
            >
                {doc.category.toUpperCase()}
            </span>
        </div>
        <p className={styles.content}>{doc.content}</p>
        <div className={styles.tags}>
            {doc.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                    #{tag}
                </span>
            ))}
        </div>
        <div className={styles.footer}>
            <span>Por: <strong>{doc.author}</strong></span>
            <span>{formatDate(doc.createdAt)}</span>
        </div>
    </div>
);