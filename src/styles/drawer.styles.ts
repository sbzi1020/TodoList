import { makeStyles } from '@material-ui/core'

export const generateStyles = makeStyles({
    menuIcon: {
        marginLeft: '0.5rem',
        fontSize: '2rem',
    },
    drawer: {
        width: '2rem',
    },
    listContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        margin: '1rem',
        '& div': {
            fontSize: '1rem',
            marginBottom: '0.5rem',
        },
    },
    list: {
        '& div': {
            '&:hover': {
                cusor: 'pointer',
                
            backgroundColor: 'grey',
            }
        },

    }
})
