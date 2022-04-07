import React, { useState, useEffect, useRef } from 'react'
import TodoItemComponent from './TodoItem'
import { TodoItem } from '../types/types'
import LayoutStyles from '../styles/layout.module.css'
import { generateStyles } from '../styles/todoList.styles'
import { TodoListStateService } from '../states/todoList-state-service'
import AddIcon from '@material-ui/icons/Add';
import Info from './info'

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
        await TodoListStateService.addItem(inputValue, () => {
            if (inputRef.current) {
                (inputRef.current as any).value = ''
            }
        })
    }
    const onCheckboClick = (item: TodoItem) => {
        const checkItem = {
            ...item,
            isFinished: !item.isFinished,
        }
        TodoListStateService.updateItem(checkItem)
    }

    const onAlarmTimeChange = (item: TodoItem) => {
        const alarmUpdatedItem = {
            ...item,
            alarmTime: item.alarmTime
        }
        TodoListStateService.updateItem(alarmUpdatedItem)
    }

    //
    const renderList = () => {
        return (
            uiState.list.map((item, index) => (
                <TodoItemComponent
                    key={index}
                    item={item}
                    onCheckboxClick={onCheckboClick}
                    onDeletedClick={onDeletedClick}
                    onAlarmTimeChange={onAlarmTimeChange}
                />
            ))
        )
    }
    //
    const onDeletedClick = (item: TodoItem) => {
        TodoListStateService.deleteItem(item)
    }
    const onKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            onAddItem()
        }
    }
    //


    return (
        <div className={`${LayoutStyles.vBoxContainer} ${classes.listContainer}`}>
            {/* ItemCounter */}
            {/* SearchBar */}
            <Info item={item}/>
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
                <button onClick={onAddItem}>
                    <AddIcon />
                </button>
            </div>
        </div>)
}

export default React.memo(TodoList)
