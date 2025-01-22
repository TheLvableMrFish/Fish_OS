import React from 'react'
import { useState } from 'react'

import Footer from '../components/Footer'
import DesktopGrid from '../components/DesktopGrid'
import Application from '../components/Application'
import Window from '../components/Window'

// Apps
import Calculator from '../Apps/Calculator'
import Background from '../Apps/Background'

const Desktop =()=>{

    const [applicationsOpen, setApplicationsOpen] = useState([
        // 5, 'Background', 'star_fish', <Background />, 500, 400
        // {id: 6, title: 'Background', x: 500, y: 100, zIndex: 1, content: <Background />, img: 'star_fish', width: 500, height: 400}
    ])

    const handleApplication=(appId, title, img, content, width, height)=>{

        setApplicationsOpen((prevApps) =>{
            let isAppOpen = prevApps.some((app) => app.id === appId)
            if(isAppOpen){
                console.log('Desktop part 2 a')
                console.log(applicationsOpen)
                return prevApps
                // return prevApps.filter((app)=> app.id !== appId)
            } else {

                return [
                    ...prevApps,
                    {id: appId, title: title, x: 100, y: 100, zIndex: 1, content: content || "content 1", img: img, width: width || '300px', height: height || '300px'}
                ]
            }

        })

    }

    // Function to update the window position in Desktop.js from Window.js
    const updateWindowPosition=(id, newX, newY)=>{
        setApplicationsOpen((prevApps)=>
            prevApps.map((win) =>
                win.id === id ? {...win, x: newX, y: newY} : win
            )
        )
    }

    // Function to close a window
    const closeWindow = (id)=>{
        setApplicationsOpen((prevApps)=>
            prevApps.filter((win) => win.id !==id)
        )
    }

    return(
        <>
        <main className='container-fluid desktop'>
            <div className='row'>
            
                <Window 
                    windows_prop={applicationsOpen} 
                    updateWindowPosition={updateWindowPosition}
                    closeWindow={closeWindow}
                />

                <div onClick={()=> handleApplication(1, 'My Computer', 'my_computer')}>
                    <Application 
                        name='My Computer'
                        img='my_computer'
                        row={0}
                        col={0}
                    />
                </div>

                <div onClick={()=> handleApplication(2, 'Folder', 'clam_color')}>
                    <Application 
                        name='Folder'
                        img='clam_color'
                        row={2}
                        col={0}
                    />
                </div>
                
                <div onClick={()=> handleApplication(3, 'Fish', 'clown_color')}>
                    <Application 
                        name='Fish'
                        img='clown_color'
                        row={1}
                        col={1}
                    />
                </div>

                <div onClick={()=> handleApplication(4, 'Recycle', 'recycle_color')}>
                    <Application 
                        name='Recycle'
                        img='recycle_color'
                        row={1}
                        col={0}
                    />
                </div>

                <div onClick={()=> handleApplication(5, 'Calculator', 'crab_color', <Calculator />, 200, 265)}>
                    <Application 
                        name='Calculator'
                        img='crab_color'
                        row={1}
                        col={2}
                    />
                </div>

                <div onClick={()=> handleApplication(6, 'Background', 'star_fish', <Background />, 500, 400)}>
                    <Application 
                        name='Background'
                        img='star_fish'
                        row={0}
                        col={1}
                    />
                </div>
                {/* <DesktopGrid /> */}
            </div>
            <Footer  
                windows_prop={applicationsOpen} 
            />
        </main>
        </>
    )
}

export default Desktop