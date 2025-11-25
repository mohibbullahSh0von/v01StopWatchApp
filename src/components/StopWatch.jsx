import {useRef, useState} from 'react'

function StopWatch() {

    const [milisec, setMiliSec] = useState("00");
    const [sec, setSec] = useState("00");
    const [minute, setMinute] = useState("00");
    const [hour, setHour] = useState("00");

    const intervalId = useRef(null);
    const elapsedTime = useRef(0);

    function updateTime(time){
        setMiliSec(String(Math.floor((time % 1000) / 10)).padStart(2,"0"));
        setSec(String(Math.floor((time / 1000) % 60)).padStart(2,"0"));
        setMinute(String(Math.floor((time / (1000 * 60)) % 60)).padStart(2,"0"));
        setHour(String(Math.floor((time / (1000 * 60 * 60)))).padStart(2,"0"));
    }

    function handleStopBtnClick(){
        clearInterval(intervalId.current);
        intervalId.current = null;        
    }

    function handleStartBtnClick(){
        if(intervalId.current) return
        const startTime = Date.now() - elapsedTime.current;
        intervalId.current = setInterval(() => {
                elapsedTime.current = Date.now() - startTime;
                updateTime(elapsedTime.current);
        }, 50);
    }

    function handleResetBtnClick(){
        clearInterval(intervalId.current);
        intervalId.current = null;
        elapsedTime.current = 0;
        updateTime(0);
    }

    return (
        <div className='stopWatch-container font-mono max-w-lg flex flex-col justify-center items-center p-4 mt-8 rounded-xl shadow-2xl gap-2 bg-white'>
            <h1 className='title uppercase'>Stop Watch</h1>
            <p className='stopWatch-display text-4xl bg-amber-200 px-4 py-2 rounded-xl text-gray-800'>{hour}:{minute}:{sec}:{milisec}</p>
            <div className="btn-wrapper flex flex-row justify-center items-center gap-2">
                
                <button className=' bg-red-500 uppercase text-white px-4 py-2 rounded-lg cursor-pointer transform active:scale-90 hover:bg-red-600 transition-all duration-200 shadow-2xl' 
                onClick={handleStopBtnClick}>
                    Stop</button>

                <button className=' bg-orange-500 uppercase text-white px-4 py-2 rounded-lg cursor-pointer transform active:scale-90 hover:bg-orange-600 transition-all duration-200 shadow-2xl' 
                onClick={handleResetBtnClick}>
                    Reset</button>
                                
                <button className=' bg-green-500 uppercase text-white px-4 py-2 rounded-lg cursor-pointer transform active:scale-90 hover:bg-green-600 transition-all duration-200 shadow-2xl' 
                onClick={handleStartBtnClick}>
                    Start</button>
            </div>
        </div>
    )
}

export default StopWatch
