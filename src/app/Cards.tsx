import {Character} from "@/lib/types";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

interface characterArray {
    characters: Character[];
}

export function Cards({characters}: characterArray) {
    return (
        <div className='container mx-2xl'>
            <div className="grid grid-cols-5">
                {characters.map(character => {
                    return <Card key={character.name}
                                 className="w-[220px] mb-8 bg-blue-200 hover:scale-125 ease-in duration-300 cursor-pointer">
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