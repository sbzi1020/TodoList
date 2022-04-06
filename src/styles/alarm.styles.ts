import { makeStyles } from '@material-ui/core'

export const generateStyles = makeStyles({
    container: {
        border: '1px solid red',

    },
    textField: {
        border: '1px solid blue',
    },

    alarm: {
        width: '2rem',
        //position: 'absolute',
        //right: '4rem',
        color: '#a7a7a7',
        cursor: 'pointer',
        "&:hover": {
            color: '#ea4c88',
        },
        '& svg': {
            width: '1.2rem',
        }
    },
    alarmWithColor: {
        width: '2rem',
        color: '#ea4c88',
    }

})
