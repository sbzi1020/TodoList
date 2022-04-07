import React, { useState, useEffect, useRef } from 'react'
import LayoutStyles from '../styles/layout.module.css'
import { generateStyles } from '../styles/info.styles'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { TodoListStateService } from '../states/todoList-state-service'
/**
 * @export
 * @interface InfoProps
 */
export interface InfoProps {
    total: number
    checkedTotal: number
}

/**
 * 
 * @param {Info}Props props 
 */
const Info = (props: InfoProps) => {

    const classes = generateStyles()

    //
    const onSearchChange = (keyword: string) => {
        console.log(`${keyword}`)
        TodoListStateService.searchItem(keyword)
    }

    return (
        <div className={`${LayoutStyles.hBoxContainer} ${classes.infoContainer}`}>
            <div
                className={classes.count}
            >
                <div>
                    {props.checkedTotal}
                </div>
                <span>/</span>
                {props.total}
            </div>
            <div
                className={classes.search}
            >
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e: any) => onSearchChange(
                        e.target.value
                    )}
                />
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
            </div>
        </div>
    )
}

export default React.memo(Info)
