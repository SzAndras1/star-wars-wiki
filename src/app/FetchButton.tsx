'use client'

import {useEffect, useRef, useState} from "react";
import {Character} from "@/lib/types";
import {Cards} from "@/app/Cards";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";

export function FetchButton() {
    const [characters, setCharacters] = useState([] as Character[]);
    const [page, setPage] = useState(1);
    const [formValid, setFormValid] = useState(true);

    const fetchData = async () => {
        const res = await fetch(`/api/?page=${page}`);
        const newData = await res.json();
        setCharacters(oldData => [...oldData, ...newData]);
    };

    const loadMore = () => {
        setPage(oldPage => oldPage + 1);
    };

    const search = (formData: FormData) => {
        const name = formData.get('name');
        const select = formData.get('gender');
        if (name.length === 0) {
            console.log("itt vok!");
            console.log(select);
        } else if (name.length < 3) {
            //setFormValid = 'w-[200px] border-red-500';
            setFormValid(false);
            return;
        }
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
                            {formValid ? null : <p className="text-red-500">Minimum 3 character!</p>}
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
            </div>
            <Cards characters={characters}></Cards>
            <button onClick={loadMore}>Load more</button>
        </div>
    );

}