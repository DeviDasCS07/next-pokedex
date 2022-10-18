import React from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
export default function pokemon({ pokeman }) {
    console.log(pokeman)
    return (
        <Layout title={pokeman.name}>
            <h1>{pokeman.name}</h1>
            <img src={pokeman.image} alt={pokeman.name} />
            <span >Weight: {pokeman.weight}</span>
            <span >Height: {pokeman.height}</span>
            <h2>Types</h2>
            {pokeman.types.map((type, index) =>
                <p key={index}>{type.type.name}</p>
            )}
            <p>
                <Link href="/"><u>Home</u></Link>
            </p>
        </Layout>
    )
}

export async function getServerSideProps({ query }) {
    const id = query.id;
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokeman = await response.json();
        const paddedIndex = ("00" + id).slice(-3);
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
        pokeman.image = image;
        return {
            props: { pokeman }
        };
    } catch (err) {
        console.error(err);
    }
}