import React from 'react'

import Widget from './Widget'

const Footer =()=>{



    return(
        <>
        <footer className='footer row'>
                <div className='start col-1'><img className='img-fluid logo' src='./media/fish.png'/></div>
                <div class="search-bar form-outline col-2" data-mdb-input-init>
                    <input type="search" id="form1" class="form-control" placeholder="Type here to search" aria-label="Search" />
                </div>
                <div className='widgets col folder'>

                    <Widget img='clam_color.png' />
                    <Widget img='clown_color.png' />
                    <Widget img='sea_hourse_color.png' />
                    <Widget img='crawfish_color.png' />
                    <Widget img='whale_color.png' />
                    
                </div>
        </footer>
        </>
    )
}

export default Footer