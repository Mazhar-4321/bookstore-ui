import React, { useEffect, useState } from "react";
import '../css/NavDrawer.css'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from "react-router-dom";
import Badge from '@mui/material/Badge';
import { createTheme, InputAdornment, TextField, ThemeProvider } from "@mui/material";
import { getAllBooksFromcart } from "../services/DataServices";
import { useSelector, useDispatch } from "react-redux";
import BookReducer from '../reducers/BookReducer.jsx';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsIcon from '@mui/icons-material/Directions';


const theme = createTheme({
    palette: {
        primary: {
            main: '#ffffff',

        }


    }
});
export const NavDrawer = (props) => {
    const navigate = useNavigate();
    const myState = useSelector(state => state.BookReducer)
    const dispatch = useDispatch()
    const [cartQuantity, setCartQuantity] = useState(0)
    useEffect(() => {
    }, [])
    const incrementCartQuantity = () => {
        setCartQuantity(cartQuantity + 1)
    }
    const decrementCartQuantity = () => {
        setCartQuantity(cartQuantity - 1)
    }

    const refreshGrid = (event) => {
        console.log(myState.filter)
        var data = myState.filter === 'Sort By Relevance' ? myState.booksInDB.sort((a, b) => a.quantity - b.quantity).filter(book => (book.bookName + "").toLowerCase().includes(event.target.value.toLowerCase())) : myState.filter === 'High To Low' ? myState.booksInDB.sort((a, b) => b.discountPrice - a.discountPrice).filter(book => (book.bookName + "").toLowerCase().includes(event.target.value.toLowerCase())) : myState.booksInDB.sort((a, b) => a.discountPrice - b.discountPrice).filter(book => (book.bookName + "").toLowerCase().includes(event.target.value.toLowerCase()))
        dispatch({
            type: 'refreshGrid',
            value: {
                data1: data,
                data2: data.slice(0, 8),
                data3: event.target.value
            }
        })
    }
    return (
        <ThemeProvider theme={theme}>
            <div className="navHeader">
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                    <div className="section1">
                        <div className='section1-div1' ><MenuBookOutlinedIcon className="section1-div1-icon" /></div>
                        <div className="section1-div2" ><p className="section1-div2-content" >Bookstore</p></div>
                    </div>
                    <div className="section2">

                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, height: 32 }}
                        >
                            <IconButton sx={{ p: '10px' }} aria-label="menu">
                                <SearchIcon />
                            </IconButton>
                            <InputBase
                                onInput={refreshGrid}
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search "
                                inputProps={{ 'aria-label': 'search google maps' }}
                            />

                        </Paper>
                    </div>
                    <div className="section3">
                        <div className="section3-container" >
                            <PersonOutlineIcon style={{ color: 'white' }} />
                            <p className="profile" >Profile</p>
                        </div>
                        <div onClick={() => navigate('/wishlist')} className='wishlist' >
                            {myState.booksInWishList.length > 0 ?
                                <Badge badgeContent={myState.booksInWishList.length} color="primary">
                                    <FavoriteBorderIcon style={{ color: 'white' }} />    </Badge>
                                :
                                <FavoriteBorderIcon style={{ color: 'white' }} />}

                            <p className="wishlist-content" >WishList</p>
                        </div>
                        <div onClick={() => navigate('/cart')} className='cart' >
                            {myState.cartCount > 0 ?
                                <Badge badgeContent={myState.cartCount} color="primary">
                                    <ShoppingCartIcon style={{ color: 'white' }} />    </Badge>
                                :
                                <ShoppingCartIcon style={{ color: 'white' }} />}

                            <p className="cart-content" >Cart</p>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}