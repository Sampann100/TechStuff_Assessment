import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Url } from "../config";

const PokemonDetailPage = () => {
  const { name } = useParams();

  const [pokemon, setPokemon] = useState(null);
  const [typeData, setTypeData] = useState(null);
  const [activeTab, setActiveTab] = useState("types");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch(`${Url}/pokemonDetail/${name}`);
        const data = await res.json();
        setPokemon(data);

        const typeUrl = data.types[0].type.url;
        const typeRes = await fetch(typeUrl);
        const typeJson = await typeRes.json();
        setTypeData(typeJson);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPokemon();
  }, [name]);

  if (!pokemon || !typeData) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{pokemon.name.toUpperCase()}</h2>

      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        width="150"
        style={{ marginBottom: "20px" }}
      />

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setActiveTab("types")}>Types</button>
        <button onClick={() => setActiveTab("indices")} style={{ marginLeft: "10px" }}>
          Game Indices
        </button>
        <button onClick={() => setActiveTab("moves")} style={{ marginLeft: "10px" }}>
          Moves
        </button>
      </div>

      {activeTab === "types" && (
        <div>
          <h3>Types</h3>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>#</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.types.map((t, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{t.type.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "indices" && (
        <div>
          <h3>Game Indices</h3>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>#</th>
                <th>Game Index</th>
                <th>Generation</th>
              </tr>
            </thead>
            <tbody>
              {typeData.game_indices.map((g, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{g.game_index}</td>
                  <td>{g.generation.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "moves" && (
        <div>
          <h3>Moves</h3>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>#</th>
                <th>Move</th>
              </tr>
            </thead>
            <tbody>
              {typeData.moves.map((m, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{m.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PokemonDetailPage;
