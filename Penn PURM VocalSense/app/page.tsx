import Image from 'next/image'
import Link from 'next/link'

import IndexPage from '@/components/IndexPage';
 
import LoggedInPage from '@/components/loggedInPage'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

import * as jsonwebtoken from "jsonwebtoken";
import {PrismaClient, Prisma} from "@prisma/client"
  
import { cookies } from 'next/headers'

const prisma = new PrismaClient();


async function getData() {

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  // Recommendation: handle errors
  
  const cookieStore = cookies()
  const tokenid = cookieStore.get("username")?.value;
  let authenticated = false; 
  let userData :any = "null"
  if(!tokenid) 
  {
    authenticated = false;
  }
  else 
  {
    try
    {
      userData = await jsonwebtoken.verify(tokenid, process.env.TOKEN_SECRET!) as string;
      authenticated = true;
    }
    catch
    {
      authenticated = false;
    }
    
  }


  let currentTest = cookieStore.get("currentTest")?.value

  let testExist = false; 

  if(currentTest)
  {
    testExist = true; 
    currentTest =  JSON.parse(currentTest)
  }

  return {
    authenticated:authenticated,
    username: userData,
    testExist:testExist,
    testData: currentTest,
  }
}


export default async function Home() {

  const data = await getData();

  console.log(data)
 
  
  if(data.authenticated )
  {
    return (
      <LoggedInPage data= {data.username} testIsSet={data.testExist} testData = {data.testData}/>
    )
  }
  else 
  {
    
    return (
        <IndexPage />
      
      )
    }

}
