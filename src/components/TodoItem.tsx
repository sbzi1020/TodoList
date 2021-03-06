import React, { useState } from 'react'
import { TodoItem } from '../types/types'
import LayoutStyles from '../styles/layout.module.css'
import { generateStyles } from '../styles//todoItem.styles'
import Checkbox from '@material-ui/core/Checkbox'
import DeleteIcon from '@material-ui/icons/Delete'
import clsx from 'clsx'
import AlarmComponent from './alarm'
/**
 * @export
 * @interface TodoItemProps
 */
export interface TodoItemProps {
    item: TodoItem,
    onCheckboxClick: (item: TodoItem) => void
    onDeletedClick: (item: TodoItem) => void
    onAlarmTimeChange: (item: TodoItem) => void
}

/**
 * 
 * @param {TodoItemProps} props 
 */

const TodoItemComponent = (props: TodoItemProps) => {
    const classes = generateStyles()
    return (
        <div className={`${classes.itemContainer}`}>
            <Checkbox
                checked={props.item.isFinished}
                onClick={() => props.onCheckboxClick(props.item)}
                disableRipple
                inputProps={{ 'aria-label': 'primary checkbox' }}
                icon={<span className={classes.icon} />}
                checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}

            />
            <div
                className={props.item.isFinished ? `${classes.checkedText}` : `${classes.text}`}
            >
                {`${props.item.id}`}
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                {`${props.item.text}`}
            </div>
            <AlarmComponent item={props.item} />
            <div className={classes.deleteItem}>
                <DeleteIcon
                    onClick={() => props.onDeletedClick(props.item)}
                />
            </div>

        </div>
    )
}


export default React.memo(TodoItemComponent)
