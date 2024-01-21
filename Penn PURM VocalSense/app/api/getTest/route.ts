import type { NextApiRequest, NextApiResponse } from 'next'

import {Prisma, PrismaClient} from "@prisma/client"
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import { cookies } from 'next/headers'
import * as bcrypt from "bcrypt";
import * as jsonwebtoken from "jsonwebtoken"
import { NextResponse } from 'next/server';
import { Cookies } from 'react-cookie';
import uniqid from "uniqid";
export const dynamic = 'force-dynamic' 
type accountData = {
    guessId: number
}

const prisma = new PrismaClient()

export async function GET(request: Request){


    console.log("HELO")
    const cookieStore = cookies()
    const testToken = cookieStore.get("currentTest")?.value;
    
    if(!testToken)
    {
        return NextResponse.json({fail:true})
    }
    
    
    const testTokenJSON = JSON.parse(testToken)
    const testData = await prisma.test.findUnique(
        {
            where:
            {
                codeId:testTokenJSON.codeId
            }
        }
        
    );

    if(!testData)
    {
        NextResponse.redirect("/")
        return NextResponse.json({fail:true})
    }
    
    
   
    try
    {
        return NextResponse.json({"fail":false,right:testData.right }); 
    }
    catch(e)
    {
        console.log(e)
        return NextResponse.json({"fail":true, msg: "something went wrong"}); 
    }
}