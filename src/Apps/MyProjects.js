import React, { useEffect, useState } from 'react'

import my_projects_css from './AppsCSS/my_projects_css.css'

import { my_project_data } from '../Data/projects'

const MyProjects =({})=>{


    return(
        <>
        <div className='about-me-box my-project-scrollable-container container-fluid'>
            <div className='row'>
                {my_project_data.map((project, index)=>(
                    <div className='my-project-item col-6'>
                        <h6 className='my-project-title'>{project.title}</h6>
                        <img className='my-project-img img-fluid' src={`./projects/${project.img}.png`} />
                        <div className='my-project-btns row'>

                        {}
                        <a 
                            className={`my-project-code my-project-btn ${project.code_link === 'n/a' ? 'my-project-not-active' : ''}`} 
                            target='_blank'
                            href={project.code_link != 'n/a' ? project.code_link : '#'}
                        >Code</a>
                        <a 
                            className={`my-project-live my-project-btn ${project.host_link === 'n/a' ? 'my-project-not-active' : ''}`} 
                            target='_blank'
                            href={project.host_link != 'n/a' ? project.host_link : '#'}
                        >Live</a>

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