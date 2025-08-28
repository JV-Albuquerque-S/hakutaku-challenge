import styles from './FilterControls.module.css';

type FilterControlsProps = {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    selectedCategory: string;
    onCategoryChange: (value: string) => void;
    sortBy: string;
    onSortChange: (value: string) => void;
};

export const FilterControls = ({
    searchTerm, onSearchChange,
    selectedCategory, onCategoryChange,
    sortBy, onSortChange
}: FilterControlsProps) => (
    <div className={styles.controlsContainer}>
        <div>
            <label htmlFor="search-input" className={styles.label}>Buscar:</label>
            <input
                id="search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Digite para buscar..."
                className={styles.input}
            />
        </div>
        <div>
            <label htmlFor="category-select" className={styles.label}>Categoria:</label>
            <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className={styles.select}
            >
                <option value="all">Todas</option>
                <option value="docs">Documentação</option>
                <option value="wiki">Wiki</option>
                <option value="api">API</option>
            </select>
        </div>
        <div>
            <label htmlFor="sort-select" className={styles.label}>Ordenar por:</label>
            <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className={styles.select}
            >
                <option value="title">Título</option>
                <option value="date">Data</option>
                <option value="author">Autor</option>
            </select>
        </div>
    </div>
);