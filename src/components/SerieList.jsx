import { useEffect, useState } from 'react';

const SerieList = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchSeries = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_API_KEY}&region=asia`
      );
      const data = await response.json();
      setSeries(data.results);
    };

    fetchSeries();
  }, []);

  return (
    <>
      <h2>Lista de Séries Asiáticas</h2>
      <ul>
        {series.map((serie) => (
          <li key={serie.id}>
            <h3>{serie.name}</h3>
            <p>{serie.overview}</p>
            <img src={`https://image.tmdb.org/t/p/w200/${serie.poster_path}`} alt={serie.name} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default SerieList;
