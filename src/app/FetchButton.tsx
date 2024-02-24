'use client'

import {useEffect, useState} from "react";
import {Character} from "@/lib/types";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export function FetchButton() {
    const [characters, setCharacters] = useState([] as Character[]);
    const [page, setPage] = useState(1);

    const fetchData = async () => {
        const res = await fetch(`/api/?page=${page}`);
        const newData = await res.json();
        setCharacters(oldData => [...oldData, ...newData]);
    };

    const loadMore = () => {
        setPage(oldPage => oldPage + 1);
    };

    useEffect(() => {
        if (page === 1) {
            return () => {
            };
        }
        fetchData();
    }, [page]);

    return (
        <div>
            <div className="grid grid-cols-5">
                {characters.map(character => {
                    return <Card key={character.name}
                                 className="w-[220px] mb-8 hover:scale-125 ease-in duration-300 cursor-pointer">
                        <CardHeader>
                            <CardTitle>{character.name}</CardTitle>
                            <CardDescription>{character.birth_year} {character.gender}</CardDescription>
                        </CardHeader>
                    </Card>
                })}
            </div>
            <button onClick={loadMore}>Load more</button>
        </div>
    );

}