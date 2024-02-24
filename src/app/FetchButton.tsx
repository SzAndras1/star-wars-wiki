'use client'

import {useEffect, useState} from "react";
import {Character} from "@/lib/types";
import {Cards} from "@/app/Cards";

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
            <Cards characters={characters}></Cards>
            <button onClick={loadMore}>Load more</button>
        </div>
    );

}