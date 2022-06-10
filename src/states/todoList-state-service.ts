import { BehaviorSubject } from 'rxjs'
import { TodoItem, TodoList } from '../types/types'
import { ToDoListUtil } from '../utils/todo_list_util'

let latestId = 0

export interface TodoListState {
    list: TodoList
    searchList: TodoList
    searchKeyword: string
}

const initState: TodoListState = {
    list: [],
    searchList: [],
    searchKeyword: '',
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

    reload: (newList: TodoList) => {
        emitNextState({
            ...stateSource.value,
            list: newList
        })
    },

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
            // if (typeof addResult.data === "string") {
            //     newItem.docId = addResult.data
            // }
            // // update state
            // const newList = [
            //     ...stateSource.value.list,
            //     {
            //         ...newItem,
            //         // id: genernateId(),
            //     }
            // ]

            // emitNextState({
            //     ...stateSource.value,
            //     list: newList
            // })

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
            emitNextState({
                ...stateSource.value,
                list: newList
            })
        }
    },

    //
    //
    //
    deleteItem: (item: TodoItem) => {
        emitNextState({
            ...stateSource.value,
            list: stateSource.value.list.filter(tempItem => tempItem.docId !== item.docId)
        })
    },

    searchItem: (searchKeyword: string) => {
        const newState = {
            // Copy the latest state that includs the orginal `list`
            ...stateSource.value,
            searchList: stateSource.value.list.filter(tempItem => tempItem.text.toLowerCase().indexOf(searchKeyword.toLowerCase()) != -1),
            searchKeyword,
        }

        console.log(`newState: ${JSON.stringify(newState, null, 4)}`)

        emitNextState(newState)
    }
})
