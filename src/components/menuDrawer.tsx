import React, { useState } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { generateStyles } from '../styles/drawer.styles'
import MenuIcon from '@material-ui/icons/Menu';

const MenuDrawer = () => {
    const classes = generateStyles()
    const [open, setOpen] = useState(false)

    const toggleDrawer = () => {
        // if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        //     return;
        // }
        setOpen(!open)
    }
    const list = () => {
        return (
            <div
                role="presentation"
                onClick={toggleDrawer}
                onKeyDown={toggleDrawer}
                className={`${classes.listContainer}`}
            >

                    <div>Subject</div>

                <Divider style={{ 'width': '10rem' }} />
                <List

                className={`${classes.list}`}
                >
                    <div>1</div>
                    <div>1</div>
                </List>

            </div>
        )
    }
    return (
        <div>
            <MenuIcon
                className={`${classes.menuIcon}`}
                onClick={toggleDrawer}
            />
            <Drawer
                anchor='left'
                open={open}
                onClose={toggleDrawer}
                className={`${classes.drawer}`}
            >
                {list()}
            </Drawer>
        </div>
    );
}

export default React.memo(MenuDrawer)
