import React, { useEffect } from 'react'
import { useState } from 'react'

import mobile_notes_css from './MobileAppsCSS/mobile_notes_css.css'

const MobileNotes =({})=>{

    const [title, setTitle] = useState('Title')
    const [editTitle, setEditTitle] = useState(false)
    const [openMobileNotes, setOpenMobileNotes] = useState(false)
    const [note, setNote] = useState('')
    const [MobileNotes, setMobileNotes] = useState('')

    useEffect(()=>{console.log(localStorage.getItem('notes'))})

    const handleStartEdit=()=>{
        setEditTitle(true)
    }

    const handleEdit=()=>{
        setEditTitle(false)
        // localStorage.clear();
        // sessionStorage.clear()
        // localStorage.removeItem('MobileNotes')
    }

    const handleSave=()=>{
        const existingMobileNotes = JSON.parse(localStorage.getItem('notes')) || []

        const noteIndex = existingMobileNotes.findIndex((n)=> n.title === title)

        if (noteIndex !== -1){
            existingMobileNotes[noteIndex].note = note
        } else {
            existingMobileNotes.push({title, note})
        }

        localStorage.setItem('notes', JSON.stringify(existingMobileNotes))
        console.log(JSON.parse(localStorage.getItem('notes')))
    }

    const handleNewNote=()=>{
        setTitle('Title')
        setMobileNotes('')
    }

    const handleOpen =()=>{
        setOpenMobileNotes(true)
        const existingMobileNotes = JSON.parse(localStorage.getItem('notes')) || []
        setMobileNotes(existingMobileNotes)
    }

    const handleOpenNote =(title, note)=>{
        setTitle(title)
        setNote(note)
        setOpenMobileNotes(false)
    }

    return(
        <>
            <div className='mobile-notes-box container-fluid'>
                <div className='mobile-notes-header'>Notes:</div>

                    {!editTitle && 
                        <div className='mobile-notes-text-edit-container row'>
                            <label 
                                className='mobile-notes-text-label col' 
                                onClick={()=>{handleStartEdit()}}
                            >{title}</label>
                            <div className='mobile-notes-text-btn mobile-notes-text-mr-btn col'
                                onClick={()=>{handleOpen()}}
                            >Open</div>
                            <div className='mobile-notes-text-btn mobile-notes-text-mr-btn col'
                                onClick={()=>{handleSave()}}
                            >Save</div>

                            <div className='mobile-notes-text-btn  col'
                                onClick={()=>{handleNewNote()}}
                            >New</div>
                        </div>
                    }
                    
                    {editTitle &&
                        <div className='mobile-notes-text-edit-container row'>
                            <input 
                                className='mobile-notes-text-label-edit col' 
                                value={title}
                                onChange={(e)=> setTitle(e.target.value)}
                                maxLength={22}
                            ></input>
                            <div className='mobile-notes-text-label-edit-btn col'
                                onClick={()=>{handleEdit()}}
                            >Change</div>

                            
                        </div>
                    }

                <textarea 
                    className='mobile-notes-text-box' 
                    type='textarea' 
                    id='note' 
                    name='note'
                    value={note}
                    onChange={(e)=> setNote(e.target.value)}
                />
                        
                {openMobileNotes && <div className='mobile-notes-open-list container-fluid'>
                    {/* <div className='window-header mobile-notes-open-header container-fluid'> */}
                        {/* <img className='window-logo' src='./media/clam_color.png' /> */}
                        {/* <div className='window-title'>Documents</div> */}
                        <div className='window-widgets-container'>
                            {/* <div 
                                className='window-close-btn window-widget'
                            ><img 
                                className='window-widget-img' 
                                onClick={()=>{setOpenMobileNotes(false)}}
                                src='./media/close2.png'
                            /></div> */}
                        </div>
                    {/* </div> */}
                    <div className='mobile-notes-scrollable-container'>
                    <div className='row'>
                        {MobileNotes.length > 0 ? MobileNotes.map((note, index)=>(
                            <React.Fragment key={index}>
                                <div 
                                    className={`mobile-notes-open-item
                                        ${index === MobileNotes.length - 1 ?
                                        'mobile-notes-open-item-border-radius-edit' :
                                        ''} col-3`}
                                    onClick={()=>handleOpenNote(note.title, note.note)}
                                >{note.title}</div>
                                <div 
                                    className='mobile-notes-open-item-text col-8'>{note.note}</div>
                            </React.Fragment>
                        )) : <div className='mobile-notes-open-empty'>
                            No MobileNotes yet.
                            Try writing something and then 
                            <br />
                            press the save button! 
                        </div>}

                    </div>
                    </div>
                </div>}


            </div>
        </>
    )
}

export default MobileNotes