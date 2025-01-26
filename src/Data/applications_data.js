import Calculator from "../Apps/Calculator"
import Background from "../Apps/Background"
import Paint from "../Apps/Paint"
import Folder from "../Apps/Folder"
import Notes from "../Apps/Notes"

export const application_data = [
    {
        id: 1,
        title: 'My Computer',
        img: 'my_computer',
        row: 0,
        col: 0
    },
    {
        id: 2,
        title: 'Folder',
        img: 'clam_color',
        row: 2,
        col: 0,
        app: <Folder />,
        width: 550,
        height: 350

    },
    {
        id: 3,
        title: 'Fish',
        img: 'clown_color',
        row: 1,
        col: 1
    },
    {
        id: 4,
        title: 'Recycle',
        img: 'recycle_color',
        row: 1,
        col: 0
    },
    {
        id: 5,
        title: 'Calculator',
        img: 'crab_color',
        row: 1,
        col: 2,
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
        height: 500
    },
    {
        id: 8,
        title: 'Notes',
        img: 'manta_ray',
        row: 3,
        col: 0,
        app: <Notes />,
        width: 400,
        height: 500,
    }
]