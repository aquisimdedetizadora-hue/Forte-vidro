export interface GoogleReview {
  id: string;
  author: string;
  rating: number; // 1 a 5 estrelas
  text: string;
  date?: string;
  url?: string;
}

export const GOOGLE_MAPS_REVIEWS_URL = 'https://maps.app.goo.gl/aWDzqSnGax1ak5vE8';

/**
 * AVALIAÇÕES REAIS DA FORTE VIDROS — GOOGLE MAPS
 * 
 * Regra Fundamental de Integridade:
 * - Não inventar nomes, textos, notas ou depoimentos fictícios.
 * - Manter apenas avaliações comprovadamente publicadas por clientes reais na ficha oficial do Google Maps.
 * - Caso novas avaliações sejam publicadas na ficha oficial da Forte Vidros, adicione os registros neste array.
 */
export const REAL_GOOGLE_REVIEWS: GoogleReview[] = [];
