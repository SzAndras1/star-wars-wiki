import {Character} from "@/lib/types";
import {FetchButton} from "@/app/FetchButton";
import {Cards} from "@/app/Cards";


async function getCharacters(): Promise<Character[]> {
    const res = await fetch(
        `https://swapi.dev/api/people/?page=1`,
        {cache: 'no-store'}
    );
    const data = await res.json();

    return data?.results as Character[];
}


export default async function Home() {
    const characters: Character[] = await getCharacters();
    return (
        <div className='container mx-2xl'>
            <h1>Characters</h1>

            <Cards characters={characters}></Cards>
            <div>
                <FetchButton></FetchButton>
            </div>
        </div>
    );
}
