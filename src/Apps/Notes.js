import React from 'react'
import { useState } from 'react'

import notes_css from './AppsCSS/notes_css.css'

const Notes =({})=>{

    const [title, setTitle] = useState('Title')
    const [editTitle, setEditTitle] = useState(false)

    const handleStartEdit=()=>{
        setEditTitle(true)
    }

    const handleEdit=()=>{
        setEditTitle(false)
    }

    return(
        <>
            <div className='notes-box container-fluid'>

                    {!editTitle && <label 
                        className='notes-text-label col' 
                        onClick={()=>{handleStartEdit()}}
                    >{title}</label>}
                    
                    {editTitle &&
                        <div className='notes-text-edit-container row'>
                            <input 
                                className='notes-text-label-edit col' 
                                value={title}
                                onChange={(e)=> setTitle(e.target.value)}
                            ></input>
                            <div className='notes-text-label-edit-btn col'
                                onClick={()=>{handleEdit()}}
                            >Change</div>
                        </div>
                    }

                <input className='notes-text-box' type='textarea' id='note' name='note'/>
            </div>
        </>
    )
}

export default Notes