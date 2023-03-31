import React, { useEffect, useState } from 'react'
import '../css/BookImage.css'
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addBookToWishList, decrementBookQuantityInTheCart, getAllBooks, getAllBooksFromcart, getAllBooksFromWishList, incrementBookQuantityInTheCart } from '../services/DataServices';
import { useSelector, useDispatch } from 'react-redux';
export const BookImage = (props) => {
    //console.log("Book Image",myState.booksInWishList.filter(book=>book._id==myState.bookSelected[0]._id))
    const myState = useSelector(state => state.BookReducer)
    console.log("Book Image", myState.booksInWishList.filter(book => book._id == myState.bookSelected[0]._id).length)

    const dispatch = useDispatch()
    const [bookQuantity, setBookQuantity] = useState(myState.selectedBookQuantity)
    const [wishList, setWishList] = useState(myState.booksInWishList.filter(book => book._id == myState.bookSelected[0]._id).length == 0)
    const [visibility, setVisibility] = useState(true)

    useEffect(() => {


    }, [])
    const changeBookQuantity = async (flag) => {

        if (flag === 0) {
            if (bookQuantity === 1) {
                return
            }
            var response = await decrementBookQuantityInTheCart(myState.bookSelected[0]._id)
            dispatch({
                type: 'InsertBookInTheCart',
                value: { data1: response.books, data2: 0 }
            })
            setBookQuantity(bookQuantity - 1)

        } else {
            console.log("books In Cart", myState.booksInCart)
            var response1 = await incrementBookQuantityInTheCart(myState.bookSelected[0]._id)
            dispatch({
                type: 'InsertBookInTheCart',
                value: { data1: response1.books, data2: 1 }
            })
            setBookQuantity(bookQuantity + 1)
        }
    }

    const addBookToWishLists = async () => {
        try {
            var response = await addBookToWishList(myState.bookSelected[0]._id)
            dispatch({
                type: 'addBookToWishList',
                value: myState.bookSelected[0]._id
            })
            console.log(response)
            setWishList(false)
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <>
            <div className='bookContainer'>
                <img className='image' src={myState.bookSelected.bookImage == null ? 'https://www.shutterstock.com/image-vector/open-book-vector-clipart-silhouette-260nw-795305758.jpg' : myState.bookSelected.bookImage} alt={'hi'}>
                </img>
            </div>
            <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                {
                    bookQuantity !== 0 ?
                        <div style={{ width: '45%', display: 'flex', flexDirection: 'row' }}>
                            <button onClick={() => changeBookQuantity(0)} className='button' style={{ border: '1px solid #DBDBDB', borderRadius: '100%', background: '#FAFAFA', color: '#333333', fontSize: '20px', width: '38px', height: '38px', cursor: 'pointer' }}>-</button>
                            <div style={{ marginLeft: '10px', marginRight: '10px', width: '30%', color: 'black', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', border: '1px solid black' }} ><p style={{ color: 'black' }} >{bookQuantity}</p></div>
                            <button onClick={() => changeBookQuantity(1)} style={{ border: '1px solid #DBDBDB', borderRadius: '100%', background: '#FAFAFA', color: '#333333', fontSize: '20px', width: '38px', height: '38px', cursor: 'pointer' }}>+</button>
                        </div>
                        :
                        <Button onClick={() => changeBookQuantity(1)} className='button' style={{ width: '45%', background: '#A03037' }} variant="contained">ADD TO BAG</Button>}
                {wishList ? <Button onClick={addBookToWishLists} startIcon={<FavoriteBorderIcon style={{ textAlign: 'center', marginBottom: '5px' }} />} style={{ width: '45%', background: '#333333', color: 'white', textAlign: 'center' }} variant="contained">WishList</Button>
                    : <Button disabled className='buttons' style={{ width: '45%', textAlign: 'center', background: '#333333', color: 'white', fontSize: '12px' }} variant="contained">In WISHLIST</Button>
                }
            </div>
        </>
    )
}