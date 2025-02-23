import React from 'react'

const Mobile =()=>{

    return(
        <>
        <div className='container-fluid'>
            <div className='header row'>
                <div className='col'>6:40</div>
                <div className='col'>icon</div>
                <div className='col'>Wifi</div>
                <div className='col'>Signal</div>
                <div className='col'>Battery</div>
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