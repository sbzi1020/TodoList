import React, { useState, useEffect, useRef } from 'react'
import TodoItemComponent from './TodoItem'
import { TodoItem } from '../types/types'
import LayoutStyles from '../styles/layout.module.css'
import { generateStyles } from '../styles/todoList.styles'
import { TodoListStateService } from '../states/todoList-state-service'
import { ToDoListUtil } from '../utils/todo_list_util'

const TodoList = () => {
    const classes = generateStyles()
    const [uiState, setUiState] = useState(TodoListStateService.getLatest())
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef(null)

    // Subscription
    useEffect(() => {
        let subscription = TodoListStateService.$state.subscribe(
            latestate => {
                setUiState(latestate)
                // console.log(`latestState: ${JSON.stringify(latestate, null, 4)}`)
            }
        )
        return () => subscription.unsubscribe()
    }, [])

    //
    const onAddItem = async () => {
        const newItem: TodoItem = {
            docId: '',
            id: '',
            text: inputValue,
            isFinished: false,
        }

        // Save to backend
        const addResult = await ToDoListUtil.addToDoItem(newItem)

        if (addResult.success === true) {
            if (typeof addResult.data === "string") {
                newItem.docId = addResult.data
            }

            TodoListStateService.addItem(newItem, () => {
                if (inputRef.current) {
                    (inputRef.current as any).value = ''
                }
            })
        }
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
                    onDeletedClick={onDeletedClick}
                />
            ))
        )
    }
    const onDeletedClick = (item: TodoItem) => {
        TodoListStateService.deleteItem(item)
    }
    const onKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            onAddItem()
        }
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
            <div className={`${LayoutStyles.hBoxContainer} ${classes.addContainer}`}>
                <input
                    type="text"
                    onChange={e => setInputValue(e.target.value.trim())}
                    placeholder='Things to do...'
                    ref={inputRef}
                    onKeyDown={onKeyDown}
                />
                <button onClick={onAddItem}>Add</button>
            </div>
        </div>)
}

export default React.memo(TodoList)
