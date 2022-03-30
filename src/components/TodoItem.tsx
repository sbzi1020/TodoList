import React from 'react'
import { TodoItem } from '../types/types'
import LayoutStyles from '../styles/layout.module.css'
import { generateStyles } from '../styles//todoItem.styles'
/**
 * @export
 * @interface TodoItemProps
 */
export interface TodoItemProps {
    classes?: any
}

/**
 * 
 * @param {TodoItemProps} props 
 */
const TodoItemComponent = (props: TodoItemProps) => {
    const classes = generateStyles()
    return (
        <div className={`${LayoutStyles.vBoxContainer} ${classes.itemContainer}`}>
            <div>checkbox</div>
            <div>Text</div>
            <div>delete</div>
        </div>)
}

export default React.memo(TodoItemComponent)
