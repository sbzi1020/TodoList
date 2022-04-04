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
import { TodoListStateService } from '../states/todoList-state-service'
import { TodoItem } from '../types/types'

/**
 * @export
 * @interface AlarmProps
 */
export interface AlarmProps {
    item: TodoItem
}

const isvalidAlarmTime = (alarmTimeIsoString: string): boolean => {
    return Boolean(alarmTimeIsoString && alarmTimeIsoString.trim() !== '')
}

const Alarm = (props: AlarmProps) => {


    const classes = generateStyles()
    const [open, setOpen] = useState(false)

    const [selectDate, setSelectDate] = useState(
        isvalidAlarmTime(props.item.alarmTime) ? props.item.alarmTime.trim() :
            new Date().toISOString()
    )

    const [hasValidAlarmTime, setHasValidAlarmTime] = useState(isvalidAlarmTime(props.item.alarmTime) ? true : false)

    const timeRef = useRef(null)

    const handleOk = () => {
        // Close the dialog
        setOpen(false)

        // Save the time back to uiState
        //console.log(`${timeRef.current ? (timeRef.current as any).value : ''}`)
        setSelectDate((timeRef.current as any).value)

        // Update item (with the updated `alarmTime`)
        TodoListStateService.updateItem({
            ...props.item,
            alarmTime: (timeRef.current as any).value
        })
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
                className={
                    hasValidAlarmTime === true ?
                        classes.alarmWithColor :
                        classes.alarm
                }
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
