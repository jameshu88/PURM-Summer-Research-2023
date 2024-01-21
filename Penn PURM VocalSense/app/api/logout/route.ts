import type { NextApiRequest, NextApiResponse } from 'next'

import {Prisma, PrismaClient} from "@prisma/client"
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import { cookies } from 'next/headers'
import * as bcrypt from "bcrypt";
import * as jsonwebtoken from "jsonwebtoken"
import { NextResponse } from 'next/server';
import { Cookies } from 'react-cookie';
import uniqid from "uniqid";

type accountData = {
    userId: string
}
export const dynamic = 'force-dynamic' 
const prisma = new PrismaClient()

export async function GET(request: Request){

    await cookies().set(
        {
            name: "username",
            value:"",
            path:"/",
            maxAge:0
        }
    )
    await cookies().set(
        {
            name: "currentTest",
            value:"",
            path:"/",
            maxAge:0
        }
    )
    return NextResponse.json({"fail":false})
}