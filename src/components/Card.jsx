import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import '../css/Card.css'
import { incrementBookQuantityInTheCart } from "../services/DataServices";

export const Card = (props) => {
    const navigate = useNavigate();

    const myState = useSelector(state => state.BookReducer)

    const dispatch = useDispatch()
    const handleChange = async () => {
        console.log("in Wish List",myState.booksInWishList.filter(book => book._id === props.bookId),props.bookId,myState.booksInWishList)
        dispatch({
            type: 'LoadDataTheOtherWay1',
            value: {
                data2: myState.booksInDB.filter(book => book._id === props.bookId),
                data1:myState.booksInCart.filter(book => book._id === props.bookId),
                data3:myState.booksInWishList.filter(book => book._id === props.bookId),
                
            }
        }
        )

        navigate('/book', {
            state: {
                description: props.description,
                discountPrice: props.discountPrice,
                price: props.price,
                bookName: props.bookName,
                author: props.author,
                bookImage: props.bookImage,
                quantity: props.quantity,
                bookId: props.bookId,
                bookAvailabilityInWishList: props.bookAvailabilityInWishList,
                bookAvailabilityInCart: props.bookAvailabilityInCart
            }
        })
    }
    return (
        <div onClick={handleChange} style={{ cursor: 'pointer' }} className="card">
            <div className="card-image" >
                <img className="card-image-display"  src={props.bookImage !== null ? props.bookImage : 'https://www.shutterstock.com/image-vector/open-book-vector-clipart-silhouette-260nw-795305758.jpg'} onError={() => 'src=https://public-v2links.adobecc.com/d096df37-ca37-4026-553f-8cfa6bec09ec/component?params=component_id%3A634ba680-536e-4b6f-b4a3-41986b9b22f5&params=version%3A0&token=1679461552_da39a3ee_5b75718b73ea33c3022cbe352cbeb9bcb66597f0&api_key=CometServer1'} />

            </div>
            <div style={{ height: '37%', width: '100%', marginLeft: '10px', marginBottom: '10px', display: 'flex', flexDirection: 'column', rowGap: '2' }}>
                {/* <p style={{ color: '#0A0102', marginLeft: '0px', fontSize: '14px' }} >{myState.input.length>0? props.bookName.substring(0,props.index)+<mark>props.bookName.substring(props.index,props.index+1)</mark>+props.bookName.substring(props.index+1):props.bookName}</p> */}
               {props.index!=-1||props.index1!=-1? <div style={{ color: '#0A0102', marginLeft: '0px', fontSize: '14px' }}><span>{props.bookName.substring(0,props.index)}</span><mark>{props.bookName.substring(props.index,props.index+myState.input.length)}</mark><span>{props.bookName.substring(props.index+myState.input.length)}</span></div>:<div style={{ color: '#0A0102', marginLeft: '0px', fontSize: '14px' }}>{props.bookName}</div>}
               {props.index1!=-1? <div style={{ color: '#878787', fontSize: '10px', marginLeft: '0px', marginBottom: '5px' }}><span>{props.author.substring(0,props.index1)}</span><mark>{props.author.substring(props.index1,props.index1!=-1?+props.index1+myState.input.length:props.index1)}</mark><span>{props.author.substring(props.index1+myState.input.length)}</span></div>:<div style={{ color: '#878787', fontSize: '10px', marginLeft: '0px', marginBottom: '5px' }}>{props.author}</div>}

                {/* <p style={{ color: '#878787', fontSize: '10px', marginLeft: '0px', marginBottom: '5px' }}>by {props.author}</p> */}
                <div>
                    <span style={{ marginTop: '5px', padding: '3px 7px 3px 7px', fontSize: '10px', textAlign: 'center', width: '14px', height: '13px', background: 'green', color: 'white' }}>4.5 *</span  ><span style={{ padding: '2px 2px 2px 2px', fontSize: '10px', textAlign: 'center', width: '14px', height: '13px' }}>({props.quantity})</span>
                </div>
                <div style={{ marginTop: '5px' }}><span style={{ fontSize: '12px' }}>Rs.{props.discountPrice} </span><strike style={{ fontSize: '12px' }}>Rs.{props.price}</strike></div>
            </div>
        </div>
    )
}