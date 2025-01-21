import React from 'react'
import { useState, useEffect } from 'react'
import Widget from './Widget'

const Application =({name, img, col, row})=>{

    // Row and column start at 0
    col = col * 75
    row = row * 73.5

    return(
        <> 
            <div 
                className='application'
                style={{
                    position: 'absolute',
                    top: row,
                    left: col
                }}
            >
                <div 
                    className='application-box'
                >
                    <Widget className='application-app' img={`${img}`} />
                    <div className='application-name-box'>
                        <div className='application-name'>{name}</div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Application