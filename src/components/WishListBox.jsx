import React, { useEffect, useState } from "react";
import '../css/WishListBox.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from "react-redux";
import { removeBookFromWishList } from "../services/DataServices";

export const WishListBox = (props) => {
    const [array, setArray] = useState({ data: [1, 2, 3, 4, 5] })
    const myState = useSelector(state => state.BookReducer)
    const dispatch = useDispatch()
    const space = '    '
    const deleteFromWishList =async (id) => {
        try{
        const response = await removeBookFromWishList(id)
        dispatch({
            type:'removeBookFromWishList',
            value:id
        })
        }catch(err){

        }
    }
    useEffect(() => {

    }, [])
    return (
        <div className="WishListBox">
            <div className="containerWishList">
                <div className="header">
                    <div className="title">
                        <h4 className="title-title" >My WishList({myState.booksInWishList.length < 10 ? '0' + myState.booksInWishList.length : myState.booksInWishList.length})</h4>
                    </div>
                </div>
                {myState.booksInWishList.map(item => {
                    return (
                        <>
                            <div className="data">
                                <div className="photo">
                                    <img style={{ width: '65px', height: '85px', borderRadius: '0%', border: '1px solid black' }} src={'https://www.shutterstock.com/image-vector/open-book-vector-clipart-silhouette-260nw-795305758.jpg'} />
                                </div>
                                <div className="content ">
                                    <p  style={{ marginTop: '0px', marginLeft: '0px', marginBottom: '5px', font: 'normal normal normal 18px/24px Roboto', color: 'black' }}>{item.bookName}</p>
                                    <p style={{ margin: '0px 0px 0px 0px', marginBottom: '15px', color: '#9D9D9D', font: 'normal normal normal 12px/16px Roboto' }}>{item.author}</p>
                                    <div><span style={{ color: '#0A0102', fontSize: '15px' }}>Rs.{item.discountPrice} </span>&nbsp; &nbsp;<strike style={{ fontSize: '12px', color: '#9D9D9D', paddingTop: '-10px' }}> Rs.{item.price}</strike></div>
                                </div>
                                <div className="delete">
                                    <DeleteIcon onClick={() => deleteFromWishList(item._id)} style={{ color: '#9D9D9D', width: '21px', height: '23px', marginTop: '20px', marginLeft: '100px' }} />
                                </div>

                            </div>
                            <div style={{ width: '100%', height: '1px', background: '#E4E4E4' }}></div>

                        </>
                    )
                })
                }
            </div>

        </div>
    )
}