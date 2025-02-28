import React from 'react'
import { useState } from 'react'

import mobile_calculator from './MobileAppsCSS/mobile_calculator.css'

const MobileCalculator =({})=>{

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
        } else if (input === '=' && firstNums && secondNums){
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
        <div className='mobile-calculator-box '>
            <div className='row'>
                <div className='mobile-calculator-display col-12'>
                    <div  className='calc'>{calc}</div>
                </div>
                <div className='mobile-buttons-all'>
                    <div className='mobile-buttons row'>
                        <div onClick={()=> handleCalc(7)} className='mobile-button col-3'>7</div>
                        <div onClick={()=> handleCalc(8)} className='mobile-button col-3'>8</div>
                        <div onClick={()=> handleCalc(9)} className='mobile-button col-3'>9</div>
                        <div onClick={()=> handleCalc('C')} className='mobile-button col-3'>C</div>
                    </div>
                    <div className='mobile-buttons row'>
                        <div onClick={()=> handleCalc(4)} className='mobile-button col-3'>4</div>
                        <div onClick={()=> handleCalc(5)} className='mobile-button col-3'>5</div>
                        <div onClick={()=> handleCalc(6)} className='mobile-button col-3'>6</div>
                        <div onClick={()=> handleCalc('/')} className='mobile-button col-3'>/</div>
                    </div>
                    <div className='mobile-buttons row'>
                        <div onClick={()=> handleCalc(1)} className='mobile-button col-3'>1</div>
                        <div onClick={()=> handleCalc(2)} className='mobile-button col-3'>2</div>
                        <div onClick={()=> handleCalc(3)} className='mobile-button col-3'>3</div>
                        <div onClick={()=> handleCalc('*')} className='mobile-button col-3'>*</div>
                    </div>
                    <div className='mobile-buttons row'>
                        <div onClick={()=> handleCalc('-')} className='mobile-button col-3'>-</div>
                        <div onClick={()=> handleCalc(0)} className='mobile-button col-3'>0</div>
                        <div onClick={()=> handleCalc('+')} className='mobile-button col-3'>+</div>
                        <div onClick={()=> handleCalc('=')} className='mobile-button col-3'>=</div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default MobileCalculator