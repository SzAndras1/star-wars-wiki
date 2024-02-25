'use client'

import {Character} from "@/lib/types";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useState} from "react";
import {Modal} from "@/components/Modal";

interface characterArray {
    characters: Character[];
}

export function Cards({characters}: characterArray) {
    const [modal, setModal] = useState(false);
    const [characterIndex, setCharacterIndex] = useState(0);
    const [filmArray, setFilmArray] = useState([] as number[]);
    const handleClick = (e, ndx: number) => {
        setCharacterIndex(ndx)
        setModal(true)
        const array = characters[ndx].films.map(i => i.at(i.length - 2))
        setFilmArray(array);
    }

    return (
        <div className='container mx-2xl'>
            <div className="grid grid-cols-5">
                {characters.map((character, ndx) => {
                    return <Card key={character.name}
                                 className="w-[220px] mb-8 bg-blue-200 hover:scale-125 ease-in duration-300 cursor-pointer"
                                 onClick={e => handleClick(e, ndx)}>
                        <CardHeader>
                            <CardTitle>{character.name}</CardTitle>
                            <CardDescription>{character.birth_year} {character.gender}</CardDescription>
                        </CardHeader>
                    </Card>
                })}
            </div>
            {characters.length > 0 ?
                <Modal openModal={modal} closeModal={() => setModal(false)}>
                    <div className="container text-xl">
                        <div className="grid gap-y-2 gap-x-0 grid-cols-2">
                            <div className="text-right mr-6">Name:</div>
                            <div>{characters[characterIndex].name}</div>
                            <div className="text-right mr-6">Height:</div>
                            <div>{characters[characterIndex].height}</div>
                            <div className="text-right mr-6">Mass:</div>
                            <div>{characters[characterIndex].mass}</div>
                            <div className="text-right mr-6">Films:</div>
                            <div>{filmArray.join(', ')}</div>
                        </div>
                    </div>
                </Modal>
                : null}
        </div>
    );
}