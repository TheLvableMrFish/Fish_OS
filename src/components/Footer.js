import React from 'react'

import Widget from './Widget'
import DateTime from './DateTime'

const Footer =()=>{

    return(
        <>
        <footer className='footer row'>
                <div className='start col-1'><img className='img-fluid logo' src='./media/fish.png'/></div>
                <div className="search-bar form-outline col-2" data-mdb-input-init>
                    <img className='search-icon' src='./media/search_icon.png'/>
                    <input type="search" id="form1" className="form-control" placeholder="Type here to search" aria-label="Search" />
                </div>
                <div className='widgets col folder'>

                    {/* Temp, will add a loop to create these on the fly */}
                    <Widget img='clam_color.png' />
                    <Widget img='clown_color.png' />
                    <Widget img='sea_hourse_color.png' />
                    <Widget img='crawfish_color.png' />
                    <Widget img='whale_color.png' />

                    <DateTime />
                </div>
        </footer>
        </>
    )
}

export default Footer