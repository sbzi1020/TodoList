export interface TodoItem {
    docId: string
    id: string
    text: string
    isFinished: boolean
}

export type TodoList = Array<TodoItem>
