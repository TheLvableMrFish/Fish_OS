import React, { useRef, useState, useEffect } from 'react'
// fix me 
const Window =({windows_prop, updateWindowPosition, closeWindow, minWindow})=>{

    const [windows, setWindows] = useState(windows_prop)

    useEffect(()=>{
        setWindows(windows_prop)
    }, [windows_prop])

    const dragStartRef = useRef(null)

    //  brings the current window that's being focused to the top
    const bringToFront=(id)=>{
        setWindows((prev) =>{

            // sort the windows by their index
            let sortedWindows = [...prev].sort((a, b) => a.zIndex - b.zIndex)

            // find the one we are working with in the list 
            const focusedWindow = sortedWindows.find((win)=> win.id ===id)

            if(!focusedWindow) return prev

            sortedWindows = sortedWindows.filter((win)=> win.id !== id)
            sortedWindows.push({...focusedWindow, zIndex: sortedWindows.length + 1})

            // Reassign the zIndex of the rest of the windows
            sortedWindows = sortedWindows.map((win, index) =>({
                ...win,
                zIndex: index + 1
            }))

           return sortedWindows
        })
    }

    const handleDragStart = (id, startX, startY)=>{
        const targetWinow = windows.find((win)=> win.id === id)
        

        if(targetWinow){
            dragStartRef.current={
                id,
                initialX: targetWinow.x,
                initialY: targetWinow.y,
                startX,
                startY
            }
        }
    }

    const handleDragMove =(currentX, currentY)=>{
        
        if(!dragStartRef.current) return
        
        const {id, initialX, initialY, startX, startY} = dragStartRef.current
        const dx = currentX - startX
        const dy = currentY - startY

        // update window position in Desktop using updateWindowPosition()
        updateWindowPosition(id, initialX + dx, initialY + dy)

        // setWindows((prev)=>
        //     prev.map((win)=>
        //         win.id === id ? {...win, x:initialX + dx, y:initialY + dy} : win
        //     )
        // )
    }

    const handleDragEnd=()=>{
        if(dragStartRef.current){
            bringToFront(dragStartRef.current.id)
        }
        dragStartRef.current = null;
    }


    return(
        <>
            {windows
                .filter((win) => win.windowState !== 'minimized')
                .map((win)=>(
                <div
                    key={win.id}
                    className='window-box'
                    style={{
                        left: win.x,
                        top: win.y,
                        zIndex: win.zIndex,
                        width: win.width || '300px',
                        height: win.height || '300px'
                    }}
                    onMouseDown={()=> bringToFront(win.id)}
                >
                    <div
                        className='window-header container-fluid'
                        onMouseDown={(e) =>{
                            handleDragStart(win.id, e.clientX, e.clientY)

                            const handleMouseMove=(moveEvent)=>{
                                handleDragMove(moveEvent.clientX, moveEvent.clientY)
                                moveEvent.preventDefault()
                            }

                            const handleMouseUp=()=>{
                                handleDragEnd()
                                document.removeEventListener('mousemove', handleMouseMove)
                                document.removeEventListener('mouseup', handleMouseUp)
                            }

                            document.addEventListener('mousemove', handleMouseMove)
                            document.addEventListener('mouseup', handleMouseUp)
                        }}
                    >
                        <img className='window-logo' src={`./media/${win.img}.png`}/>
                        <div className='window-title'>{win.title}</div>
                        <div className='window-widgets-container'>
                            <div 
                                className='window-close-btn window-widget'
                                onClick={()=> minWindow(win.id)}
                            ><img className='window-widget-img' src='./media/minimize2.png'/></div>
                            <div 
                                className='window-close-btn window-widget'
                                // onClick={()=> setWindows((prev)=>prev.filter((win) => win.id !== win.id))}
                            ><img className='window-widget-img' src='./media/full_screen2.png'/></div>
                            <div 
                                className='window-close-btn window-widget'
                                onClick={()=> closeWindow(win.id)}
                            ><img className='window-widget-img' src='./media/close2.png'/></div>
                            </div>
                        </div>
                    <div className='window-content'>
                        {win.content}
                    </div>
                </div>
            ))}
        </>
    )
}

export default Window