import React, { useState, useEffect, useRef } from 'react'
import TodoItemComponent from './TodoItem'
import { TodoItem } from '../types/types'
import LayoutStyles from '../styles/layout.module.css'
import { generateStyles } from '../styles/todoList.styles'
import { TodoListStateService } from '../states/todoList-state-service'
import AddIcon from '@material-ui/icons/Add';
import Info from './info'
import { FirebaseClientUtil } from '../utils/firebase_util'

const TodoList = () => {
    let queryUnsubscriber: any = null

    const classes = generateStyles()
    const [uiState, setUiState] = useState(TodoListStateService.getLatest())
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef(null)

    // Subscription
    useEffect(() => {
        FirebaseClientUtil.queryToDoList()
            .then(unsubscriber => {
                queryUnsubscriber = unsubscriber
            })
            .catch(err => console.log(`Error happen: `, err))

        let subscription = TodoListStateService.$state.subscribe(
            latestate => {
                setUiState(latestate)
                // console.log(`latestState: ${JSON.stringify(latestate, null, 4)}`)
            }
        )
        return () => {
            subscription.unsubscribe()

            if (queryUnsubscriber !== null) {
                queryUnsubscriber()
            }
        }
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
        const isInSearchMode = uiState.searchKeyword.trim() !== ''
        console.log(`isInSearchMode: ${isInSearchMode}`)

        return isInSearchMode ? (
            uiState.searchList.map((item, index) => (
                <TodoItemComponent
                    key={index}
                    item={item}
                    onCheckboxClick={onCheckboClick}
                    onDeletedClick={onDeletedClick}
                    onAlarmTimeChange={onAlarmTimeChange}
                />
            ))
        ) : (
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
    const checkedTotal = () => {
        const checkedNumber = uiState.list.filter(item => {
            return item.isFinished == true
        }).length

        return checkedNumber
    }
    return (
        <div className={`${LayoutStyles.vBoxContainer} ${classes.listContainer}`}>
            {/* ItemCounter */}
            {/* SearchBar */}
            <Info
                total={uiState.list.length}
                checkedTotal={checkedTotal()}
            />
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
