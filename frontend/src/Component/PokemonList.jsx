import { useEffect, useState } from "react";
import { Url } from "../config";
import { Link } from "react-router-dom";

const PokemonList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPokemons = async () => {
      try {
        const res = await fetch(`${Url}/pokemon-list`);
        const data = await res.json();

        const details = await Promise.all(
          data.results.map((item) => fetch(item.url).then((r) => r.json()))
        );

        setList(details);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getPokemons();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h1 className="mb-4">Random Pokémon List</h1>

      <table className="table table-success table-striped-columns">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Detail</th>
          </tr>
        </thead>

        <tbody>
          {list.map((p, i) => (
            <tr key={p.id}>
              <td>{i + 1}</td>
              <td>
                <img src={p.sprites.front_default} width="100" alt={p.name} />
              </td>
              <td>{p.name}</td>
              <td>
                <Link to={`/viewDetail/${p.name}`}>
                  <button className="btn btn-primary">View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PokemonList;
