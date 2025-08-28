import { DocumentCategory } from '../types';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const getCategoryColor = (category: DocumentCategory): string => {
  const colors: Record<DocumentCategory, string> = {
    docs: '#4CAF50',
    wiki: '#2196F3',
    api: '#FF9800',
  };
  return colors[category] || '#666';
};