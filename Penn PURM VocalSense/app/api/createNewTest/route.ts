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

const prisma = new PrismaClient()
export const dynamic = 'force-dynamic' 
export async function GET(request: Request){

    const newTestToken = await uniqid.process() as string

    const cookieStore = cookies()

    const randomValues = [];

    const exclude = []; 


    if(!cookieStore.get("previousTest"))
    {
        try
        {
            const excludes = JSON.parse(cookieStore.get("previousTest")?.value as string);
            exclude.push(excludes[0]);
            

        }
        catch{}
    }

    for(let i = 1; i < 12; i++)
    {
        const value = i; 
        if(exclude.includes(value) || i == 6) continue
        randomValues.push(value)
    }

    // const indexL = (Math.floor(Math.random()*randomValues.length) ); 

    // const leftPitch = randomValues[indexL]; 

    // randomValues.splice(indexL, 1); 

    const indexR = (Math.floor(Math.random()*randomValues.length) )

    const rightPitch = randomValues[ indexR];

    cookies().set(
        {
            name: "previousTest",
            value:JSON.stringify([
                rightPitch
            ]) ,
            path:"/",
            maxAge:30000
        }
    )


    const test = await prisma.test.create
    ({
        data: {
            codeId: newTestToken,
            right: rightPitch,
            left: 6
        },
    });

    // setTimeout(()=>
    // {
    //     prisma.test.delete(
    //         {
    //             where:
    //             {
    //                 codeId: newTestToken
    //             }
    //         }
    //     )
    // }, 20000*1000)

   
    try
    {
        
        cookies().set(
            {
                name: "currentTest",
                value:JSON.stringify({
                    codeId: newTestToken,
                    right: rightPitch,
                    left: 6
                }) ,
                path:"/",
                maxAge:20000
            }
        )

            

        return NextResponse.json({"fail":false,right: rightPitch}); 
    }
    catch(e)
    {
        console.log(e)
        return NextResponse.json({"fail":true, msg: e}); 
    }
}