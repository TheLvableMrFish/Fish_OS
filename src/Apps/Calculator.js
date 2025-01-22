import React from 'react'
import { useState } from 'react'

import calculator from './AppsCSS/calculator.css'

const Calculator =({})=>{

    const [calc, setCalc] = useState('')
    const [answer, setAnswer] = useState(false)
    const [firstNums, setFirstNums] = useState('')
    const [secondNums, setSecondNums] = useState('')
    const [opperation, setOpperation] = useState('')

    let opperations = ['+', '-', '*', '/']

    const handleCalc=(input)=>{
        if (opperation ==='' && Number.isInteger(input) && !answer){
            setFirstNums((prev)=> prev + `${input}`)
            setCalc(calc + `${input}`)
        } else if (opperation ==='' && Number.isInteger(input) && answer){
            // Calc function to allow them to start a new amount without having to clear
            setAnswer(false)
            setCalc('')
            setFirstNums('')

            setFirstNums(`${input}`)
            setCalc(`${input}`)
        } else if(firstNums !== '' && opperation == '' && opperations.includes(input)){
            setOpperation((prev)=> prev + `${input}`)
            setCalc(calc + `${input}`)
        } else if(opperation !== '' && Number.isInteger(input)){
            setSecondNums((prev)=> prev + `${input}`)
            setCalc(calc + `${input}`)
        } else if (input === 'C'){
            setAnswer(false)
            setCalc('')
            setFirstNums('')
            setSecondNums('')
            setOpperation('')
        } else if (input === '='){
            let result
            switch(opperation){
                case '+':
                    result = (parseFloat(firstNums) + parseFloat(secondNums))
                    break
                case '-':
                    result = (parseFloat(firstNums) - parseFloat(secondNums))
                    break
                case '*':
                    result = (parseFloat(firstNums) * parseFloat(secondNums))
                    break
                case '/':
                    result = (parseFloat(firstNums) / parseFloat(secondNums))
                    break
                default:
                    result = ('Error')
            }
            if(result % 1 !== 0){
                result = result.toFixed(3)
            }
            setAnswer(true)
            setCalc(result)
            setFirstNums(result.toString())
            setOpperation('')
            setSecondNums('')
        }
    }

    return(
        <>
        <div className='calculator-box container-fluid'>
            <div className='row'>
                <div className='calculator-display col-12'>
                    <div  className='calc'>{calc}</div>
                </div>
                <div className='buttons row'>
                    <div onClick={()=> handleCalc(7)} className='button col'>7</div>
                    <div onClick={()=> handleCalc(8)} className='button col'>8</div>
                    <div onClick={()=> handleCalc(9)} className='button col'>9</div>
                    <div onClick={()=> handleCalc('C')} className='button col'>C</div>
                </div>
                <div className='buttons row'>
                    <div onClick={()=> handleCalc(4)} className='button col'>4</div>
                    <div onClick={()=> handleCalc(5)} className='button col'>5</div>
                    <div onClick={()=> handleCalc(6)} className='button col'>6</div>
                    <div onClick={()=> handleCalc('/')} className='button col'>/</div>
                </div>
                <div className='buttons row'>
                    <div onClick={()=> handleCalc(1)} className='button col'>1</div>
                    <div onClick={()=> handleCalc(2)} className='button col'>2</div>
                    <div onClick={()=> handleCalc(3)} className='button col'>3</div>
                    <div onClick={()=> handleCalc('*')} className='button col'>*</div>
                </div>
                <div className='buttons row'>
                    <div onClick={()=> handleCalc('-')} className='button col'>-</div>
                    <div onClick={()=> handleCalc(0)} className='button col'>0</div>
                    <div onClick={()=> handleCalc('+')} className='button col'>+</div>
                    <div onClick={()=> handleCalc('=')} className='button col'>=</div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Calculator