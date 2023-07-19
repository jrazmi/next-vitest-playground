import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

export async function GET(request: Request) {
    const cooks = cookies();
    const heads = headers();
    const somecookie = cooks.get('cookie');
    const someheader = heads.get('Authorization');
    
    return NextResponse.json({hello: 'world'})
}

