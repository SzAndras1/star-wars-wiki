import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

interface Character {
    name: string;
    height: number;
    mass: number;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    home_world: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
}

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

            <div className="grid grid-cols-5 mt-16">
                {characters?.map(character => {
                    return <Card key={character.name}
                                 className="w-[220px] mb-8 hover:scale-125 ease-in duration-300 cursor-pointer">
                        <CardHeader>
                            <CardTitle>{character.name}</CardTitle>
                            <CardDescription>{character.birth_year} {character.gender}</CardDescription>
                        </CardHeader>
                    </Card>
                })}
            </div>
        </div>
    );
}
