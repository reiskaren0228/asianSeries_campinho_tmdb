// Função para criar um card de série
function criarCardSerie(serie) {
  const card = document.createElement('div');
  card.classList.add('card');

  const seriesContainer = document.getElementById('seriesContainer');
  const totalSeries = seriesContainer.childElementCount;

  if (totalSeries <= 2 && !seriesContainer.classList.contains('grid-layout')) {
    card.classList.add('single-card');
  }

  const releaseYear = serie.first_air_date ? new Date(serie.first_air_date).getFullYear() : '-';
  const rating = serie.vote_average ? serie.vote_average : '-';
  const posterURL = serie.poster_path ? `https://image.tmdb.org/t/p/w500/${serie.poster_path}` : 'placeholder.jpg';

  card.innerHTML = `
    <h3>${serie.name}</h3>
    <img src="${posterURL}" alt="${serie.name}">
    <p>Ano de lançamento: ${releaseYear}</p>
    <p>Avaliação: ${rating}</p>
    <a href="https://www.themoviedb.org/tv/${serie.id}" class="btn-detalhes">Quero Saber +</a>
  `;

  return card;
}

// Função para verificar se a série é asiática
function isSerieAsiatica(serie) {
  const paisesAsiaticos = ['China', 'Japão', 'Coreia do Sul', 'Tailândia'];
  const linguagensAsiaticas = ['zh', 'ja', 'ko', 'th'];

  const paisDeOrigem = serie.origin_country && serie.origin_country.length > 0 ? serie.origin_country[0] : null;
  const linguagem = serie.original_language;

  return paisesAsiaticos.includes(paisDeOrigem) || linguagensAsiaticas.includes(linguagem);
}

// Função para buscar as séries mais bem avaliadas
async function obterSeriesMaisBemAvaliadas() {
  const apiKey = '20e97e586a4a12e8ae9707add56edc2c';
  const url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=pt-BR&page=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const seriesContainer = document.getElementById('seriesContainer');
    seriesContainer.innerHTML = '';

    const seriesFiltradas = data.results.filter(isSerieAsiatica).slice(0, 6);
    seriesFiltradas.forEach((serie) => {
      const card = criarCardSerie(serie);
      seriesContainer.appendChild(card);
    });

    seriesContainer.classList.remove('grid-layout'); // Remover a classe 'grid-layout'
  } catch (error) {
    console.error('Erro ao obter séries mais bem avaliadas:', error);
  }
}

async function pesquisarSeries() {
  const apiKey = '20e97e586a4a12e8ae9707add56edc2c';
  const query = document.getElementById('searchInput').value;
  const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=pt-BR&page=1&query=${query}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const seriesContainer = document.getElementById('seriesContainer');
    seriesContainer.innerHTML = '';

    data.results.forEach((serie) => {
      if (isSerieAsiatica(serie)) {
        const card = criarCardSerie(serie);
        seriesContainer.appendChild(card);
      }
    });

    seriesContainer.classList.remove('grid-layout'); // Remover a classe 'grid-layout'
  } catch (error) {
    console.error('Erro ao obter séries:', error);
  }
}

// Adiciona o evento de clique ao botão de pesquisa
document.getElementById('searchButton').addEventListener('click', function (event) {
  event.preventDefault(); // Previne o comportamento padrão do formulário
  pesquisarSeries();
});

// Adiciona o event listener para a tecla "Enter" no input de pesquisa
document.getElementById('searchInput').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    pesquisarSeries();
  }
});

// Chamar a função para buscar as séries mais bem avaliadas ao carregar a página
window.addEventListener('load', obterSeriesMaisBemAvaliadas);