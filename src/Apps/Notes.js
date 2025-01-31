import React from 'react'
import { useState } from 'react'

import notes_css from './AppsCSS/notes_css.css'

const Notes =({})=>{

    const [title, setTitle] = useState('Title')
    const [editTitle, setEditTitle] = useState(false)
    const [openNotes, setOpenNotes] = useState(false)
    const [note, setNote] = useState('')

    const [notes, setNotes] = useState([])

    const handleStartEdit=()=>{
        setEditTitle(true)
    }

    const handleEdit=()=>{
        setEditTitle(false)
        // localStorage.clear();
        // sessionStorage.clear()
        // localStorage.removeItem('notes')
    }

    const handleSave=()=>{
        const existingNotes = JSON.parse(localStorage.getItem('notes')) || []

        const noteIndex = existingNotes.findIndex((n)=> n.title === title)

        if (noteIndex !== -1){
            existingNotes[noteIndex].note = note
        } else {
            existingNotes.push({title, note})
        }

        localStorage.setItem('notes', JSON.stringify(existingNotes))
        console.log(JSON.parse(localStorage.getItem('notes')))
    }

    const handleOpen =()=>{
        setOpenNotes(true)
        const existingNotes = JSON.parse(localStorage.getItem('notes')) || []
        setNotes(existingNotes)
        console.log(notes)
    }

    const handleOpenNote =(title, note)=>{
        setTitle(title)
        setNote(note)
        setOpenNotes(false)
    }

    return(
        <>
            <div className='notes-box container-fluid'>

                    {!editTitle && 
                        <div className='notes-text-edit-container row'>
                            <label 
                                className='notes-text-label col' 
                                onClick={()=>{handleStartEdit()}}
                            >{title}</label>
                            <div className='notes-text-open-btn col'
                                onClick={()=>{handleOpen()}}
                            >Open</div>
                            <div className='notes-text-save-btn col'
                                onClick={()=>{handleSave()}}
                            >Save</div>
                        </div>
                    }
                    
                    {editTitle &&
                        <div className='notes-text-edit-container row'>
                            <input 
                                className='notes-text-label-edit col' 
                                value={title}
                                onChange={(e)=> setTitle(e.target.value)}
                                maxLength={22}
                            ></input>
                            <div className='notes-text-label-edit-btn col'
                                onClick={()=>{handleEdit()}}
                            >Change</div>
                        </div>
                    }

                <textarea 
                    className='notes-text-box' 
                    type='textarea' 
                    id='note' 
                    name='note'
                    value={note}
                    onChange={(e)=> setNote(e.target.value)}
                />
                        
                {openNotes && <div className='notes-open-list container-fluid'>
                    <div className='window-header notes-open-header container-fluid'>
                        <img className='window-logo' src='./media/clam_color.png' />
                        <div className='window-title'>Documents</div>
                        <div className='window-widgets-container'>
                            <div 
                                className='window-close-btn window-widget'
                            ><img 
                                className='window-widget-img' 
                                onClick={()=>{setOpenNotes(false)}}
                                src='./media/close2.png'
                            /></div>
                        </div>
                    </div>
                    <div className='notes-scrollable-container'>
                    <div className='row'>
                        {notes.length > 0 ? notes.map((note, index)=>(
                            <React.Fragment key={index}>
                                <div 
                                    className={`notes-open-item
                                        ${index === notes.length - 1 ?
                                        'notes-open-item-border-radius-edit' :
                                        ''} col-3`}
                                    onClick={()=>handleOpenNote(note.title, note.note)}
                                >{note.title}</div>
                                <div 
                                    className='notes-open-item-text col-8'>{note.note}</div>
                            </React.Fragment>
                        )) : <div className='notes-open-empty'>
                            No notes yet.
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

export default Notes