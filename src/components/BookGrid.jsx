import React, { useEffect, useState } from 'react'
import { getAllBooks, getAllBooksFromcart, getAllBooksFromWishList } from '../services/DataServices.js'
import Grid from '@mui/material/Grid';
import { Card } from './Card.jsx'
import Pagination from '@mui/material/Pagination';
import '../css/Pagination.css'
import { createTheme, makeStyles, styled, ThemeProvider, useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import BookReducer from '../reducers/BookReducer.jsx';
import { returnBooksFromDB } from '../actions';

const theme = createTheme({
    palette: {
        primary: {
            main: '#A03037',

        }


    }
});

export const BookGrid = (props) => {
    const myState = useSelector(state => state.BookReducer)
    const dispatch = useDispatch()
    const [bookObj, setBookObj] = useState({ books: [] })
    const [semiBookObj, setSemiBookObj] = useState({ books: [] })
    const [cartObj, setCartObj] = useState([])
    const [wishList, setWishList] = useState([])

    useEffect(() => {
    
        const getBooks = async () => {
            try {
                var response = await getAllBooks()
                var responseFromCart = await getAllBooksFromcart()
                var responseFromwishList = await getAllBooksFromWishList()
                dispatch({
                    type:'LoadDataTheOtherWay',
                    value:{
                        response,responseFromCart,responseFromwishList
                    }
                })
               

                setSemiBookObj((prevObj) => ({
                    ...prevObj, books: response.slice(0, 8)
                }))
            } catch (err) {

            }

        }
        getBooks()

    }, [])

    const refreshBooks = (event, value) => {
       dispatch(
        {
            type:'changePagination',
            value:{
                data2:myState.booksTemp.slice((value - 1) * 8, ((value - 1) * 8 + 8)),
                pageNumber:value
            }
        }
       )
        
    }

    return (
         <ThemeProvider theme={theme}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                <div style={{ width: '100%' }}>
                    <Grid sx={{height:'82%'}} container spacing={2.5}>
                        {
                          myState.gridBooks.map(book => <Grid item spacing={4} xs={4} xl={6} md={3} sm={6} lg={3}>
                                <Card changeBookStatus={props.changeBookStatus} description={book.description}
                                    discountPrice={book.discountPrice} price={book.price} index1={(book.author+"").toLowerCase().search(myState.input.toLowerCase())} index={ (book.bookName+"").toLowerCase().search(myState.input.toLowerCase())} bookName={book.bookName} quantity={book.quantity}
                                    author={book.author} bookAvailabilityInCart={cartObj} bookAvailabilityInWishList={wishList} bookImage={book.bookImage} bookId={book._id} />
                            </Grid>)
                        }


                    </Grid>
                </div>
                {myState.booksTemp.length > 0 &&<div style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center',marginTop:'10px',marginBottom:'10px'}}> <Pagination   color='primary' onChange={refreshBooks}  count={Math.ceil(myState.booksTemp.length / 8)} /></div>}
            </div>
        </ThemeProvider>
      
    )
}