import { TodoItem, TodoList } from '../types/types'
import { LogUtil, LogTheme } from './log_util'

const axios = require('axios').default

const LOG_NAME = `ToDoListUtil`

interface AddToDoItemResponse {
    success: boolean
    error?: string
    data?: any
}

//
//
//
const addToDoItem = async (item: TodoItem): Promise<AddToDoItemResponse> => {
    const request = {
        method: 'post',
        url: `http://localhost:5001/todolist-3f2c7/australia-southeast1/addToDoItem`,
        data: item
    }

    const result: AddToDoItemResponse = { success: false }

    try {
        const response = await axios(request)
        LogUtil.debug(
            LOG_NAME,
            `addToDoItem`,
            `response: ${JSON.stringify(response, null, 4)}`,
            LogTheme.TESTING,
        )

        if (response.data !== undefined) {
            const resp = response.data as AddToDoItemResponse
            result.success = resp.success

            if (result.success !== true) {
                result.error = `Add to do item fail.`
            }
        }
    } catch (error) {
        result.error = (error as any).message
            ? (error as any).message
            : JSON.stringify(error, null, 4)

        LogUtil.debug(
            LOG_NAME,
            `addToDoItem`,
            `error: ${result.error}`,
            LogTheme.ERROR
        )
    }

    return result
}

//
//
//
export const ToDoListUtil = {
    addToDoItem,
}
