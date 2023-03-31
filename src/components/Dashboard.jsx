import '../App.css';

import { NavDrawer } from './NavDrawer';
import { SemiHeader } from './SemiHeader';
import { BookGrid } from './BookGrid';
import { BookDisplay } from './BookDisplay';
import { useEffect, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { createTheme, styled, useTheme } from '@mui/material/styles';
import { Footer } from './Footer';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooks, getAllBooksFromcart, getAllBooksFromWishList } from '../services/DataServices';

const theme = createTheme({
    palette: {
        primary: {
            main: '#A03037',

        }


    }
});

function Dashboard() {
    const [showBook, setShowBook] = useState(false)
    const myState = useSelector(state => state.BookReducer)
    const dispatch = useDispatch()

    const [props, setProps] = useState({ data: {} })
    window.onbeforeunload = (event) => {
        window.event?.preventDefault()
        // console.log('hi')
    }
    useEffect(() => {
        const getBooks = async () => {
            try {
                var response = await getAllBooks()
                var responseFromCart = await getAllBooksFromcart()
                var responseFromwishList = await getAllBooksFromWishList()
                dispatch({
                    type: 'LoadDataTheOtherWay',
                    value: {
                        response, responseFromCart, responseFromwishList
                    }
                })



            } catch (err) {

            }

        }
       
       setTimeout(()=>{
        getBooks()
       },2000) 
    }, [])
    const changeBookStatus = (props1) => {
        setShowBook(true);
        setProps((previousObject) => ({
            ...previousObject, data: props1
        }));
    }
    return (


        <ThemeProvider theme={theme}>
           
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <NavDrawer />
                    {myState.gridBooks.length > 0 ?
                    <>
                    <div className='container'>
                        <SemiHeader />
                        <BookGrid changeBookStatus={changeBookStatus} />
                    </div>
                    <Footer />
                    </>
                    :
                    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></div>
                        
           }
                </div>
               
              </ThemeProvider>


    );

}
export default Dashboard;
