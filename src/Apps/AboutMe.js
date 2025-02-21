import React, { useEffect, useState } from 'react'

import about_me_csss from './AppsCSS/about_me_css.css'

const AboutMe =({})=>{



    return(
        <>
        <div className='about-me-box container-fluid'>
            <div className='row'>
                <div className='about-me-container row'>
                    <div className='about-me-top-text col-8'>
                        Hi, welcome to my portfolio. I'm Christian Pagano, a software developer with a Bachelor's in Computer Science. I work as a Business Data Analyst at a Bank and enjoy creating things like the website your on.
                    </div>
                    <img className='about-me-img img-fluid col-4' src='./media/about-me-img.jpg' />
                </div>
                <h5 className='about-me-skills'>Skills</h5>
                <div className='about-me-skills-container row'>
                    <div className='about-me-skills-title col-4'>
                        <h6>Coding</h6>
                        <div>JS/HTML/CSS</div>
                        <div></div>
                        <div>SQL/MongoDB</div>
                        <div>React/Node.js/3.js</div>
                        <div>Visual Basic/Access</div>
                        <div>Python/Tkinter</div>
                    </div>
                    <div className='about-me-skills-title col-4'>
                        <h6>Tools & Platforms</h6>
                        <div>Git/GitHub</div>
                        <div>Gitbash/Cmd</div>
                        <div>VisualStudio/VSC</div>
                        <div>Talend</div>
                        <div>Eclipse/PyCharm</div>
                    </div>
                    <div className='about-me-skills-title col-4'>
                        <h6>Management</h6>
                        <div>Leading</div>
                        <div>Problem Solving</div>
                        <div>Mentoring</div>
                        <div>Planning</div>
                        <div>Time Management</div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default AboutMe