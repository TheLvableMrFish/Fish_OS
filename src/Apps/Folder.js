import React, { useEffect, useState } from 'react'

import folder_css from './AppsCSS/folder_css.css'

import {app_data_mini} from '../Data/app_data_mini'

const Folder =({})=>{

    const [folderPath, setFolderPath] = useState('Desktop')
    const [storageInfo, setStorageIno] = useState({
        usedStorage: 0,
        remainingStorage: 0,
        usedPercentage: 0
    })
    const [notes, setNotes] = useState([])
    const [paints, setPaints] = useState([])

    let folders = ['Desktop', 'Downloads', 'Documents', 'Pictures', 'This PC']

    

        // const noteIndex = existingNotes.findIndex((n)=> n.title === title)

        // if (noteIndex !== -1){
        //     existingNotes[noteIndex].note = note
        // } else {
        //     existingNotes.push({title, note})
        // }



    const maxStorage = 5 * 1024 * 1024 

    const formatedBytes=(bytes)=>{
        const sizes = ['Bytes', 'KB', 'MB']
        if(bytes ===0) return '0 Byte'
        const i = Math.floor(Math.log(bytes) / Math.log(1024))
        return ((bytes/Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i])
    }

    const calculateStorageUsage =()=>{
        let totalSize = 0

        // go through all items in localStorage and add them by size
        for(let i = 0; i < localStorage.length; i++){
            const key = localStorage.key(i)
            const value = localStorage.getItem(key)
            totalSize += key.length + value.length // size of the key + value
        }

        // 5MB limit (in bytes)
        const usedStorage = totalSize
        const remainingStorage = maxStorage - usedStorage
        const usedPercentage = (usedStorage / maxStorage) * 100

        setStorageIno({
            usedStorage,
            remainingStorage,
            usedPercentage
        })
    }

    useEffect(()=>{
        // call the function to calculate storage usesage when component loads
        calculateStorageUsage()

        // Set interval to call function every second
        const intervalId = setInterval(calculateStorageUsage, 500)

        // CLeanup the interval
        return ()=>{
            clearInterval(intervalId)
        }
    }, [])

    const handleClick =(folderName)=>{
        setFolderPath(folderName)
        if(folderName === 'Documents'){
            const existingNotes = JSON.parse(localStorage.getItem('notes')) || []
            const savedPaints = JSON.parse(localStorage.getItem('paintSaves')) || []

            console.log("Existing Notes:", existingNotes);
            console.log("Saved Paints:", savedPaints);

            setNotes(existingNotes)
            setPaints(savedPaints)
        }
        calculateStorageUsage()
    }
    
    const handleDelete =(title, fileType)=>{

        const existingItems = JSON.parse(localStorage.getItem(fileType))

        // Find the note to be deleted
        const itemToDelete = existingItems.find((item)=> item.title === title)

        // Add the note to sessionStorage
        if(itemToDelete){
            const deletedItem = JSON.parse(sessionStorage.getItem(`deleted_${fileType}`)) || []

            deletedItem.push(itemToDelete)
            sessionStorage.setItem(`deleted_${fileType}`, JSON.stringify(deletedItem))
        }

        // Create list of the notes without the one that has the current title
        const updateItems = existingItems.filter((item) => item.title !== title)

        // Update local storage 
        localStorage.setItem(fileType, JSON.stringify(updateItems))

        if(fileType === 'notes'){
            setNotes(updateItems)
        } else if(fileType === 'paintSaves'){
            setPaints(updateItems)
        }
        calculateStorageUsage()

    }

    return(
        <>

        
        <div className='folder-box container-fluid'>
            <div className='row'>
                <div className='col-12'>{folderPath}</div>
                <div className='folder-seperator col-12'></div>
                <div className='folder-list col-3'>

                    {folders.map((folder, index)=>(
                        <div key={index} className='folder-item' onClick={()=>handleClick(folder)}>
                            <img className='folder-img' src='./media/clam_color.png'/> {folder}
                        </div>
                        
                    ))}

                    <div className='folder-v-seperator col-1'>

                </div>

                </div>
                <div className='folder-app-container col-9'>
                    <div className='row'>

                        {folderPath === 'Desktop' ? app_data_mini.map((app)=>(
                            <div 
                                key={app.id} className='folder-app col-6'
                            >
                                <img className='folder-app-img' src={`./media/${app.img}.png`}/><span className='folder-app-space'/>{app.title}
                            </div>
                        )) : ''}

                        {folderPath === 'This PC' ? 
                            <div className='folder-local-memory'>
                                <div className=''>Local Storage Usage</div>
                                <div className='folder-storage-info'>
                                    <p>
                                        Used: {formatedBytes(storageInfo.usedStorage)} of {''}
                                        {formatedBytes(maxStorage)} (remaining:{' '}
                                        {formatedBytes(storageInfo.remainingStorage)})
                                    </p>
                                    <div className='folder-storage-bar'>
                                        <div className='folder-storage-bar-fill'
                                            style={{width: `${storageInfo.usedPercentage}%`}}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        : ''}

                        <div className='folder-scrollable-container'>
                        {folderPath === 'Documents' ?
                            notes.map((note)=>(
                                    <div key={note.title} className='folder-app-documents row'>
                                        <div  className='folder-app-document col-10'>{note.title}.txt
                                            <img 
                                                src='./media/delete.png' 
                                                className='folder-document-delte'
                                                onClick={()=> handleDelete(note.title, 'notes')}
                                            />
                                        </div>
                                    </div>
                                
                            )) : ''
                        } 

                        {folderPath === 'Pictures' ?
                            
                            paints.map((paint)=>(
                                    <div key={paint.title} className='folder-app-documents row'>
                                        <div  className='folder-app-document col-10'>{paint.title}.png
                                            <img 
                                                src='./media/delete.png' 
                                                className='folder-document-delte'
                                                onClick={()=> handleDelete(paint.title, 'paintSaves')}
                                            />
                                        </div>
                                    </div>
                                
                            )) : ''
                        }
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </>
    )
}

export default Folder