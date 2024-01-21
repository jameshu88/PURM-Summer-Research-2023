
'use client'

import { useState } from "react"
import { redirect } from 'next/navigation';
export default function ReigsterPage()
{

    const register = async ()=>
    {
        setLoading(true)
        const response = await fetch("/api/registerUser", {
            method:"POST",
            headers:
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
            {
                name:username,
                userId: userId
            })
        })

        setLoading(false)
        const data = await response.json(); 
        console.log(data)
        if(data.fail)
        {
            setServerResponse(data.msg)
        }
        else 
        {
            window.location.href = "/"
        }
    } 

    const [username, setUserName] = useState("");

    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(false)


    const [serverResponse, setServerResponse ] = useState("")
    return (<main className="flex min-h-screen flex-col items-center justify-between p-16">

        <div className='w-full rounded-2xl bg-[#4692E8] p-16 text-white text-center'>

            <h3 className='font-bold text-[6vw]'>Register</h3>

            <h3 className='test-[1vw]'>{(loading) ? "Loading...":""}</h3>

            <h2 className="text-[3vw] mt-2">Create a Username and UserId for Your Account!</h2>

            <input className=" mt-5 text-black text-center rounded-md w-1/2 h-10" value={username}
            onChange={e => { setUserName(e.currentTarget.value); }} placeholder={"Username"}/>
                <p></p>
            <input  className=" mt-5 text-black text-center rounded-md w-1/2 h-10" value={userId}
            onChange={e => { setUserId(e.currentTarget.value); }} placeholder={"UserId"}/>
                


            <h2 className="text-[2vw] mt-5">You will use the UserId to login and it will need to be unique. </h2>
            
            <button className="bg-[#42B0E6] transition duration-150 hover:bg-[#40CBDF] mt-6 rounded-md text-[1.5vw] p-4" onClick={register} >Sign Up!</button>
            <h3>
                {serverResponse}
            </h3>
            

            <a href="/" className="absolute top-5 left-5 underline">Return Home</a>

        </div>

    </main>)
}