function obterIdSerie() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Função para obter os detalhes da série com base no ID
async function obterDetalhesSerie() {
    const apiKey = '20e97e586a4a12e8ae9707add56edc2c';
    const idSerie = obterIdSerie();

    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${idSerie}?api_key=${apiKey}&language=pt-BR`);
        const serie = await response.json();

        // Exibir os detalhes da série no elemento "serieDetalhes"
        const serieDetalhes = document.getElementById('serieDetalhes');
        serieDetalhes.innerHTML = `
        <h3>${serie.name}</h3>
        <p>${serie.overview}</p>
        <img src="https://image.tmdb.org/t/p/w500/${serie.poster_path}" alt="${serie.name}">
        <!-- Mais informações da série... -->
      `;
    } catch (error) {
        console.log('Erro ao obter detalhes da série:', error);
    }
}

obterDetalhesSerie();