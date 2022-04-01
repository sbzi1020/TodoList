import  {makeStyles} from '@material-ui/core'
import { relative } from 'path'

export const generateStyles = makeStyles({
    container: {
        height: '100%',
    },
    mainView: {
        border: '1px solid blue',
        alignItems: 'center',
    },
    topbar: {
        backgroundColor: 'pink',
    }
})
