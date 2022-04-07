import { BehaviorSubject } from 'rxjs'
import { TodoItem, TodoList } from '../types/types'
import { ToDoListUtil } from '../utils/todo_list_util'

let latestId = 0

export interface TodoListState {
    // list: TodoList
    list: Array<{
        docId: string
        id: string
        text: string
        isFinished: boolean
        alarmTime: string
    }>
}

const initState: TodoListState = {
    list: []
}

const stateSource: BehaviorSubject<TodoListState> = new BehaviorSubject(initState)

let latestState: TodoListState = initState

const emitNextState = (nextState: TodoListState) => {
    latestState = nextState
    stateSource.next(latestState)
}
const genernateId = () => {
    latestId += 1
    const numberString = latestId.toString().padStart(4, '#00')
    return numberString
}

export const TodoListStateService = ({
    $state: stateSource.asObservable(),

    getLatest: (): TodoListState => latestState,

    addItem: async (itemText: string, callback: any) => {
        const newItem: TodoItem = {
            docId: '',
            id: '',
            text: itemText,
            isFinished: false,
            alarmTime: '',
        }

        // Save to backend
        const addResult = await ToDoListUtil.addToDoItem(newItem)
        if (addResult.success === true) {
            if (typeof addResult.data === "string") {
                newItem.docId = addResult.data
            }
            // update state
            const newList = [
                ...stateSource.value.list,
                {
                    ...newItem,
                    id: genernateId(),
                }
            ]

            emitNextState({ list: newList })
            if (callback) { callback() }
        }
    },

    //
    //
    //
    updateItem: async (item: TodoItem) => {
        const updateResult = await ToDoListUtil.updateToDoItem(item)

        if (updateResult.success === true) {
            const newList = stateSource.value.list.map((tempItem) => {
                if (tempItem.docId === item.docId) {
                    return item
                } else { return tempItem }
            })
            emitNextState({ list: newList })
        }
    },

    //
    //
    //
    deleteItem: (item: TodoItem) => {
        emitNextState({
            list: stateSource.value.list.filter(tempItem => tempItem.docId !== item.docId)
        })
    },
    searchItem: (item: TodoItem) => {
        emitNextState({
            list: stateSource.value.list.filter(tempItem => tempItem.text !== item.text)
        })
    }

})
