export interface TodoItem {
    id: string,
    text: string,
    isFinished: boolean,
}

export type TodoList = Array<TodoItem>
