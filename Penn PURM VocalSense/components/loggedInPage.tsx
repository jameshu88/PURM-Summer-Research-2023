'use client'

import {useEffect, useState} from 'react'

import { useCookies } from 'react-cookie'

export default function LoggedInPage(props:any)
{
    const [audioPlayer,setAudioPlayer] = useState( new Audio())

    console.log(props)

    // const testCookie = new Cookies().get("currentTest")

    const [testing, setTesting] = useState((props.testIsSet) ? props.testData:false)

    const [loading, setLoading] = useState(false )

    const [audioFile, setAudioFile] = useState("");

    const [pitch1,setPitch1] = useState((props.testIsSet)? props.testData.left: 1)
    const [pitch2,setPitch2] = useState((props.testIsSet)? props.testData.right: 1)

    const [sing1, setSing1] = useState(false)
    const [sing2, setSing2] = useState(false)
    
    const [correct, setCorrect] = useState(0)
//1 correct 
//2 incorrect
    

    const [cookies, setCookie, removeCookie] = useCookies(['currentTest']);

    const [username, setUsername] = useState(props.data.username)

    // const playSong = () =>
    // {
    //     audioPlayer.playbackRate = 0.5; 
    //     audioPlayer.play();
    // }

    const [state, setState] = useState((props.testIsSet)?"deciding": "waiting");
    function playAudio(){
        return new Promise(res=>{
            audioPlayer.play()
            audioPlayer.onended = res
        })
      }
    

    const SendCorrect = async (guess:number) =>
    {
        setLoading(true)
        const request = await fetch('/api/guessTest',
        {
            method:"POST",
            body:JSON.stringify({
                guessId: guess
            })
        })
        const data = await request.json();
        setLoading(false)
        if(data.fail)
        {
            return; 
        }

        if(data.correct)
        {
            setCorrect(1)
        }
        else 
        {
            setCorrect(2)
        }
        setState("waiting")
        setTesting(false)
        
    }

    const LeftPitch = () =>
    {
        SendCorrect(1)
    }
    
    const RightPitch = () =>
    {
        SendCorrect(2)
    }

    const beginTest = async ()=>
    {

        if(testing) return;

        setLoading(true)
        const res = await fetch('/api/createNewTest',
        {
            method:"GET",
            headers:{
                'Content-Type': 'application/json',
            }
        })

        
        setLoading(false)
        const data = await res.json()

        if(data.fail) return; 

        
        
        setState("playing")


        const letterArr = ['a','b','c','d']

        const letterCode = letterArr[Math.floor(letterArr.length*Math.random())]

        setAudioFile(`/Mamama_s/a0_${letterCode}_06_0${data.right}.wav`);

        audioPlayer.src = `/Mamama_s/a0_${letterCode}_06_0${data.right}.wav`
        

        console.log(audioFile)
        
        playAudio()

        setSing1(true); 
        setTimeout(()=>
        {
            setSing1(false); 
            setSing2(true); 
            setTimeout(()=>
            {
                setSing2(false); 
                setState("deciding")   
            },500)
 
        },500)
        // setSing1(true); 
        // setPitch1(data.left);
        // audioPlayer.playbackRate = data.left;
        // await playAudio();
        // setSing1(false); 
        // setSing2(true); 
        // setPitch2(data.right);
        // audioPlayer.playbackRate = data.right;
        // await playAudio();

        //setSing2(false); 
            
    }

    const Play1 = async ()=>
    {
        setSing1(true); 
        audioPlayer.playbackRate = pitch1;
        await playAudio();
        setSing1(false); 
    }

    const Play = async () =>
    {
        playAudio()
 
        setSing1(true); 
        setTimeout(()=>
        {
            setSing1(false); 
            setSing2(true); 
            setTimeout(()=>
            {
                setSing2(false); 
                setState("deciding")   
            },500)
 
        },500)
    }

    const Play2 = async () =>
    {
        setSing2(true); 
        audioPlayer.playbackRate = pitch2;
        await playAudio();
        setSing2(false); 
    }

    const Logout = ()=>
    {
        setLoading(true)
        fetch('/api/logout',
        {
            method:"GET",
            headers:{
            'Content-Type': 'application/json',
        }}).then(data=>
            data.json()).then(data => window.location.href = "/")
        
        setLoading(false)
    }
    

    useEffect(()=>
    {
        if(cookies.currentTest)
        {
            setLoading(true)
            fetch('/api/getTest',
            {
                method:"GET",
                headers:{
                    'Content-Type': 'application/json',
                }}).then(data=>
                    data.json())
                .then(async(data) => {

                    if(!data.fail)
                    {
                        const letterArr = ['a','b','c','d']

                        const letterCode = letterArr[Math.floor(letterArr.length*Math.random())]
                        
                        setAudioFile(`/Mamama_s/a0_${letterCode}_06_0${data.right}.wav`);
                        audioPlayer.src = `/Mamama_s/a0_${letterCode}_06_0${data.right}.wav`
                        
                        audioPlayer.addEventListener('canplaythrough',()=>
                        {

                            setLoading(false)
                        }, false)

                    }

                })
                
        }
    },[])


    return (
        <main className="flex min-h-screen flex-col items-center p-12">

            <div className='w-full rounded-2xl bg-[#4692E8] p-4 text-white text-center'>

                <h3 className='font-bold text-[4vw]'>TuneSense Fun!</h3>
                <h3 className='font-bold text-[2vw]'>Welcome Back <span className='italic'>{username}</span></h3>
                <button onClick={Logout} className='underline'>Log Out</button>

            </div>
            <div className='mt-12 w-full rounded-2xl bg-[#4692E8] p-8 text-white text-center'>
                <h3 className='test-[1vw]'>{(loading) ? "Loading...":""}</h3>
                <h3 className='text-[2vw]'>
                    {(correct ==1 ) ? "Correct! Keep Going!": (correct ==2 ) ? "Incorrect! Try Again!" :""}
                </h3>
                
                <div className='grid grid-cols-2 w-full'>
                    <img className='w-2/5 relative left-1/2 translate-x-[-50%]' src={(sing1)?'mamama1sing.png' :'mamama1.png'}/>
                    <img className='w-2/5 relative left-1/2 translate-x-[-50%]'src={(sing2)?'mamama2sing.png' :'mamama2.png'}/>
                
                </div>

                {(state == "waiting")
                    ? 
                    <button onClick={beginTest} className='bg-[#42B0E6] hover:bg-[#40CBDF] transition duration-150 text-center text-[1vw] p-4 rounded-2xl ml-4'>
                        Start Test
                    </button> :
                    (state == "deciding")?
                    <div>

                        <div className=''>
                            <button onClick={Play} className='bg-[#42B0E6] hover:bg-[#40CBDF] w-1/4 transition duration-150 text-center text-[1vw] p-4 rounded-2xl ml-4'>
                                Play Sound Again
                            </button>
                            
                            
                        </div>

                <h3 className='text-[2vw]'>Which Audio Has The Greatest Pitch?</h3>
                        <div className='grid grid-cols-2 grid-rows-1 w-full mt-2 relative  '>
                            <button onClick={LeftPitch} className='bg-[#42B0E6] text-[2vw] hover:bg-[#40CBDF] transition duration-150 text-center text-[1vw] p-2 rounded-2xl ml-4'>
                                Left is Higher
                            </button>
                            
                            <button onClick={RightPitch} className='bg-[#42B0E6] text-[2vw] hover:bg-[#40CBDF] transition duration-150 text-center text-[1vw] p-2 rounded-2xl ml-4 '>
                                Right is Higher
                            </button>
                            
                        </div>
                    </div>
                    :
                    <>
                    </>}       

            </div>

        </main>
    )
}