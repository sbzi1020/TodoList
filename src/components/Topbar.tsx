import React, { useState, useEffect } from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import FaceIcon from '@material-ui/icons/Face';
import LayoutStyles from '../styles/layout.module.css'
import { generateStyles } from '../styles/topbar.styles'
import Menu from './menuDrawer'

export interface TopBarProps {
}

const TopBar = (props: TopBarProps) => {
    const classes = generateStyles()
    const [state, setState] = useState()

    useEffect(() => {

    }, [])

    return (

        <div className={`${LayoutStyles.hBoxContainer} ${classes.topbarContainer}`}>
            {/* menu icon */}
            <Menu />
            {/* 

            <MenuIcon
                className={`${classes.menuIcon}`}
            />
*/}
            {/* Subject name */}
            <div>
                Subject Name
            </div>
            {/* userpage */}
            <FaceIcon
                className={`${classes.faceIcon}`}
            />
        </div>)
}

export default React.memo(TopBar)
