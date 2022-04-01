import  {makeStyles} from '@material-ui/core'
import { relative } from 'path'

export const generateStyles = makeStyles({
    container: {
        height: '100%',
        alignItems: 'center',
    },
    mainView: {
        border: '1px solid blue',
        justifyContent: 'center',
        width: '16rem',
        marginTop: '5rem',
        alignItems: 'stretch',
    },
    topbar: {
        backgroundColor: 'pink',
        height: '2rem',
    }
})
