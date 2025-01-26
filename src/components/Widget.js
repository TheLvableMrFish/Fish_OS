import React from 'react'

const Widget =({ img, reOpenWindow})=>{
    return(
        <>
        <div className='widget-border'
            onClick={reOpenWindow}
        >
            <img className='widget fluid-img' alt='img' src={`./media/${img}.png`} />
        </div>
        </>
    )
}

export default Widget