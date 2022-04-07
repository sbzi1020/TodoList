import { alpha, makeStyles } from '@material-ui/core'

export const generateStyles = makeStyles((theme) => ({
    infoContainer: {
        margin: '2rem 0',
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
    },
    count: {
        '& span': {
            fontSize: '2rem',
            margin: '0 1rem',
        },

        '& div': {
            fontSize: '3rem',
            verticalAlign: 'text-bottom',
            height: '3rem',
        },
        display:'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    search: {
        display: 'flex',
        flexDirection: 'row',
        height: '2rem',
        borderBottom: '1px solid grey',
        position: 'relative',
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.35),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('xs')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        color: 'grey',
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        paddingLeft: '2rem',
        alignItems: 'flex-end',
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.down('md')]: {
            width: '12ch',
            '&:focus': {
                width: '18ch',
            },
        },

        [theme.breakpoints.up('md')]: {
            width: 'auto',
            '&:focus': {
                width: '30ch',
            },
        },
    },
}))
