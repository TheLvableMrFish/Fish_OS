import Calculator from "../Apps/Calculator"
import Background from "../Apps/Background"

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
        col: 0
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
    }
]