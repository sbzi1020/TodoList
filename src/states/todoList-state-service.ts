import { BehaviorSubject } from 'rxjs'
import { TodoItem, TodoList } from '../types/types'

let latestId = 0

export interface TodoListState {
    list: TodoList
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

    addItem: (item: TodoItem, callback: any) => {
        const newList = [
            ...stateSource.value.list,
            {
                ...item,
                id: genernateId(),
            }
        ]
        emitNextState({ list: newList })
        if (callback) {callback()}
    },

    updateItem: (item: TodoItem) => {
        const newList = stateSource.value.list.map((tempItem) => {
            if (tempItem.docId === item.docId) {
                return item
            } else { return tempItem }
        })
        emitNextState({ list: newList })
    },

    deleteItem: (item: TodoItem) => {
        emitNextState({
            list: stateSource.value.list.filter(tempItem => tempItem.docId !== item.docId)
        })
    }
})
