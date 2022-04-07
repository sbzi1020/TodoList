import React, { useState, useEffect } from 'react'
import LayoutStyles from '../styles/layout.module.css'
import { generateStyles } from '../styles/info.styles'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { TodoItem } from '../types/types'
import { TodoListStateService } from '../states/todoList-state-service'
/**
 * @export
 * @interface InfoProps
 */
export interface InfoProps {
    item: TodoItem
}

/**
 * 
 * @param {Info}Props props 
 */
const Info = (props: InfoProps) => {

    const classes = generateStyles()
    const [state, setState] = useState()

    useEffect(() => {

    }, [])
    const onSearchChange = (item: TodoItem) => {
        TodoListStateService.searchItem(item)
    }
    return (
        <div className={`${LayoutStyles.hBoxContainer} ${classes.infoContainer}`}>
            <div className={classes.count}>
                <div>29</div>
                <span>/</span>
                Total
            </div>
            <div
                className={classes.search}
                onChange={(e:any) => onSearchChange(props.item)}
            >
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                />
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
            </div>
        </div>
    )
}

export default React.memo(Info)
