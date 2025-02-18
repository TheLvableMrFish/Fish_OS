import React, { useEffect, useState } from 'react'

import my_projects_css from './AppsCSS/my_projects_css.css'

import { my_project_data } from '../Data/projects'

const MyProjects =({})=>{


    return(
        <>
        <div className='about-me-box container-fluid'>
            <div className='row'>
                {my_project_data.map((project, index)=>(
                    <div className='my-project-item col-6'>
                        <h6 className='my-project-title'>{project.title}</h6>
                        <img className='my-project-img img-fluid' src={`./projects/${project.img}.png`} />
                        <div className='my-project-btns row'>
                        <a className='my-project-code my-project-btn' href=''>Code</a>
                        <a className='my-project-live my-project-btn' href=''>Live</a>
                        </div>
                    </div>
                ))
                }
                
            </div>
            
        </div>
        </>
    )
}

export default MyProjects