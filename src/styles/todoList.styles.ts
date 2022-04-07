import { makeStyles } from '@material-ui/core'

export const generateStyles = makeStyles({
    listContainer: {
        marginTop: '2rem',
        overflowY: 'scroll',
    },
    renderList: {
        marginTop: '1rem',
        flex: 1,
    },

    infoContainer: {
        flexDirection:'row',
        marginTop: '2rem',
    },
    addContainer: {
        '& input': {
            padding: '0.5rem',
            border: '1px solid pink',
            borderRadius: 'none',
            width: '15rem',
        },

        '& input:focus': {
            outlineColor: '#ea4c88',
            borderRadius: 'none',
        },
        '& button': {
            backgroundColor: '#ea4c88',
            color: 'white',
            border: 'none',
        },
        '& button:hover': {
            cursor: 'pointer',
            border: 'none',
        },
        justifyContent: 'center',
        margin: '1rem 2rem',
        position: 'fixed',
        bottom: 0,
        right: 0,
        zIndex: 1,
    }
})
