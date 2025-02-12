import React from 'react'
import { useState, useEffect } from 'react'

import Footer from '../components/Footer'
import DesktopGrid from '../components/DesktopGrid'
import Application from '../components/Application'
import Window from '../components/Window'

// App
// import Paint from '../Apps/Paint'
import Folder from '../Apps/Folder'
import Notes from '../Apps/Notes'
import Recycle from '../Apps/Recycle'

// Data
import { application_data } from '../Data/applications_data'
import Paint from '../Apps/Paint'
import AboutMe from "../Apps/AboutMe"
import Background from '../Apps/Background'

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

        // {
        //     id: 4,
        //     title: 'Recycle',
        //     x: 500, y: 100,
        //     zIndex: 1,
        //     content: <Recycle />,
        //     img: 'recycle_color',
        //     width: 400,
        //     height: 300,
        //     key: 1
        // }

        // {
        //     id: 7,
        //     title: 'Paint',
        //     x: 500, y: 100,
        //     zIndex: 1,
        //     img: 'squid_color',
        //     content: <Paint />,
        //     width: 650,
        //     height: 440,
        //     key: 1
        // }
        // {
        //     id: 3,
        //     title: 'About Me',
        //     x: 500, y: 100,
        //     zIndex: 1,
        //     img: 'clown_color',
        //     content: <AboutMe />,
        //     width: 520,
        //     height: 400,
        //     key: 3
        // }
        // {
        //     id: 6,
        //     title: 'Background',
        //     x: 500, y: 100,
        //     zIndex: 1,
        //     img: 'star_fish',
        //     content: <Background />,
        //     width: 500,
        //     height: 400,
        //     key: 6
        // }
    ])

    useEffect(()=>{
        let background = JSON.parse(localStorage.getItem('background')) || ['img', 'background10']
        console.log(background)
        if(background[0] === 'img'){
            document.documentElement.style.setProperty('--main-bg-color', `none`)
            document.documentElement.style.setProperty('--bg-img', `url("./backgrounds/${background[1]}.jpg")`)
            document.documentElement.style.setProperty('--bg-img', `url("../../backgrounds/${background[1]}.jpg")`)
        } else if(background[0] === 'color'){
            document.documentElement.style.setProperty('--bg-img', `none`)
            document.documentElement.style.setProperty('--main-bg-color', `${background[1]}`)
        } else if(background[0] === 'drawing'){
            document.documentElement.style.setProperty('--main-bg-color', `none`)
            document.documentElement.style.setProperty('--bg-img', `url(${background[1]})`)
        }

    })


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