import { Document } from '../types';
import { DocumentCard } from './DocumentCard';
import styles from './DocumentList.module.css';

type DocumentListProps = {
    docs: Document[];
};

export const DocumentList = ({ docs }: DocumentListProps) => {
    if (docs.length === 0) {
        return (
            <div className={styles.emptyState}>
                <h3>Nenhum documento encontrado</h3>
                <p>Tente ajustar os filtros de busca</p>
            </div>
        );
    }

    return (
        <div className={styles.grid}>
            {docs.map((doc) => (
                <DocumentCard key={doc.id} doc={doc} />
            ))}
        </div>
    );
};