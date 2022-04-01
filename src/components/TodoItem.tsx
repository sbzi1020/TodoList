import React, {useState} from 'react'
import { TodoItem } from '../types/types'
import LayoutStyles from '../styles/layout.module.css'
import { generateStyles } from '../styles//todoItem.styles'
import Checkbox from '@material-ui/core/Checkbox'
import DeleteIcon from '@material-ui/icons/Delete'
import clsx from 'clsx'
/**
 * @export
 * @interface TodoItemProps
 */
export interface TodoItemProps {
    item: TodoItem,
    onCheckboxClick: (item: TodoItem) => void
}

/**
 * 
 * @param {TodoItemProps} props 
 */

const TodoItemComponent = (props: TodoItemProps) => {
    const classes = generateStyles()

    return (
        <div className={`${LayoutStyles.hBoxContainer} ${classes.itemContainer}`}>
            <input
                type='checkbox'
                checked={props.item.isFinished}
                onClick={() => props.onCheckboxClick(props.item)}

            />
            <div 
                className={props.item.isFinished ? `${classes.checkedText}`: `${classes.text}`}>
                {props.item.text}
            </div>
            <div className={classes.deleteItem}>
                <DeleteIcon />
            </div>
        </div>
    )
}


export default React.memo(TodoItemComponent)
