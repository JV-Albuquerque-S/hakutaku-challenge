'use client';

import { useKnowledgeBase } from './hooks/useKnowledgeBase';
import { LoadingSpinner } from './components/LoadingSpinner';
import { FilterControls } from './components/FilterControls';
import { TagFilter } from './components/TagFilter';
import { DocumentList } from './components/DocumentList';
import styles from './page.module.css';

export default function KnowledgeBasePage() {
    const { loading, filteredDocs, allTags, filters, handlers } = useKnowledgeBase();

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>📚 Base de Conhecimento Hakutaku</h1>
            
            <FilterControls
                searchTerm={filters.searchTerm}
                onSearchChange={handlers.setSearchTerm}
                selectedCategory={filters.selectedCategory}
                onCategoryChange={handlers.setSelectedCategory}
                sortBy={filters.sortBy}
                onSortChange={handlers.setSortBy}
            />

            <TagFilter
                allTags={allTags}
                selectedTags={filters.selectedTags}
                onTagToggle={handlers.handleTagToggle}
            />

            <div className={styles.resultsCount}>
                <strong>{filteredDocs.length}</strong> documento(s) encontrado(s)
            </div>

            <DocumentList docs={filteredDocs} />
        </main>
    );
}