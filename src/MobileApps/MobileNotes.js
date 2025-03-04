import React from 'react'
import { useState } from 'react'

import mobile_notes_css from './MobileAppsCSS/mobile_notes_css.css'

const MobileNotes =({})=>{

    const [title, setTitle] = useState('Title')
    const [editTitle, setEditTitle] = useState(false)
    const [openMobileNotes, setOpenMobileNotes] = useState(false)
    const [MobileNotes, setMobileNotes] = useState('')

  

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
        const existingMobileNotes = JSON.parse(localStorage.getItem('Notes')) || []

        const noteIndex = existingMobileNotes.findIndex((n)=> n.title === title)

        if (noteIndex !== -1){
            existingMobileNotes[noteIndex].MobileNotes = MobileNotes
        } else {
            existingMobileNotes.push({title, MobileNotes})
        }

        localStorage.setItem('Notes', JSON.stringify(existingMobileNotes))
        console.log(JSON.parse(localStorage.getItem('Notes')))
    }

    const handleNewNote=()=>{
        setTitle('Title')
        setMobileNotes('')
    }

    const handleOpen =()=>{
        setOpenMobileNotes(true)
        const existingMobileNotes = JSON.parse(localStorage.getItem('Notes')) || []
        setMobileNotes(existingMobileNotes)
        console.log(MobileNotes)
    }

    const handleOpenNote =(title, note)=>{
        setTitle(title)
        setMobileNotes(note)
        setOpenMobileNotes(false)
    }

    return(
        <>
            <div className='mobile-notes-box container-fluid'>

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
                    value={MobileNotes}
                    onChange={(e)=> setMobileNotes(e.target.value)}
                />
                        
                {openMobileNotes && <div className='mobile-notes-open-list container-fluid'>
                    <div className='window-header mobile-notes-open-header container-fluid'>
                        <img className='window-logo' src='./media/clam_color.png' />
                        <div className='window-title'>Documents</div>
                        <div className='window-widgets-container'>
                            <div 
                                className='window-close-btn window-widget'
                            ><img 
                                className='window-widget-img' 
                                onClick={()=>{setOpenMobileNotes(false)}}
                                src='./media/close2.png'
                            /></div>
                        </div>
                    </div>
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