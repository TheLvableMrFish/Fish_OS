import React from 'react'
import { useState } from 'react'

import Footer from '../components/Footer'
import DesktopGrid from '../components/DesktopGrid'
import Application from '../components/Application'
import Window from '../components/Window'

// App
// import Paint from '../Apps/Paint'
import Folder from '../Apps/Folder'
import Notes from '../Apps/Notes'

// Data
import { application_data } from '../Data/applications_data'

const Desktop =()=>{

    const [applicationsOpen, setApplicationsOpen] = useState([
        // {   
        //     id: 2, 
        //     title: 'Folder', 
        //     x: 500, y: 100, 
        //     zIndex: 1, 
        //     content: <Folder />, 
        //     img: 'clam_color', 
        //     width: 550, height: 350, 
        // }

        // {
        //     id: 8,
        //     title: 'Notes',
        //     x: 500, y: 100,
        //     zIndex: 1,
        //     content: <Notes />,
        //     img: 'manta_ray',
        //     width: 400,
        //     height: 500,
        //     key: 1
        // }
    ])


    const handleApplication=(appId, title, img, content, width, height)=>{
        reOpenWindow(appId)

        setApplicationsOpen((prevApps) =>{
            let isAppOpen = prevApps.some((app) => app.id === appId)
            if(isAppOpen){
                return prevApps
            } else {

                return [
                    ...prevApps,
                    {
                        id: appId, 
                        title: title, 
                        x: 100, y: 100, 
                        zIndex: 1, 
                        content: content || "content 1", 
                        img: img, 
                        width: width || '300px', 
                        height: height || '300px', 
                        windowState: 'open',
                    },
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

    const minWindow = (id)=>{
        setApplicationsOpen((prevApps)=>
            prevApps.map((win) =>
                win.id === id ? {...win, windowState: 'minimized'} : win
        ))
    }

    const reOpenWindow = (id)=>{
        setApplicationsOpen((prevApps)=>
            prevApps.map((win) =>
                win.id === id ? {...win, windowState: 'open'} : win
        ))
    }

    return(
        <>
        <main className='container-fluid desktop'>
            <div className='row'>
            
                <Window 
                    windows_prop={applicationsOpen} 
                    updateWindowPosition={updateWindowPosition}
                    closeWindow={closeWindow}
                    minWindow={minWindow}
                />

                {application_data.map((app)=>(
                    <div onClick={()=> handleApplication(
                        app.id, 
                        app.title, 
                        app.img, 
                        app.app ? app.app : null,
                        app.width ? app.width: null,
                        app.height ? app.height: null,
                        )}
                        key={app.id}
                        >

                        <Application 
                            name={app.title}
                            img={app.img}
                            row={app.row}
                            col={app.col}
                        />
                    </div>
                ))}

                {/* <DesktopGrid /> */}
            </div>
            <Footer  
                windows_prop={applicationsOpen} 
                reOpenWindow={reOpenWindow}
            />
        </main>
        </>
    )
}

export default Desktop