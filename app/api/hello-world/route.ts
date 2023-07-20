import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const cooks = cookies().get('cookie');
    const authToken = headers().get('Authorization');
    
    return NextResponse.json({ cooks, authToken })
}

