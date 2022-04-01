import { makeStyles } from '@material-ui/core'

export const generateStyles = makeStyles({
    itemContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
    },
    deleteItem: {
        alignSelf: 'flex-end',
        position: 'absolute',
        right: '1rem',
        width: 10,
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
            backgroundColor:  '#ea4c88',
        }
    },
    text: {
        fontSize: '1rem',
    },
    checkedText: {
        opacity: '0.4',
        fontSize: '1rem',
    }
})
