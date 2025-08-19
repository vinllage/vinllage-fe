import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export function middlewre (request : NextRequest){
    const response = NextResponse.next()
    if(!request.cookies.get('User-Hash')?.value){
        response.cookies.set('User-Hash', '' + Date.now())
    }
    return NextResponse.next();
}

