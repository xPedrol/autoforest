import { MetadataRoute } from 'next'

// Função que gera o sitemap do sistema
export default function sitemap(): MetadataRoute.Sitemap {
  // URL base do seu site
  const baseUrl = 'https://autoforest.vercel.app' // Substitua com sua URL real

  // Lista de rotas estáticas do site
  const routes = [
    '',
    '/cadastrar',
    '/entrar',
    '/painel-de-controle',
    '/analise-de-dados',
  ]

  // Data atual para o lastModified
  const currentDate = new Date()

  // Cria o sitemap mapeando cada rota para o formato necessário
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  })) as MetadataRoute.Sitemap
}
