import React from 'react'
import { useState, useRef, useCallback, useEffect} from 'react'

import paint_css from './AppsCSS/paint_css.css'

const Paint =({})=>{

    const [title, setTitle] = useState('Title')
    const [color, setColor] = useState('Black')
    const [editTitle, setEditTitle] = useState(false)
    const [isDrawing, setIsDrawing] = useState(false)
    const [drawImage, setDrawImage] = useState(null)
    const [openPaint, setOpenPaint] = useState(false)
    const [allPaints, setAllPaints] = useState([])
    const [brushSize, setBrushSize] = useState(2)
    const [tool, setTool] = useState('brush')

    const canvasRef = useRef(null)
    const lastPos = useRef({x: 0, y: 0})

    const parseColor = (colorName)=>{
        const colors = {
            "Black": [0, 0, 0, 255],
            "White": [255, 255, 255, 255],
            "Red" : [255, 0, 0, 255],
            "Blue" : [0, 0, 255, 255],
            "Pink" : [255, 192, 203, 255],
            "Green" : [0, 128, 0, 255],
            "Brown" : [165, 42, 42, 255],
            "Orange" : [255, 165, 0, 255]
        }
        return colors[colorName] || [0, 0, 0, 255]
    }

    // Check if the RGB out of RGBA match
    const colorsMatch =(a,b)=>{
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2]
    }

    // flood fill (bucket)
    const floodFill =(ctx, startX, startY, fillColor)=>{
        const canvasWidth = ctx.canvas.width
        const canvasHeight = ctx.canvas.height
        const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight)
        const data = imageData.data

        const x = Math.floor(startX)
        const y = Math.floor(startY)
        const pixelPos = (y * canvasWidth + x) * 4
        const targetColor = [data[pixelPos], data[pixelPos + 1], data[pixelPos + 2]]

        if(colorsMatch(targetColor, fillColor)){
            return
        }

        const pixelStack = [[x,y]]

        while(pixelStack.length){
            const newPos = pixelStack.pop()
            const nx = newPos[0]
            const ny = newPos[1]
            const currentPos = (ny * canvasWidth + nx) * 4

            // check if this pixel matches the target color
            const currentColor = [
                data[currentPos],
                data[currentPos + 1],
                data[currentPos + 2]
            ]
            if(!colorsMatch(currentColor, targetColor)){
                continue
            }

            // set the pixel to the fill color
            data[currentPos] = fillColor[0]
            data[currentPos + 1] = fillColor[1]
            data[currentPos + 2] = fillColor[2]

            // Add neighboring pixels (up,down,left,right) to the stack
            if(nx > 0) pixelStack.push([nx - 1, ny])
            if(nx < canvasWidth - 1) pixelStack.push([nx + 1, ny])
            if(ny > 0) pixelStack.push([nx, ny- 1])
            if(ny < canvasHeight - 1) pixelStack.push([nx, ny + 1])
        }

        ctx.putImageData(imageData, 0, 0)
    }


    const colorList = ["Black", "White", "Red", "Blue", "Pink", "Green", "Brown", "Orange"]

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

        if(drawImage){
            const img = new Image()
            img.src = drawImage
            img.onload =()=>{
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            }
        } else {
            ctx.fillStyle = "White"
            ctx.fillRect(0, 0, canvas.width, canvas.height)
        }
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

        if(tool === 'fill'){
            const {x,y} = getCanvasCoords(e)
            const ctx = canvasRef.current.getContext("2d")
            const fillColor = parseColor(color)
            floodFill(ctx, x, y, fillColor)
            saveDrawing()
        } else {
            setIsDrawing(true)
            const ctx = canvasRef.current.getContext("2d")
            // Relative mouse cords to the canvas
            const {x, y} = getCanvasCoords(e)
            lastPos.current = {x, y}
            // start drawing
            draw(x, y, ctx)
        }
    }

    const handleMouseMove = useCallback(
        (e)=>{
            if (!isDrawing || tool !== "brush") return
            const ctx = canvasRef.current.getContext("2d")
            const {x, y} = getCanvasCoords(e)

            // Use requestAnimationFrame for smoother drawing
            requestAnimationFrame(()=> draw(x, y, ctx))
        },
        [isDrawing, brushSize]
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

    const handleWheel = (e)=>{
        e.preventDefault()
        setBrushSize((prevSize)=>{
            let newSize = e.deltaY < 0 ? prevSize + 1 : prevSize - 1
            newSize = (newSize < 1 ? newSize = 1 : newSize > 50 ? newSize = 50 : newSize)
            return newSize
        })
    }

    const draw = (x, y, ctx) =>{
        const {x: lastX, y: lastY} = lastPos.current

        ctx.beginPath()
        ctx.moveTo(lastX, lastY) // Start from last position
        ctx.lineTo(x, y) // Draw a line to the curr position
        ctx.strokeStyle = color
        ctx.lineWidth = brushSize
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

    const saveDrawingAsImg =()=>{
        const canvas = canvasRef.current
        const dataURL = canvas.toDataURL("image/png")

        // Get existig saved drawings or create an empty object
        const existingPaints = JSON.parse(localStorage.getItem('paintSaves')) || []

        // Make sure it's title isn't used already
        const paintIndex = existingPaints.findIndex((p)=> p.title === title)

        if( paintIndex !== -1){
            // update existing entry
            existingPaints[paintIndex].dataURL = dataURL
        } else {
            // add new entry
            existingPaints.push({title, dataURL})
        }

        // update localStorage
        localStorage.setItem("paintSaves", JSON.stringify(existingPaints))

        console.log(existingPaints)
    }

    const loadDrawingImgs =(imgTitle) =>{
        setAllPaints(JSON.parse(localStorage.getItem('paintSaves')) || [])
        setOpenPaint(true)
    }

    const handleNewDrawingImg =()=>{
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        ctx.clearRect(0,0, canvas.width, canvas.height)
        setTitle("Title")
    }

    const handleOpenDrawing =(paintTitle, img)=>{
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        if(paintTitle != title){
            ctx.clearRect(0,0, canvas.width, canvas.height)
            setTitle(paintTitle)
            setDrawImage(img)
        }
        if(paintTitle === title){
            setTitle(paintTitle)
            setDrawImage(img)
        }
        setOpenPaint(false)
    }

    const handleColorChange =(newColor)=>{
        setColor(newColor)
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
                        <div className='paint-text-btn paint-text-btn-mr col'
                            onClick={()=>{loadDrawingImgs()}}
                        >Open</div>
                        <div className='paint-text-btn paint-text-btn-mr col'
                            onClick={()=>{saveDrawingAsImg()}}
                        >Save</div>
                        <div className='paint-text-btn col'
                            onClick={()=>{handleNewDrawingImg()}}
                        >New</div>
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

                <div className='paint-tools row'>
                    <div className='col-9'></div>
                    
                </div>

                <div className='color-container paint-tools  row'>
                    {colorList.map((colorItem)=>(
                        <div 
                        key={colorItem} 
                        className={`color col ${colorItem === color ? 'active-color': ''}`}
                        style={{backgroundColor:colorItem}}
                        onClick={()=>{handleColorChange(colorItem)}}
                        ></div>
                    ))}
                    <div 
                        className={`paint-brush col-1 ${tool === 'brush' ? 'active':''}`}
                        onClick={()=> setTool("brush")}
                    >brush</div>
                    <div 
                        className={`paint-fill col-1 ${tool === 'fill' ? 'active':''}`}
                        onClick={()=> setTool("fill")}
                    >bucket</div>
                </div>

                <div className='paint-container container-fluid'>
                    <canvas 
                        ref={canvasRef}
                        className='paint-canvas row'
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                        onWheel={handleWheel}
                    >
                    </canvas>
                </div>

                

                {openPaint && <div className='paint-open-list container-fluid'>
                    <div className='window-header paint-open-header container-fluid'>
                        <img className='window-logo' src='./media/clam_color.png' />
                        <div className='window-title'>Documents</div>
                        <div className='window-widgets-container'>
                            <div 
                                className='window-close-btn window-widget'
                            ><img 
                                className='window-widget-img' 
                                onClick={()=>{setOpenPaint(false)}}
                                src='./media/close2.png'
                            /></div>
                        </div>
                    </div>
                    <div className='paint-scrollable-container'>
                    <div className='row'>
                        {allPaints.length > 0 ? allPaints.map((paint, index)=>(
                            <React.Fragment key={index}>
                                <div 
                                    className={`paint-open-item
                                        col-3`}
                                    onClick={()=>handleOpenDrawing(paint.title, paint.dataURL)}
                                >{paint.title}</div>
                               
                            </React.Fragment>
                        )) : <div className='paint-open-empty'>
                            No images yet.
                            Try painting something and then 
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

export default Paint