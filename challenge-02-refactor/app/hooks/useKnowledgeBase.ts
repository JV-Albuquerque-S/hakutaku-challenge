import { useState, useEffect, useMemo } from 'react';
import { Document } from '../types';

// "Banco de dados"
async function fetchDocuments(): Promise<Document[]> {
    const mockDocs: Document[] = [
        { id: '1', title: 'API Documentation', content: 'Complete API reference for Hakutaku platform', category: 'api', tags: ['api', 'reference', 'backend'], createdAt: '2024-01-15', author: 'João Silva' },
        { id: '2', title: 'User Guide', content: 'How to use Hakutaku knowledge management system', category: 'docs', tags: ['guide', 'tutorial', 'frontend'], createdAt: '2024-01-20', author: 'Maria Santos' },
        { id: '3', title: 'Architecture Overview', content: 'System architecture and design patterns', category: 'wiki', tags: ['architecture', 'design', 'system'], createdAt: '2024-01-10', author: 'Pedro Costa' },
    ];
    // Simula um delay da rede
    return new Promise(resolve => setTimeout(() => resolve(mockDocs), 5000));
}

export const useKnowledgeBase = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Estados dos filtros
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<string>('title');

    useEffect(() => {
        const loadDocuments = async () => {
            setLoading(true);
            const docs = await fetchDocuments();
            setDocuments(docs);
            setLoading(false);
        };
        loadDocuments();
    }, []);

    const allTags = useMemo(() => {
        const tagsSet = new Set(documents.flatMap(doc => doc.tags));
        return [...tagsSet];
    }, [documents]);

    const filteredDocs = useMemo(() => {
        let filtered = [...documents];

        // Filtragem
        if (searchTerm.trim() !== '') {
            const lowercasedTerm = searchTerm.toLowerCase();
            filtered = filtered.filter(doc =>
                doc.title.toLowerCase().includes(lowercasedTerm) ||
                doc.content.toLowerCase().includes(lowercasedTerm) ||
                doc.author.toLowerCase().includes(lowercasedTerm) ||
                doc.tags.some(tag => tag.toLowerCase().includes(lowercasedTerm))
            );
        }
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(doc => doc.category === selectedCategory);
        }
        if (selectedTags.length > 0) {
            filtered = filtered.filter(doc => selectedTags.some(tag => doc.tags.includes(tag)));
        }

        // Ordenação
        if (sortBy === 'title') {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === 'date') {
            filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } else if (sortBy === 'author') {
            filtered.sort((a, b) => a.author.localeCompare(b.author));
        }
        
        return filtered;
    }, [documents, searchTerm, selectedCategory, selectedTags, sortBy]);
    
    const handleTagToggle = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    return {
        loading,
        filteredDocs,
        allTags,
        filters: {
            searchTerm,
            selectedCategory,
            selectedTags,
            sortBy,
        },
        handlers: {
            setSearchTerm,
            setSelectedCategory,
            handleTagToggle,
            setSortBy,
        },
    };
};