import React, { useEffect, useState } from 'react'

import recycle_css from './AppsCSS/recycle_css.css'

const Recycle =({})=>{

    const [notes, setNotes] = useState([])
    const [paints, setPaints] = useState([])

    const existingNotes = JSON.parse(sessionStorage.getItem('deleted_notes')) || []
    const existingPaints = JSON.parse(sessionStorage.getItem('deleted_paintSaves')) || []

    useEffect(()=>{
        updateData()

        
    }, [existingNotes, existingPaints])

    const updateData =()=>{
        setNotes(existingNotes)
        setPaints(existingPaints)
    }

    const handleRecover =(title, fileType)=>{
        const deletedItems = JSON.parse(sessionStorage.getItem(`deleted_${fileType}`)) || []

        // Find the note to be recovered
        const itemToRecover = deletedItems.find((item)=> item.title === title)

        // Add the note to the local storage
        if(itemToRecover){
            const existingItems = JSON.parse(localStorage.getItem(fileType)) || []

            existingItems.push(itemToRecover)
            localStorage.setItem(fileType, JSON.stringify(existingItems))

            window.dispatchEvent(new StorageEvent('storage', {key: fileType}))
        }

        // Create list of the
        const updatedRecoverItems = deletedItems.filter((item)=> item.title !== title)

        // Update session storage
        sessionStorage.setItem(`deleted_${fileType}`, JSON.stringify(updatedRecoverItems))
        
        if(fileType === 'notes'){
            setNotes(updatedRecoverItems)
        } else if(fileType === 'paintSaves'){
            setPaints(updatedRecoverItems)
        }
    }

    return(
        <>
        <div className='recycle-box container-fluid'>
            <div className='recycle-scrollable-container'>
                {(notes.length === 0 && paints.length === 0) ? <div className='recycle-empty'>Currently no files in Recycle</div> : ''}
                {notes.map((note, index)=>(
                    <div key={index} className='recycle-app-documents row'>
                        <div key={note.title} className='recycle-app-document col-10'>{note.title}.txt
                            <img 
                                src='./media/recover.png' 
                                className='recycle-document-recover'
                                onClick={()=>handleRecover(note.title, 'notes')}
                            />
                        </div>
                    </div>
                ))}

                {paints.map((paint, index)=>(
                    <div key={index} className='recycle-app-documents row'>
                        <div key={paint.title} className='recycle-app-document col-10'>{paint.title}.png
                            <img 
                                src='./media/recover.png' 
                                className='recycle-document-recover'
                                onClick={()=>handleRecover(paint.title, 'paintSaves')}
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