import React, { useState, useEffect, useRef } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AlarmIcon from '@material-ui/icons/AccessAlarm';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import { generateStyles } from '../styles//alarm.styles'
/**
 * @export
 * @interface AlarmProps
 */
export interface AlarmProps {
    classes?: any
}

/**
 * 
 * @param {Alarm}Props props 
 */
const Alarm = (props: AlarmProps) => {

    const classes = generateStyles()
    const [open, setOpen] = useState(false)
    const [selectDate, setSelectDate] = useState(new Date().toISOString())

    const timeRef = useRef(null)

    useEffect(() => {

    }, [])

    const handleOk = () => {
        setOpen(false)
        // Save the time
        //console.log(`${timeRef.current ? (timeRef.current as any).value : ''}`)
        setSelectDate((timeRef.current as any).value)
    }

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClickClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <AlarmIcon
                onClick={handleClickOpen}
                className={classes.alarm}
            />
            <Dialog
                open={open}
                onClose={handleClickClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">Set Alarm</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Select the time
                    </DialogContentText>
                    <form className={classes.container} noValidate>
                        <TextField
                            inputRef={timeRef}
                            id="datetime-local"
                            type="datetime-local"
                            defaultValue={selectDate}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleOk}
                        color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>)
}

export default React.memo(Alarm)
