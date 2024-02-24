import {NextRequest} from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page');
    const res = await fetch(
        `https://swapi.dev/api/people/?page=${page}`
    );
    const data = await res.json();

    return Response.json(data.results)
}