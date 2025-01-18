import React from 'react'
import { useState, useEffect } from 'react'

const Calander =()=>{

    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    const [currentDate, setCurrentDate] = useState(new Date())

    // Calculate the days in the month
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()

    let year = currentDate.getFullYear()
    let month = currentDate.getMonth()
    let monthName = currentDate.toLocaleString('default', {month: 'long'})
    let daysInMonth = getDaysInMonth(year, month)
    let firstDay = new Date(year, month, 1).getDay()

    // Previous month details
    let prevMonth = month === 0 ? 11 : month - 1
    let prevYear = month === 0 ? year - 1: year
    let daysInPrevMonth = getDaysInMonth(prevYear, prevMonth)

    // Fill blank days  at start of month with days from prevMonth
    let prevMonthDays = Array(firstDay)
        .fill(null)
        .map((_,index)=>daysInPrevMonth - firstDay + index + 1)

    // Generate an array of days for current month
    let currentMonthDays = Array(daysInMonth)
        .fill(null)
        .map((_, index) => index + 1)

    // Fill blank days at the end from next month
    let nextMonthDays = Array(42 - (prevMonthDays.length + currentMonthDays.length))
        .fill(null)
        .map((_, index) => index + 1)

    // Combine all days
    let allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]

    // Split into weeks
    let weeks =[]
    for(let i = 0; i < allDays.length; i+=7){
        weeks.push(allDays.slice(i, i+7))
    }

    // Get today
    let today = new Date()
    let todayDay = today.getDate()
    let todayMonth = today.getMonth()
    let todayYear = today.getFullYear()
    let isToday = (day) => day === todayDay && month === todayMonth && year === todayYear

    const handlePreviousMonth =()=>{
        setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() -1, 1))
    }

    const handleNextMonth =()=>{
        setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() +1, 1))
    }

    return(
        <>
        <div className='calander'>
            <div className='calander-date-box row'>
                <div className='calander-date col-7'>{monthName} {year}</div>
                <div className='calander-spacer col-2'></div>

                <div className='calander-toggles col-1'><img 
                    className='calander-toggle ' 
                    src='./media/up_icon.png'
                    onClick={handlePreviousMonth}
                    />
                </div>

                <div className='calander-toggles col-1'><img 
                    className='calander-toggle ' 
                    src='./media/down_icon.png'
                    onClick={handleNextMonth}
                    />
                </div>

            </div>
            <div className='calander-week-day'>

                <ui className='calander-week-day-list row'>
                    {daysOfWeek.map((day) =>(
                        <li key={day} className='calander-week-day-item col'>{day}</li>
                    ))}
                </ui>
                
                {weeks.map((week, index)=>(
                    <ul key={index} className='calander-day-list row'>
                        {week.map((day, dayIndex) =>{
                        
                        let isPrevMonth = index === 0 && day > 7
                        let isNextMonth = index >=4 && day <= 14

                        return(   
                            <li key={dayIndex} 
                                className={`
                                    calander-day-item col 
                                    ${isPrevMonth || isNextMonth ? 'calander-date-out-of-month' : ''}
                                    ${isToday(day) ? 'calander-date-today': ''}
                                    `}>
                                {day || ''}
                            </li>
                            )}
                        )}
                    </ul>
                ))}
            </div>
        </div>
        </>
    )
}

export default Calander