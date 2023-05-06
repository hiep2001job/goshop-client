import { AppBar, Switch, Toolbar, Typography } from '@mui/material'
import React from 'react'

interface Props{
    darkMode:boolean;
    handleThemeChange:()=>void;
}

const Header = ({darkMode,handleThemeChange}:Props) => {
    return (
        <AppBar sx={{mb:4}} position='static'>
            <Toolbar>
                <Typography variant='h6'>
                    GoShop
                </Typography>
                <Switch checked={darkMode} onChange={handleThemeChange}/>
            </Toolbar>
        </AppBar>
    )
}

export default Header