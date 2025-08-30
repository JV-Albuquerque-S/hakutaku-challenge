import { expect } from 'chai';
import { searchKnowledge } from '../lib/searchAPI';

describe('Intelligent Search Algorithm', function() {

    it('deve retornar um array vazio para uma query vazia', async () => {
        const results = await searchKnowledge('');
        expect(results).to.deep.equal([]);
    });

    it('deve priorizar correspondências no título sobre o conteúdo', async function() {
        const results = await searchKnowledge('busca');
        
        const titleMatch = results.find(r => r.title.toLowerCase().includes('busca'));

        const contentMatch = results.find(r => 
            !r.title.toLowerCase().includes('busca') && 
            r.content.toLowerCase().includes('busca')
        );

        if (titleMatch && contentMatch) {
            expect(titleMatch.score).to.be.greaterThan(contentMatch.score);
        } else {
            console.warn("  -> AVISO: Teste 'priorizar título' pulado. Não foram encontrados documentos nos dados que satisfaçam a condição (match apenas no conteúdo).");
            this.skip();
        }
    });

    it('deve lidar com acentuação (buscar "semantica" e encontrar "semântica")', async () => {
        const results = await searchKnowledge('semantica');
        const found = results.some(r => r.title.toLowerCase().includes('semântica'));

        expect(found, "Nenhum resultado com 'semântica' foi encontrado").to.be.true;
        if (results.length > 0) {
            expect(results[0].score).to.be.greaterThan(0);
        }
    });

    it('deve encontrar "busca" ao pesquisar por "buca" (fuzzy matching/typo)', async () => {
        const results = await searchKnowledge('buca');
        const found = results.some(r => r.title.toLowerCase().includes('busca') || r.content.toLowerCase().includes('busca'));
        
        expect(found, "Nenhum resultado para o typo 'buca' foi encontrado").to.be.true;
        if (results.length > 0) {
            expect(results[0].score).to.be.greaterThan(0);
        }
    });

    it('deve retornar resultados ordenados pelo score', async () => {
        const results = await searchKnowledge('RAG');
        
        for (let i = 0; i < results.length - 1; i++) {
            expect(results[i].score).to.be.at.least(results[i + 1].score);
        }
    });

    it('deve respeitar o parâmetro de limite', async () => {
        const results = await searchKnowledge('busca', 3);
        expect(results.length).to.be.at.most(3);
    });
});