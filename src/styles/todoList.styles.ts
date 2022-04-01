import  {makeStyles} from '@material-ui/core'

export const generateStyles = makeStyles({
    listContainer: {
        '& input': {
            padding: '0.5rem',
            marginBottom: '0.5rem',
        }
    },
    renderList: {
        flex: 1,
        margin: '2rem 0',
    }
})
