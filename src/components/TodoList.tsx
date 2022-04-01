import React, { useState, useEffect } from 'react'
import TodoItemComponent from './TodoItem'
import { TodoItem } from '../types/types'
import LayoutStyles from '../styles/layout.module.css'
import { generateStyles } from '../styles/todoList.styles'
import { TodoListStateService } from '../states/todoList-state-service'

const TodoList = () => {
    const classes = generateStyles()
    const [uiState, setUiState] = useState(TodoListStateService.getLatest())
    const [inputValue, setInputValue] = useState('')

    // Subscription
    useEffect(() => {
        let subscription = TodoListStateService.$state.subscribe(
            latestate => setUiState(latestate)
        )
        return () => subscription.unsubscribe()
    }, [])
    const onAddItem = () => {
        TodoListStateService.addItem({
            id: (new Date()).getTime().toString(),
            text: inputValue,
            isFinished: false,
        })
    }
    const onCheckboClick = (item: TodoItem) => {
        const checkItem = {
            ...item,
            isFinished: !item.isFinished,
        }
        TodoListStateService.updateItem(checkItem)
    }

    const renderList = () => {
        return (
            uiState.list.map((item, index) => (
            <TodoItemComponent
                key={index}
                item={item}
                onCheckboxClick={onCheckboClick}
            />
            ))
        )
    }

    return (
        <div className={`${LayoutStyles.vBoxContainer} ${classes.listContainer}`}>
            <div>
                {/* ItemCounter */}
                {/* SearchBar */}
            </div>
            {/* List Item */}
        <div className={`${classes.renderList}`}>
            {renderList()}
            </div>
            {/* Add Section */}
            <div>
                <input type="text" onChange={e => setInputValue(e.target.value.trim())}/>
                <button onClick={onAddItem}>Add</button>
            </div>
        </div>)
}

export default React.memo(TodoList)
