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

export async function POST(request: Request){

    const {guessId}: Partial<accountData> = await request.json();
    const cookieStore = cookies()
    const testToken = cookieStore.get("currentTest")?.value;
    const userId = cookieStore.get("username")?.value;
    if(!testToken)
    {
        console.log("HELLO1")
        return NextResponse.json({fail:true})
    }
    if(!guessId)
    {
        
        console.log("HELLO2")
        return NextResponse.json({fail:true})
    }
    if(!userId)
    {
        console.log("HELLO3")
        return NextResponse.json({fail:false})
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

    console.log(testData)
    if(!testData)
    {
        NextResponse.redirect("/")
        return NextResponse.json({fail:true})
    }
    
    let correct = false

    console.log(guessId)


    if(guessId == 1 && testData.left>testData.right)
    {
        correct = true
    }
    
    else if(guessId == 2 && testData.left<testData.right)
    {
        correct = true
    }

    console.log(correct)

    
    //update user
    console.log(userId)
    const usedId = await jsonwebtoken.verify(userId, process.env.TOKEN_SECRET!) as jsonwebtoken.JwtPayload;
    console.log(typeof usedId)
    const userToken = usedId; 
    console.log(userToken)
    const user = await prisma.user.findUnique(
        {
            where: {
                loginCode:userToken.userId
            }
        }
        )
    if(!user) return NextResponse.json({fail:true})
    // if(correct) user.correct++;
    // user.total++;
    // user.score =user.correct / parseFloat( user.total.toString())

    const updateData = {
        total: user.total +1,
        correct:user.correct + ((correct)? 1: 0),
        score:user.correct /  (user.total+1)

    }
    console.log(updateData)
    await prisma.user.update({
        where: {
            loginCode: userToken["userId"],
        },
        data: updateData,
    })
    
   
    try
    {
        await prisma.test.delete(
            {
                where:
                {
                    codeId:testTokenJSON.codeId
                }
            })
        cookies().set(
            {
                name: "currentTest",
                value:"" ,
                path:"/",
                maxAge:0
            }
        )

        return NextResponse.json({"fail":false,correct:correct}); 
    }
    catch(e)
    {
        console.log(e)
        return NextResponse.json({"fail":true, msg: "something went wrong"}); 
    }
}