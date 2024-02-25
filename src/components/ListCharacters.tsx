'use client'

import {useEffect, useRef, useState} from "react";
import {Character} from "@/lib/types";
import {Cards} from "@/components/Cards";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";

export function ListCharacters() {
    const [characters, setCharacters] = useState([] as Character[]);
    const [page, setPage] = useState(1);
    const [formValid, setFormValid] = useState(true);
    const [count, setCount] = useState(0);
    const [filterName, setFilterName] = useState('');
    const [filterGender, setFilterGender] = useState('');

    const [useEffectTrigger, setUseEffectTrigger] = useState(1);
    useEffect(() => {
        setUseEffectTrigger(oldValue => oldValue + 1);
        if (useEffectTrigger > 3) {
            fetchData();
        }
    }, [filterName, filterGender]);
    const fetchData = async () => {
        let res;
        if (!filterName && !filterGender) {
            res = await fetch(`/api?page=${page}`);
        } else if (!filterGender) {
            res = await fetch(`/api?page=${page}&name=${filterName}`);
        } else if (!filterName) {
            res = await fetch(`/api?page=${page}&gender=${filterGender}`);
        } else {
            res = await fetch(`/api?page=${page}&name=${filterName}&gender=${filterGender}`);
        }
        const json = await res.json();
        const newData = json.results;
        setCount(json.count);
        setCharacters(oldData => [...oldData, ...newData]);
    };

    const loadMore = () => {
        setPage(oldPage => oldPage + 1);
    };

    const search = (formData: FormData) => {
        const name = formData.get('name');
        let select = formData.get('gender');
        if (name.length < 2 && name.length !== 0) {
            setFormValid(false);
            return;
        }
        setFilterName(name);
        // prevent sending none value to API
        if (select == 'none') {
            select = '';
        }
        setFilterGender(select);
        // empty the characters' array
        setCharacters([]);
        // if page is currently 1, then setPage won't trigger useEffect, so need to call fetchData instead
        /*if (page === 1) {
            console.log(name)
            fetchData();
        }*/
        // setPage will trigger useEffect
        setPage(1);
        setFormValid(true);
    }


    // development mode using StrictMode, so the useEffect will be called twice initially
    const effectRan = useRef(false);
    useEffect(() => {
        if (effectRan.current || process.env.NODE_ENV !== "development") {
            fetchData();
        }
        return () => effectRan.current = true;
    }, [page]);

    return (
        <div>
            <div className="container mx-2xl mb-12 mt-12">
                <form action={search}>
                    <div className="inline-grid grid-cols-2 gap-x-12">
                        <div>
                            <Label className={formValid ? "" : "text-red-500"} htmlFor="name">Name</Label>
                            <Input className={`w-[200px] ${formValid ? "" : "border-red-500"}`} type="text" name="name"
                                   placeholder="Name of the Character"/>
                            {formValid ? null : <p className="text-red-500">Minimum 2 character!</p>}
                        </div>
                        <div>
                            <Label>Gender</Label>
                            <Select name="gender">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a fruit"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">None</SelectItem>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="unknown">Unknown</SelectItem>
                                    <SelectItem value="n/a">n/a</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <br/>
                            <Button type="submit">Search</Button>
                        </div>
                    </div>
                </form>
                <div className="text-xl mt-8">Found: {count}, currently on the page: {characters.length}</div>
            </div>
            <Cards characters={characters}></Cards>
            <div className="flex justify-center">
                {Math.ceil(count / 10) == page ? null : <Button className="mb-8" onClick={loadMore}>Load more</Button>}
            </div>
        </div>
    );

}