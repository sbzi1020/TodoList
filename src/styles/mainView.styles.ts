import  {makeStyles} from '@material-ui/core'
import { relative } from 'path'

export const generateStyles = makeStyles({
    container: {
        boxSizing: 'border-box',
    },
    mainView: {
        height: '100%',
    },
    topbar: {
        backgroundColor: 'pink',
        height: '3rem',
        width: '100%',
        position: 'fixed',
        top: 0,
        zIndex: 2,
    }
})
