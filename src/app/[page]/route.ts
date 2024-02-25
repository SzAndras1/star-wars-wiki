import {NextRequest} from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page');
    const name = searchParams.get('name');
    const gender = searchParams.get('gender')
    let req;
    if (name === null) {
        req = await fetch(`https://swapi.dev/api/people/?page=${page}`);
    } else {
        req = await fetch(`https://swapi.dev/api/people/?search=${name}&page=${page}`);
    }
    const data = await req.json();
    let genderFilter = [];
    if (gender) {
        if (data.results.length > 0) {
            genderFilter = data.results.filter(character => character.gender === gender);
        }
    }
    const res = {};
    if (gender) {
        res.count = genderFilter.length;
        res.results = genderFilter;
    } else {
        res.count = data.count;
        res.results = data.results;
    }

    return Response.json(res);
}