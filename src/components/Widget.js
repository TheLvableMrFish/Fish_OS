import React from 'react'

const Widget =({img})=>{
    return(
        <>
        <div className='widget-border'>
            <img className='widget fluid-img' src={`./media/${img}`} />
        </div>
        </>
    )
}

export default Widget