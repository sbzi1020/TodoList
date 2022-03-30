import React, { useState, useEffect } from 'react'

/**
 * @export
 * @interface TopBarProps
 */
export interface TopBarProps {
    classes?: any
}

/**
 * 
 * @param {TopBar}Props props 
 */
const TopBar = (props: TopBarProps) => {
    const { classes } = props

    const [state, setState] = useState()

    useEffect(() => {

    }, [])

    return (<div>
        {/* menu icon */}
        {/* Subject name */}
        {/* userpage */}
        Topbar
    </div>)
}

export default React.memo(TopBar)
