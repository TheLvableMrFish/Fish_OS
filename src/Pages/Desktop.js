import React from 'react'

import Footer from '../components/Footer'
import DesktopGrid from '../components/DesktopGrid'
import Application from '../components/Application'

const Desktop =()=>{
    return(
        <>
        <main className='container-fluid desktop'>
            <div className='row'>
                <Application 
                    name='My Computer'
                    img='my_computer'
                    row={0}
                    col={0}
                />
                <Application 
                    name='Folder'
                    img='clam_color'
                    row={2}
                    col={0}
                />

                <Application 
                    name='Folder'
                    img='clown_color'
                    row={1}
                    col={1}
                />

                <Application 
                    name='Recycle'
                    img='recycle_color'
                    row={1}
                    col={0}
                />
                {/* <DesktopGrid /> */}
            </div>
            <Footer />
        </main>
        </>
    )
}

export default Desktop