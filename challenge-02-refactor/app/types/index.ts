export type DocumentCategory = 'docs' | 'wiki' | 'api';

export type Document = {
  id: string;
  title: string;
  content: string;
  category: DocumentCategory;
  tags: string[];
  createdAt: string;
  author: string;
};