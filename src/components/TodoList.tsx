import React, { useState, useEffect } from 'react'
import TodoItemComponent from './TodoItem'
import { TodoItem } from '../types/types'
import LayoutStyles from '../styles/layout.module.css'
import {generateStyles} from '../styles/todoList.styles'
import {TodoListStateService} from '../states/todoList-state-service'

/**
 * @export
 * @interface TodoListProps
 */
export interface TodoListProps {
}

/**
 * 
 * @param {TodoList}Props props 
 */
const TodoList = (props: TodoListProps) => {
    const classes = generateStyles()
    const [state, setState] = useState()

    useEffect(() => {

    }, [])

    return (
        <div className={`${LayoutStyles.vBoxContainer} ${classes.listContainer}`}>
            <div>
                {/* ItemCounter */}
                {/* SearchBar */}
            </div>
            {/* List Item */}
            <TodoItemComponent />
            {/* Add Section */}
            <div>
                <input type="text" />
                <button >Add</button>
            </div>
        </div>)
}

export default React.memo(TodoList)
