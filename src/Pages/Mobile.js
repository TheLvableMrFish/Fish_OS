import React from 'react'
import { useState } from 'react'

import Application from '../components/Application'
import MobileGrid from '../mobileComponents/MobileGrid'
import MobileWindow from '../mobileComponents/MobileWindow'
import MobileCalculator from '../MobileApps/MobileCalculator'
import MobileNotes from '../MobileApps/MobileNotes'

import { application_data } from '../Data/applications_data_mobile'


const Mobile =()=>{
    const [applicationsOpen, setApplicationsOpen] = useState([
           
        ])

    const handleApplication=(appId, title, img, content)=>{
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
                        zIndex: 1, 
                        content: content || "content 1", 
                        img: img, 
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
            {/* <MobileCalculator /> */}
            {/* <MobileNotes /> */}
            {/* <MobileWindow 
                    mobile_windows_prop={applicationsOpen} 
                    // closeWindow={closeWindow}
                    // minWindow={minWindow}
            /> */}

            {/* {application_data.map((app)=>(
                    <div onClick={()=> handleApplication(
                        app.id, 
                        app.title, 
                        app.img, 
                        app.app ? app.app : null,
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
                ))} */}

            {/* <MobileGrid /> */}

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