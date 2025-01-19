import React from 'react'
import { useState, useEffect, useRef } from 'react'

import Calander from './Calander'

const DateTime =()=>{

    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString().replace(/:\d{2} /, ' '))
    const [currentFullTime, setCurrentFullTime] = useState(new Date().toLocaleTimeString())
    const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString())
    const [currentFullDate, setCurrentFullDate] = useState(
        new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric' 
    }))

    const [timeDisplay, setTimeDisplay] = useState(false)

    const DateTimeRef = useRef(null)

    // update time every 1000 ms
    useEffect(()=>{
        const updateTime =()=>{
            const date = new Date()
            setCurrentTime(date.toLocaleTimeString().replace(/:\d{2} /, ' '))
            setCurrentFullTime(date.toLocaleTimeString())
            setCurrentDate(date.toLocaleDateString())
        }

        const intervalId = setInterval(updateTime, 1000)

        // update timeDisplay when clicked outside it
        const handleClickOutsideTimeDisplay=(e)=>{
            if(DateTimeRef.current && !DateTimeRef.current.contains(e.target)){
                setTimeDisplay(false)
            }
        }
    
        document.addEventListener('click', handleClickOutsideTimeDisplay)

        return ()=> {
            clearInterval(intervalId)
            // cleans up event listener
            document.removeEventListener('click', handleClickOutsideTimeDisplay)
        }

    }, [])

    const handleTimeDisplay =()=>{
        setTimeDisplay(true)
    }

    return(
        <>
        <div className='date-time' ref={DateTimeRef} onClick={handleTimeDisplay}>
            <div className='time row'>
                <div>{currentTime}</div>
            </div>
            <div className='date row'>
                <div>{currentDate}</div>
            </div>

            <div className={`date-time-info ${!timeDisplay ? 'hidden' : ''}`}>
                <div className='time-info'>
                    <div className='current-time'>
                        {currentFullTime}
                    </div>
                    <div className='current-date'>
                        {currentFullDate}
                    </div>
                    <div className='date-time-info-line-top'></div>

                    <Calander />
                    
                    <div className='date-time-info-line-bottom'></div>

                </div>
            </div>
        </div>  
        </>
    )
}

export default DateTime