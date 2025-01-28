import React from 'react'
import { useState, useRef, useCallback, useEffect} from 'react'

import paint_css from './AppsCSS/paint_css.css'

const Paint =({})=>{

    const [title, setTitle] = useState('Title')
    const [editTitle, setEditTitle] = useState(false)
    const [isDrawing, setIsDrawing] = useState(false)
    const [drawImage, setDrawImage] = useState(null)
    const canvasRef = useRef(null)
    const lastPos = useRef({x: 0, y: 0})

    // Set canvas size based on parent dimensions
    const setCanvasSize =()=>{
        const canvas = canvasRef.current
        const container = canvas.parentElement

        // Set the internal resolution of the cavnas
        canvas.width = container.offsetWidth
        canvas.height = container.offsetHeight

        // Ensure scaling of the canvas coords
        const ctx = canvas.getContext("2d")
        // reset any scale transformations
        ctx.scale(1,1) 
    }

    // canvas resize (if we change the size later)
    useEffect(()=>{
        setCanvasSize()
        window.addEventListener('resize', setCanvasSize)
        return ()=>{
            window.removeEventListener('resize', setCanvasSize)
        }
    }, [])

    const handleMouseDown=(e)=>{
        setIsDrawing(true)
        const ctx = canvasRef.current.getContext("2d")
        // Relative mouse cords to the canvas
        const {x, y} = getCanvasCoords(e)
        lastPos.current = {x, y}
        // start drawing
        draw(x, y, ctx)
    }

    const handleMouseMove = useCallback(
        (e)=>{
            if (!isDrawing) return
            const ctx = canvasRef.current.getContext("2d")
            const {x, y} = getCanvasCoords(e)

            // Use requestAnimationFrame for smoother drawing
            requestAnimationFrame(()=> draw(x, y, ctx))
        },
        [isDrawing]
    )

    const handleMouseUp=()=>{
        saveDrawing()
        setIsDrawing(false)
    }

    // handles stopping the drawing when the mouse leaves
    // if not, long lines pop up to reconnect from when you left to where you go back in
    const handleMouseLeave =()=>{
        saveDrawing()
        setIsDrawing(false)
    }

    const draw = (x, y, ctx) =>{
        const {x: lastX, y: lastY} = lastPos.current

        ctx.beginPath()
        ctx.moveTo(lastX, lastY) // Start from last position
        ctx.lineTo(x, y) // Draw a line to the curr position
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 2
        ctx.lineCap = 'round' // smooth corner for the lines
        ctx.stroke() // Draw

        // update last position to current one
        lastPos.current = {x, y}
    }

    const getCanvasCoords =(e)=>{
        const canvas = canvasRef.current
        const rect = canvasRef.current.getBoundingClientRect()

        // Adjust for the scale factor of the canvas
        // Horizontal scaling
        const scaleX = canvas.width / rect.width
        // Vertical scaling
        const scaleY = canvas.height / rect.height

        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        }
    }

    // Save the current drawing to useState
    const saveDrawing =()=>{
        const canvas = canvasRef.current
        // Get the canvas image as a data url
        const dataURL = canvas.toDataURL()
        setDrawImage(dataURL)
    }

    // Load the saved drawing when the component mounts
    useEffect(()=>{
        if(drawImage){
            const canvas = canvasRef.current
            const ctx = canvas.getContext("2d")
            const img = new Image()
            img.src = drawImage
            img.onload=()=>{
                ctx.drawImage(img, 0, 0)
            }
        }
    }, [drawImage])

    const handleStartEdit=()=>{
        setEditTitle(true)
    }

    const handleEdit=()=>{
        setEditTitle(false)
        // localStorage.clear();
        // localStorage.removeItem('paint')
    }

    return(
        <>
           <div className='paint-box container-fluid'>

           <div className='paint-header row'>
            {!editTitle && 
                    <div className='paint-text-edit-container row'>
                        <label 
                            className='paint-text-label col' 
                            onClick={()=>{handleStartEdit()}}
                        >{title}</label>
                        <div className='paint-text-open-btn col'
                            // onClick={()=>{handleOpen()}}
                        >Open</div>
                        <div className='paint-text-save-btn col'
                            // onClick={()=>{handleSave()}}
                        >Save</div>
                    </div>
                }
                
                {editTitle &&
                    <div className='paint-text-edit-container row'>
                        <input 
                            className='paint-text-label-edit col' 
                            value={title}
                            onChange={(e)=> setTitle(e.target.value)}
                            maxLength={22}
                        ></input>
                        <div className='paint-text-label-edit-btn col'
                            onClick={()=>{handleEdit()}}
                        >Change</div>
                    </div>
                }
                </div>

                <div className='paint-container container-fluid'>
                    <canvas 
                        ref={canvasRef}
                        className='paint-canvas row'
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                    >
                    </canvas>
                </div>
           </div>
        </>
    )
}

export default Paint