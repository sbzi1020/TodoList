import { makeStyles } from '@material-ui/core'

export const generateStyles = makeStyles({
    itemContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
        padding: '0.4rem',
        fontSize: '1rem',
        '&:hover': {
            backgroundColor: 'rgba(240, 240, 240, 0.5)',
        }
    },
    deleteItem: {
        width: '2rem',
        //right: '1rem',
        color: '#a7a7a7',
        cursor: 'pointer',
        "&:hover": {
            color: '#ea4c88',
        },
        '& svg': {
        width: '1.2rem',
        }
    },
    alarmIcon: {
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
    icon: {
        borderRadius: 6,
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#ebf1f5',
    },

    checkedIcon: {
        backgroundColor: '#ea4c88',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage:
                "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
                " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
                "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#ea4c88',
        }
    },
    //     'input:hover ~ &': {
    //         backgroundColor:  '#ea4c88',
    //     }
    // },
    text: {
        flex: 1,
        textAlign: 'left',
        marginLeft: '0.5rem',
        overflow: 'hidden',
    },
    checkedText: {
        flex: 1,
        textAlign: 'left',
        opacity: '0.4',
        marginLeft: '0.5rem',
        textDecoration: 'line-through',
    }
})
