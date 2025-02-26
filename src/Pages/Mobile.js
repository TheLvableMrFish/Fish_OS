import React from 'react'
import { useState } from 'react'

import Application from '../components/Application'

import { application_data } from '../Data/applications_data_mobile'


const Mobile =()=>{
    const [applicationsOpen, setApplicationsOpen] = useState([
           
        ])

    const handleApplication=(appId, title, img, content, width, height)=>{
        // reOpenWindow(appId)

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

    return(
        <>
        <div className='container-fluid'>
            <div className='mobile-header header row'>
                <div className='mobile-header-item col'>6:40</div>
                <div className='mobile-header-item col-auto'>
                    <img className='mobile-icon' src='./mobileMedia/wifi.png' />
                    <img className='mobile-icon' src='./mobileMedia/5G.png' />
                    <img className='mobile-icon' src='./mobileMedia/battery-mid.png' />
                </div>
            </div>

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
                            row={(app.row + 0.7) * 0.88}
                            col={(app.col - 0.15) * 0.88}
                        />
                    </div>
                ))}

            <div className='mobile-grid row'>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
            </div>
            <div className='mobile-grid row'>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
            </div>
            <div className='mobile-grid row'>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
            </div>
            <div className='mobile-grid row'>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
            </div>
            <div className='mobile-grid row'>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
            </div>
            <div className='mobile-grid row'>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
            </div>
            <div className='mobile-grid row'>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
                <div className='mobile-grid-space col-2'>x</div>
            </div>

            <div className='mobile-footer footer row'>
                <div className='col'>{'| | |'}</div>
                <div className='col'>{'Home'}</div>
                <div className='col'>{'<'}</div>
            </div>
        </div>
        </>
    )
}

export default Mobile