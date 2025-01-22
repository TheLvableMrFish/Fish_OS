import React from 'react'

const Widget =({img})=>{
    return(
        <>
        <div className='widget-border'>
            <img className='widget fluid-img' alt='img' src={`./media/${img}.png`} />
        </div>
        </>
    )
}

export default Widget