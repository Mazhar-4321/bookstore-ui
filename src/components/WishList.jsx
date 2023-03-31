import '../App.css';

import { NavDrawer } from './NavDrawer';
import { SemiHeader } from './SemiHeader';
import { BookGrid } from './BookGrid';
import { BookDisplay } from './BookDisplay';
import { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { createTheme, styled, useTheme } from '@mui/material/styles';
import { WishListBox } from './WishListBox';
import { Footer } from './Footer';

const theme = createTheme({
    palette: {
        primary: {
            main: '#A03037',

        }


    }
});

function WishList() {
    const [showBook, setShowBook] = useState(false)
    const [props, setProps] = useState({ data: {} })
    window.onbeforeunload=(event)=>{
        window.event?.preventDefault()
        // console.log('hi')
    }
   
    const changeBookStatus = (props1) => {
        setShowBook(true);
        setProps((previousObject) => ({
            ...previousObject, data: props1
        }));
    }
    return (
        <ThemeProvider theme={theme}>
        <div style={{ display: 'flex',height:'99vh',maxHeight:'100%',minHeight:'100%' ,flexDirection: 'column' }}>
            <div style={{height:'20%'}}><NavDrawer  /></div>
            <div style={{height:'60%'}}><div style={{height:'90%'}}><WishListBox /></div></div>
            <div style={{height:'20%',width:'100vw', display:'flex',flexDirection:'column', justifyContent:'flex-end'}}>
            <div style={{height:'50px',width:'100%'}}><Footer /></div>
            </div>
        </div>
        </ThemeProvider>
    );
}

export default WishList;