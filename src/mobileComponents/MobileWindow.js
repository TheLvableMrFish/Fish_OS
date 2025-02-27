import React, { useRef, useState, useEffect } from 'react'

const MobileWindow =({mobile_windows_prop, closeWindow, minWindow})=>{

    const [mobileWindows, setMobileWindow] = useState([mobile_windows_prop])

    useEffect(()=>{
        setMobileWindow(mobile_windows_prop)
    }, [mobile_windows_prop])

    useEffect(()=>{
        console.log(mobileWindows)
    }, [mobileWindows])


    return(
        <>
            {mobileWindows.length > 0 ? (
                mobileWindows.map((simple, i)=>(
                    <div key={i} className=''>{simple.title}</div>
                )) 
            ) : ( '')}
        </>
    )
}

export default MobileWindow