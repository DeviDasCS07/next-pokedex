import Link from 'next/link';
import Layout from '../components/Layout';
export default function Home({ pokemon }) {
  console.log(pokemon);
  return (
    <Layout title="NextJS Pokedex">
      <h1>
        NextJS Pokedex
      </h1>
      <ul>
        {pokemon.map((pokemon, index) =>
          <li key={index}>
            <Link href={`/pokemon?id=${index + 1}`}>
              <a>
                <img src={pokemon.image} alt={pokemon.name} />
                <span>{index + 1} </span>
                {pokemon.name}
              </a>
            </Link>
          </li>
        )}
      </ul>
    </Layout>
  )
}

export async function getStaticProps(context) {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
    const { results } = await response.json();
    debugger;
    const pokemon = results.map((result, index) => {
      const paddedIndex = ("00" + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
      return {
        ...result,
        image
      }
    });

    return {
      props: {
        pokemon
      }
    };
  } catch (err) {
    console.error(err);
  }
}