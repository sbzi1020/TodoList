import { makeStyles } from '@material-ui/core'

export const generateStyles = makeStyles({
    topbarContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',

        backgroundColor: 'pink',
        height: '3rem',
        width: '100%',
        position: 'fixed',
        top: 0,
        zIndex: 2,
    },
    menuIcon: {
        marginLeft: '0.5rem',
        fontSize: '2rem',
    },
    faceIcon: {
        marginRight: '0.5rem',
        fontSize: '2rem',
    },
})
