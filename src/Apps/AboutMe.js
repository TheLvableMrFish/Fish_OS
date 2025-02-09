import React, { useEffect, useState } from 'react'

import about_me_csss from './AppsCSS/about_me_css.css'

const AboutMe =({})=>{



    return(
        <>
        <div className='about-me-box container-fluid'>
            <div className='row'>
                <div className='row'>
                    <img className='about-me-img img-fluid col' src='./media/about-me-img.jpg' />
                    <div className='about-me-top-text col'>
                        Hi, Welcome to my portfolio website. I'm Christian Pagano and a software developer.
                        I finished my degree in Computer Science. I am now working as a Business data analyst for Hancock Whitney Bank.
                    </div>
                </div>
                <h5 className='about-me-skills'>Skills</h5>
                <div className='about-me-skills-container row'>
                    <div className='about-me-skills-title col-4'>
                        <h6>Langagues</h6>
                        <div>JavaScript</div>
                        <div>HTML/CSS</div>
                        <div>SQL/MongoDB</div>
                        <div>Python</div>
                        <div>Visual Basic</div>
                    </div>
                    <div className='about-me-skills-title col-4'>
                        <h6>Frameworks</h6>
                        <div>Node.js</div>
                        <div>Bootstrap 4&5</div>
                        <div>Tkinter</div>
                    </div>
                    <div className='about-me-skills-title col-4'>
                        <h6>Libraries</h6>
                        <div>React</div>
                        <div>Three.js</div>

                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default AboutMe