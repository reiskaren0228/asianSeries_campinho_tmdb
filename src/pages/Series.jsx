import { useState } from 'react';
import SerieList from '../components/SerieList';

const Series = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
      event.preventDefault();
      // Implemente aqui a lógica para buscar as informações da série com base no searchTerm
      console.log(`Pesquisar série: ${searchTerm}`);
    };
  
    return (
      <div>
        <h1 style={{ color: 'white' }}>Página de Séries Asiáticas</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Digite o nome da série"
          />
          <button type="submit">Buscar</button>
        </form>
        <SerieList />
      </div>
    );
  };
  
  export default Series;
