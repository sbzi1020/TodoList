import React from 'react'
import TodoList from './TodoList';
import Topbar from './Topbar'
import LayoutStyles from '../styles/layout.module.css'
import { generateStyles } from '../styles/mainView.styles'

/**
 * @export
 * @interface MainViewProps
 */
export interface MainViewProps {
    classes?: any
}

/**
 * 
 * @param {MainViewProps} props 
 */
const MainView = (props: MainViewProps) => {
    const classes = generateStyles()
    return (
        <div className={`${LayoutStyles.vBoxContainer} ${classes.container}`}>
            <div className={`${LayoutStyles.vBoxContainer} ${classes.mainView}`}>
                <Topbar />
                <TodoList />
            </div>
        </div>
    )
}

export default React.memo(MainView)
