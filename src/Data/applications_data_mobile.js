import Calculator from "../Apps/Calculator"
import Background from "../Apps/Background"
import Paint from "../Apps/Paint"
import Folder from "../Apps/Folder"
import Notes from "../Apps/Notes"
import Recycle from "../Apps/Recycle"
import AboutMe from "../Apps/AboutMe"
import MyProjects from "../Apps/MyProjects"

export const application_data = [
    {
        id: 1,
        title: 'Projects',
        img: 'my_computer',
        row: 0,
        col: 0,
        app: <MyProjects />,
        width: 500,
        height: 400,
    },
    {
        id: 2,
        title: 'Folder',
        img: 'clam_color',
        row: 3,
        col: 0,
        app: <Folder />,
        width: 550,
        height: 350

    },
    {
        id: 3,
        title: 'About Me',
        img: 'clown_color',
        row: 1,
        col: 1,
        app: <AboutMe />,
        width: 520,
        height: 420
    },
    {
        id: 4,
        title: 'Recycle',
        img: 'recycle_color',
        row: 1,
        col: 0,
        app: <Recycle />,
        width: 400,
        height: 300
    },
    {
        id: 5,
        title: 'Calculator',
        img: 'crab_color',
        row: 2,
        col: 0,
        app: <Calculator />,
        width: 200,
        height: 265
    },
    {
        id: 6,
        title: 'Background',
        img: 'star_fish',
        row: 0,
        col: 1,
        app: <Background />,
        width: 500,
        height: 400
    },
    {
        id: 7,
        title: 'Paint',
        img: 'squid_color',
        row: 2,
        col: 1,
        app: <Paint />,
        width: 650,
        height: 455
    },
    {
        id: 8,
        title: 'Notes',
        img: 'manta_ray',
        row: 4,
        col: 0,
        app: <Notes />,
        width: 400,
        height: 500,
    }
]