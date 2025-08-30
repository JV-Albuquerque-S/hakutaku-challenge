import mockData from './mockData.json';

export type SearchResult = {
    id: string;
    title: string;
    content: string;
    category: 'documentation' | 'api' | 'wiki' | 'slack' | 'email';
    source: string;
    score: number;
    snippet: string;
    timestamp: string;
    author?: string;
};

const mockResults: SearchResult[] = mockData as SearchResult[];

const normalizeString = (str: string | undefined): string => {
    if (!str) return '';
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
};

const levenshteinDistance = (a: string, b: string): number => {
    const matrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));
    for (let i = 0; i <= a.length; i += 1) matrix[0][i] = i;
    for (let j = 0; j <= b.length; j += 1) matrix[j][0] = j;
    for (let j = 1; j <= b.length; j += 1) {
        for (let i = 1; i <= a.length; i += 1) {
            const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[j][i] = Math.min(
                matrix[j][i - 1] + 1,
                matrix[j - 1][i] + 1,
                matrix[j - 1][i - 1] + indicator,
            );
        }
    }
    return matrix[b.length][a.length];
};


export async function searchKnowledge(query: string, limit = 10): Promise<SearchResult[]> {
    if (!query.trim()) {
        return [];
    }

    const normalizedQuery = normalizeString(query);

    const scoredResults = mockResults.map(doc => {
        let score = 0;
        
        const normalizedTitle = normalizeString(doc.title);
        const normalizedContent = normalizeString(doc.content);
        const normalizedSnippet = normalizeString(doc.snippet);
        const normalizedAuthor = normalizeString(doc.author); 
        const normalizedCategory = normalizeString(doc.category);

        if (normalizedTitle.includes(normalizedQuery)) score += 30;
        if (normalizedContent.includes(normalizedQuery)) score += 10;
        if (normalizedSnippet.includes(normalizedQuery)) score += 10;
        if (normalizedCategory.includes(normalizedQuery)) score += 5;
        if (normalizedAuthor.includes(normalizedQuery)) score += 5;

        const FUZZY_THRESHOLD = normalizedQuery.length > 4 ? 2 : 1;

        normalizedTitle.split(/\s+/).forEach(word => {
            const distance = levenshteinDistance(word, normalizedQuery);
            if (distance > 0 && distance <= FUZZY_THRESHOLD) {
                score += 15 / distance;
            }
        });

        normalizedContent.split(/\s+/).forEach(word => {
            const distance = levenshteinDistance(word, normalizedQuery);
            if (distance > 0 && distance <= FUZZY_THRESHOLD) {
                score += 5 / distance;
            }
        });

        return { ...doc, score };
    });

    const sorted = scoredResults
        .filter(doc => doc.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);

    return sorted;
}