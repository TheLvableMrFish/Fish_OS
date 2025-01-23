import React from 'react'
import { useState, useEffect } from 'react'

import Widget from './Widget'
import DateTime from './DateTime'

const Footer =({windows_prop, reOpenWindow})=>{

    const [windows, setWindows] = useState(windows_prop)

    useEffect(()=>{
        setWindows(windows_prop)
    }, [windows_prop])


    return(
        <>
        <footer className='footer row'>
                <div className='start col-1'><img className='img-fluid logo' src='./media/fish.png'/></div>
                <div className="search-bar form-outline col-2" data-mdb-input-init>
                    <img className='search-icon' src='./media/search_icon.png'/>
                    <input type="search" id="form1" className="form-control" placeholder="Type here to search" aria-label="Search" />
                </div>
                <div className='widgets col folder'>

                    {windows.map((win)=>(
                        <Widget 
                            key={win.id}
                            img={win.img}
                            reOpenWindow={()=> reOpenWindow(win.id)}
                        />
                    ))}

                    <DateTime />
                </div>
        </footer>
        </>
    )
}

export default Footer