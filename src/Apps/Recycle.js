import React, { useEffect, useState } from 'react'

import recycle_css from './AppsCSS/recycle_css.css'

const Recycle =({})=>{

    const [notes, setNotes] = useState([])

    const existingNotes = JSON.parse(sessionStorage.getItem('deletedNotes')) || []

    useEffect(()=>{
        setNotes(existingNotes)
    }, [])

    const handleRecover =(title)=>{
        const deletedNotes = JSON.parse(sessionStorage.getItem('deletedNotes')) || []

        // Find the note to be recovered
        const noteToRecover = deletedNotes.find((note)=> note.title === title)

        // Add the note to the local storage
        if(noteToRecover){
            const existingNotes = JSON.parse(localStorage.getItem('notes')) || []

            existingNotes.push(noteToRecover)
            localStorage.setItem('notes', JSON.stringify(existingNotes))
        }

        // Create list of the
        const updateRecoveredNotes = deletedNotes.filter((note)=> note.title !== title)

        // Update session storage
        sessionStorage.setItem('deletedNotes', JSON.stringify(updateRecoveredNotes))
        setNotes(updateRecoveredNotes)
    }

    return(
        <>
        <div className='recycle-box container-fluid'>
            <div className='recycle-scrollable-container'>
               
                {notes.map((note)=>(
                    <div className='recycle-app-documents row'>
                        <div key={note.title} className='recycle-app-document col-10'>{note.title}.txt
                            <img 
                                src='./media/recover.png' 
                                className='recycle-document-recover'
                                onClick={()=>handleRecover(note.title)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}

export default Recycle