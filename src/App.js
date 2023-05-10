import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import CryptoList from "./components/CryptoList";
import Loader from "./components/Loader";

const PAGE_NUMBER = 1;

const App = () => {
  // Definir os estados iniciais
  const [coinsData, setCoinsData] = useState([]);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [loading, setLoading] = useState(false);

  // UseEffect para obter dados da API usando Axios
  useEffect(() => {
    // Definir o tempo de espera de 1,5 segundos antes de obter dados
    setTimeout(async () => {
      const response = await axios.get(
        // URL da API com a página atual
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=${page}&sparkline=false`
      );

      // Adicionar novos dados à matriz de dados existente
      setCoinsData((prev) => {
        return [...prev, ...response.data];
      });
      setLoading(false);
    }, 1500);
  }, [page]);

  // UseEffect para lidar com a rolagem da página
  useEffect(() => {
    // Adicionar o evento de rolagem da janela
    window.addEventListener("scroll", handleScroll);

    // Remover o evento de rolagem quando o componente é desmontado
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Função para lidar com a rolagem da página
  const handleScroll = async () => {
    // Verificar se o usuário chegou ao fim da página
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setPage((prev) => prev + 1);
    }
  };

  // Renderizar o componente
  return (
    <div className='app'>
      <h1>Galeria de Cripto</h1>
      {/* Passar os dados para o componente CryptoList */}
      <CryptoList coinsData={coinsData} />
      {/* Renderizar o componente Loader se loading é verdadeiro */}
      {loading && <Loader />}
    </div>
  );
};

export default App;
