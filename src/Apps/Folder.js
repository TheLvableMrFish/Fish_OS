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

    let folders = ['Desktop', 'Downloads', 'Documents', 'Pictures', 'This PC']

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
    }, [])

    const handleClick =(folderName)=>{
        setFolderPath(folderName)
    }

    return(
        <>

        
        <div className='paint-box container-fluid'>
            <div className='row'>
                <div className='col-12'>{folderPath}</div>
                <div className='folder-seperator col-12'></div>
                <div className='folder-list col-3'>

                    {folders.map((folder)=>(
                        <div className='folder-item' onClick={()=>handleClick(folder)}>
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
                    </div>
                </div>

            </div>
        </div>
        </>
    )
}

export default Folder