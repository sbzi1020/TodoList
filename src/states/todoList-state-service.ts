import { BehaviorSubject } from 'rxjs'
import { TodoItem, TodoList } from '../types/types'

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
const genernateId = (item: TodoItem) => {
    const numberString = item.id.padStart(4, '#00')
    return numberString
}

export const TodoListStateService = ({
    $state: stateSource.asObservable(),
    getLatest: (): TodoListState => latestState,
    addItem: (item: TodoItem) => {
        const newList = [
            ...stateSource.value.list,
            {
                ...item,
                id: genernateId(item),
            }
        ]
        emitNextState({ list: newList })
    },
    updateItem: (item: TodoItem) => {
        const newList = stateSource.value.list.map((tempItem) => {
            if (tempItem.id === item.id) {
                return item
            } else { return tempItem }
        })
        emitNextState({ list: newList })
    },
    deleteItem: (item: TodoItem) => {
        emitNextState({
            list: stateSource.value.list.filter(tempItem => tempItem.id !== item.id)
        })
    }
})
