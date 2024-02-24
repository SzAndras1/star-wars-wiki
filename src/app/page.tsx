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
    homeworld: string;
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
        <div>
            <h1>Characters</h1>
            <div className="flex">
                {characters?.map(character => {
                    return <Card key={character.name} className="w-[350px]">
                        <CardHeader>
                            <CardTitle>{character.name}</CardTitle>
                            <CardDescription>{character.height} {character.mass}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {character.created.substring(0, 10)}
                        </CardContent>
                    </Card>
                })}
            </div>
        </div>
    );
}
