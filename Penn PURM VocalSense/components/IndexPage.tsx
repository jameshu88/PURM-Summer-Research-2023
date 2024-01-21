'use client'

import { useState } from "react";



export default function IndexPage()
{

    const [loginUser, setLoginUser ] = useState("")
    const [serverResponse, setServerResponse ] = useState("")
    const [loading, setLoading] = useState(false)
    async function LoginUser()
    {
        setLoading(true)
        const response = await fetch("/api/loginUser", {
            method:"POST",
            headers:
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
            {
                userId: loginUser
            })
        }) 
        setLoading(false)
        const data = await response.json(); 
        if(!data.fail)
        {
            window.location.reload();
        }
        else 
        {
            setServerResponse("userId is incorrect");
            
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-16">
            <div className='w-full rounded-2xl bg-[#4692E8] p-16 text-white text-center'>

                <h3 className='font-bold text-[6vw]'>TuneSense Fun!</h3>
                <h3 className='test-[1vw]'>{(loading) ? "Loading...":""}</h3>

            </div>
            <div className='w-3/4 min-h-1/4 rounded-3xl bg-[#4692E8] p-8 text-white flex flex-col text-center items-center justify-between'>
                
                <h3 className='text-[2vw]'>Enter UserId</h3>
                <div className='w-3/4'>
                <input value={loginUser} onChange={e => { setLoginUser(e.currentTarget.value);}} className='w-4/5 rounded-lg h-12 text-black text-center mt-4'></input>
                <button onClick={LoginUser} className='bg-[#42B0E6] hover:bg-[#40CBDF] transition duration-150 text-center text-[1vw] p-4 rounded-2xl ml-4'>Play!</button>
                <h3>
                    {serverResponse}
                </h3>
                </div>
            </div>

            <div className='text-white' >
                <h3>Dont have an account? <a href='./register'  className='underline'>
                create one here
                </a>.</h3>
                
            </div>

        

        </main>
    )
}