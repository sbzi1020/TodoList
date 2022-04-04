export interface TodoItem {
    docId: string
    id: string
    text: string
    isFinished: boolean
    alarmTime: string
}

export type TodoList = Array<TodoItem>
