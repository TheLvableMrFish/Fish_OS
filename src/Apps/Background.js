import React, { useEffect } from 'react'
import { useState } from 'react'

import background_css from './AppsCSS/background_css.css'

const Background =({})=>{

    const [background, setBackground] = useState('background1.jpg')
    const [selectedText, setSelectedText] = useState('Solid Color')
    const [savedDrawings, setSavedDrawnings] = useState([])

    useEffect(()=>{
        if(selectedText === 'Image'){
            const drawings = JSON.parse(localStorage.getItem('paintSaves')) || []
            setSavedDrawnings(drawings)
        }
    }, [selectedText])

    const handleBackgroundColorChange=(color)=>{
        setBackground(color)
        document.documentElement.style.setProperty('--bg-img', `none`)
        document.documentElement.style.setProperty('--main-bg-color', `${color}`)
    }

    const handleBackgroundImgChange=(img)=>{
        setBackground(img)
        document.documentElement.style.setProperty('--main-bg-color', `none`)
        document.documentElement.style.setProperty('--bg-img', `url("./backgrounds/${img}.jpg")`)
        document.documentElement.style.setProperty('--bg-img', `url("../../backgrounds/${img}.jpg")`)
        console.log(document.documentElement.style.getPropertyValue('--gb-img'))
    }

    const handleBackgroundDrawnImgChange=(imgDataURL)=>{
        setBackground(imgDataURL)
        document.documentElement.style.setProperty('--main-bg-color', `none`)
        document.documentElement.style.setProperty('--bg-img', `url(${imgDataURL})`)
    }

    const handleTextChange=(text)=>{
        setSelectedText(text)
    }

    let colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'black', 'brown', 'white', 'pink', 'gray', 'violet']
        // colors = ['#1da2d8', '#FF3C38', '#1d2461', '#5e75ab', '#A23E48', 'purple', 'black', 'brown', '#76b6c4', '#6C8EAD', 'gray', '#0278ae']
    let backgroundImgs = [ 
        'background10', 'background2', 'background3', 
        'background4', 'background5', 'background6', 
        'background9', 'background8'
    ]

    return(
        <>
            <div className='background-box container-fluid'>
                <div className='row'>
                    <div className='background-header col-12'>Background</div>
                    <div className='background-current background-current-color background-current-img col-12'></div>
                    <div className='background-dropdown-title col-12'>Background</div>

                    <div className='background-dropdown dropdown col-4'>
                        <div className='background-custom-dropdown' data-bs-toggle='dropdown' aria-expanded='false'>{selectedText}</div>
                        <ul className='dropdown-menu' aria-labelledby='dropdownMenu'>
                            <li>
                                <a className='dropdown-item' href='#' onClick={()=>handleTextChange('Solid Color')}>Solid Color</a>
                                <a className='dropdown-item' href='#' onClick={()=>handleTextChange('Picture')}>Picture</a>
                                <a className='dropdown-item' href='#' onClick={()=>handleTextChange('Image')}>Image</a>
                            </li>
                        </ul>
                    </div>

                    <div className='col-8'></div>
                    {selectedText === 'Solid Color' ? <div className='background-color-container container col-8'>
                        <div className='row'>
                            {colors.map((color)=>(
                                <div 
                                    className={`col-2 background-background-color`} 
                                    style={{background: `${color}`}}
                                    onClick={()=>handleBackgroundColorChange(color)}
                                ></div>
                            ))}
                        </div>
                    </div> : ''}

                    {selectedText === 'Picture' ? <div className='background-picture-container container col-12'>
                        <div className='row'>
                            {backgroundImgs.map((img)=>(
                                <img 
                                    key={img}
                                    className={`col-3 background-background-img`} 
                                    src={`./backgrounds_low_quality/${img}.jpg`}
                                    onClick={()=>handleBackgroundImgChange(img)}
                                    loading='lazy'
                                />
                            ))}
                        </div>
                    </div> : ''}

                    {selectedText === 'Image' ? <div className='background-img-container container col-12'>
                        <div className='row'>
                            {savedDrawings.length > 0 ? savedDrawings.map((drawing, index)=>(
                                <img 
                                    key={index}
                                    className={`col-3 background-background-img`} 
                                    src={drawing.dataURL}
                                    onClick={()=>handleBackgroundDrawnImgChange(drawing.dataURL)}
                                    loading='lazy'
                                />
                            )) : ''}
                        </div>
                    </div> : ''}
                    

                </div>
            </div>
        </>
    )
}

export default Background