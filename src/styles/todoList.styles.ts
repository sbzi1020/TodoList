import { makeStyles } from '@material-ui/core'

export const generateStyles = makeStyles({
    listContainer: {
    },
    renderList: {
        flex: 1,
        margin: '2rem 0',
    },
    addContainer: {
        '& input': {
            padding: '0.5rem',
            border: '1px solid pink',
            borderRadius: 'none',
        },

        '& input:focus': {
            outlineColor: '#ea4c88',
            borderRadius: 'none',
        },
        '& button': {
            backgroundColor: '#ea4c88',
            border: 'none',
        },
        '& button:hover': {
            cursor: 'pointer',
            border: 'none',
        },
        marginBottom: '0.5rem',
    }
})
