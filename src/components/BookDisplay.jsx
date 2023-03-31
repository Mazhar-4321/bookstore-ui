import React, { useEffect } from "react";
import '../css/BookDisplay.css'
import { BookImage } from "./BookImage";
import { useDispatch, useSelector } from "react-redux";

export const BookDisplay = (props) => {
    const myState = useSelector(state => state.BookReducer)
    useEffect(() => {
    }, [])
    return (
        <div className="parentContainer">
            <div className="container1">
                <BookImage image={props.bookImage} props={props} />
            </div>
            {myState.bookSelected[0] != null && <div className="container2">
                <p className="book-name" >{myState.bookSelected[0].bookName}</p>
                <p className="author-name" >by {myState.bookSelected[0].author}</p>
                {/* <p className="quantity" >({myState.bookSelected[0].quantity})</p> */}
                <div>
                    <span style={{ marginTop: '5px', padding: '3px 7px 3px 7px', fontSize: '10px', textAlign: 'center', width: '14px', height: '13px', background: 'green', color: 'white' }}>4.5 *</span  ><span className="quantity"  >({myState.bookSelected[0].quantity})</span>
                </div>
                <div style={{display:'flex',flexDirection:'row'}}>
                    <div className="discount-price" >Rs.{myState.bookSelected[0].discountPrice} </div >
                    <div className="price"  >
                        <strike className='price-strike' >Rs.{myState.bookSelected[0].price}</strike>
                    </div>
                </div>
                <div className="container2-block2" ></div>
                <p className="book-details" >.Book Details</p>
                <p className="book-description" >{myState.bookSelected[0].description}</p>
                <div style={{ width: '100%', height: '1px', background: 'rgb(0,0,0,0.2)', marginBottom: '20px' }}></div>
            </div>}

        </div>
    )
}