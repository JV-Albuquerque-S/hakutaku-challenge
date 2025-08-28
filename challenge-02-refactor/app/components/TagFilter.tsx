import styles from './TagFilter.module.css';

type TagFilterProps = {
    allTags: string[];
    selectedTags: string[];
    onTagToggle: (tag: string) => void;
};

export const TagFilter = ({ allTags, selectedTags, onTagToggle }: TagFilterProps) => (
    <div className={styles.tagContainer}>
        <label className={styles.label}>Tags:</label>
        <div className={styles.tagList}>
            {allTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                    <button
                        key={tag}
                        onClick={() => onTagToggle(tag)}
                        className={`${styles.tagButton} ${isSelected ? styles.selected : ''}`}
                    >
                        {tag}
                    </button>
                );
            })}
        </div>
    </div>
);