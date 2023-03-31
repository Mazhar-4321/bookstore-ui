import React, { useEffect, useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import '../css/Cart.css'
import { decrementBookQuantityInTheCart, getAllBooksFromcart, getCustomerDetails, incrementBookQuantityInTheCart, placeOrder, removeBookFromCart, updateCustomerDetails } from '../services/DataServices';
import { TextField } from '@mui/material';
import { NavDrawer } from './NavDrawer';
import { useNavigate } from "react-router-dom";
import { Footer } from './Footer';
import { useDispatch } from 'react-redux';

export const Cart = () => {

    const navigate = useNavigate();
    const [array, setArray] = useState([1])
    const dispatch = useDispatch()
    const [booksArray, setBooksArray] = useState({ books: [], flag: false, fullName: '' })
    const [fullName, setFullName] = useState('')
    const [address, setAddress] = useState('')
    const [cart2, setCart2] = useState(false)
    const [cart3, setCart3] = useState(false)
    const [customerDetails, setCustomerDetails] = useState({})
    const [flag, setFlag] = useState(false)

    const incrementBookCount = async (event) => {
        var response = await incrementBookQuantityInTheCart(event.target.value)
        setBooksArray(prevObj => ({
            ...prevObj, books: response.data.data.books, flag: response.data.data.books.length === 0
        }))

    }

const closeCartBox2=async()=>{
    console.log(customerDetails)
    var response = await updateCustomerDetails(customerDetails)
     setCart3(true)
    console.log(response)

}


    const decrementBookCount = async (event) => {
        var response = await decrementBookQuantityInTheCart(event.target.value)
        setBooksArray(prevObj => ({
            ...prevObj, books: response.data.data.books, flag: response.data.data.books.length === 0
        }))
    }

    const placeOrder1=async()=>{
var response=await placeOrder()
dispatch({
    type:'placeOrder'
})
navigate('/order',{
    replace:true
})
    }
    const removeBookFromCart1=async(bookID)=>{
        console.log(bookID)
        var response = await removeBookFromCart(bookID)
        console.log("delete response",response)
        setBooksArray(prevObj => ({
            ...prevObj, books: response.data.data.books, flag: response.data.data.books.length === 0
        }))
    }
    useEffect(() => {
        const getAllBooks = async () => {
            var response = await getAllBooksFromcart()
            var response2 = await getCustomerDetails()
            console.log(response)
            setBooksArray(prevObj => ({
                ...prevObj, books: response, flag: response.length === 0
            }))
            setCustomerDetails(response2)
        }
        const getCustomerDetails1 = async () => {
            var response = await getCustomerDetails()
            console.log("ajajaj", response)
            // setCustomerDetails(prevObj => ({
            //     ...prevObj, data: response
            // }))
            setBooksArray(prevObj => ({
                ...prevObj, fullName: response.fullName
            }))
            setFullName(response.fullName)
            setAddress(response.address)
            console.log(response, customerDetails)
        }
        getAllBooks()
    }, [])


    return (
        <div >
            <NavDrawer />
            <div className='mainContainer'>
                <div className='cart-box1'>
                    <div className='cart-box1-header'>
                        <div className='cart-description'>
                            <div style={{ font: 'normal normal normal 18px/24px Lato', color: '#0A0102', marginBottom: '8px' }}>My Cart({booksArray.books.length})</div>
                        </div>
                        <div className='supplier-location'>
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                <div className='logo'>
                                    <LocationOnIcon style={{ color: '#A03037' }} />
                                </div>
                                <div className='description' >Use Currrent Location</div>
                                <div className='icon'>
                                    <KeyboardArrowDownIcon />
                                </div>
                            </div>

                        </div>

                    </div>
                    {booksArray.books.map(a => {
                        return (
                            <div className='cart-box1-content'>
                                <img className='element-image' src={a.bookImage === null ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT95pHlrtzjDuSg4AjwoGP6J0PIG-S6LXK2Lg&usqp=CAU' : a.bookImage}></img>
                                <div className='element-details'>
                                    <div style={{ font: 'normal normal normal 14px/17px Lato', color: '#0A0102', marginBottom: '8px' }}>{a.bookName}</div>
                                    <div style={{ font: 'normal normal normal 10px/12px Lato', color: '#9D9D9D', marginBottom: '10px' }}>{a.author}</div>
                                    <div><span style={{ font: 'normal normal bold 15px/18px Lato', color: '#0A0102', marginRight: '11px', marginBottom: '24px' }}>Rs.{a.discountPrice}</span> <strike style={{ font: 'normal normal normal 9px/11px Lato', color: '#9D9D9D' }}>Rs.{a.price}</strike></div>
                                    <div className='persona' >
                                        <button value={a._id} disabled={cart2||cart3} onClick={decrementBookCount} style={{ border: '1px solid #DBDBDB', borderRadius: '100%', background: '#FAFAFA', color: '#333333', fontSize: '15px', width: '24px', height: '24px', cursor: 'pointer' }}>-</button>
                                        <div className='rectangle'  ><p style={{ color: 'black' }} >{a.quantity}</p></div>
                                        <button value={a._id} disabled={cart2||cart3} onClick={incrementBookCount} style={{ border: '1px solid #DBDBDB', borderRadius: '100%', background: '#FAFAFA', color: '#333333', marginRight: '26px', fontSize: '15px', width: '24px', height: '24px', cursor: 'pointer' }}>+</button>
                                       <Button disabled={cart2||cart3}  onClick={()=>removeBookFromCart1(a._id)}  style={{ textTransform:'none', cursor: 'pointer', font: 'normal normal normal 12px/15px Lato', color: '#0A0102' }}>Remove</Button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )
                    }
                    <div className='cart-box1-placeOrder'>
                        {!cart2 && <Button variant="contained" onClick={() => setCart2(true)} style={{ margin: '20px 20px 20px 20px', background: '#3371B5', width: '150px', padding: '12px 20px 12px 20px', font: 'normal normal  normal 14px/17px Lato', textAlign: 'center' }}>place Order</Button>}
                    </div>
                </div>
                <div className='cart-box2' >
                    <div className='cart-box2-header' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '20px', marginBottom: '20px' }}>
                        <div className='cart-description'>
                            <div style={{ font: 'normal normal normal 18px/24px Lato', color: '#333232', marginBottom: '8px' }}> {!cart2 ? 'Address Details' : 'Customer Details'}</div>
                        </div>
                        {cart2 && !cart3 && <div style={{ marginRight: '20px' }}><Button variant="outlined" style={{ border: '1px solid #A03037', width: '150px', textTransform: 'none', color: '#A03037', padding: '12px 20px 12px 20px', font: 'normal normal  normal 12px/16px Lato', textAlign: 'center' }}>Add New Address</Button></div>}
                    </div>
                    {cart2 &&
                        <div style={{ width: '61%', height: '100px', marginLeft: '60px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TextField onInput={(event)=>setCustomerDetails(prevObject=>({...prevObject,fullName:event.target.value}))} style={{ width: '45%', color: 'black' }} size='small' fullWidth margin='dense' id="outlined-read-only-input" label="Full name" defaultValue={customerDetails.fullName} />
                            <TextField onInput={(event)=>setCustomerDetails(prevObject=>({...prevObject,mobileNumber:event.target.value}))} style={{ width: '45%' }} size='small' fullWidth margin='dense' id="outlined-basic" label="Mobile Number" defaultValue={customerDetails.mobileNumber} />

                        </div>}
                    {cart2 &&
                        customerDetails.address.map((address, i) => {
                            return (
                                <>
                                    <div className='papa' style={{ marginLeft: '60px', width: '61%', display: 'flex', flexDirection: 'column' }}>
                                        <div>{i + 1}.{address.type}</div>
                                        <TextField onInput={(event)=>customerDetails.address[i].address=event.target.value}  style={{ width: '100%', background: '#F5F5F5' }} multiline size='small' fullWidth margin='dense' id="outlined-basic" label="Address" defaultValue={address.address} variant="outlined" />
                                        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between',marginBottom:'20px' }}>
                                            <TextField onInput={(event)=>customerDetails.address[i].city=event.target.value} style={{ width: '45%', background: '#F5F5F5' }} size='small' fullWidth margin='dense' id="outlined-basic" label="City/town" defaultValue={address.city} variant="outlined" />
                                            <TextField onInput={(event)=>customerDetails.address[i].state=event.target.value} style={{ width: '45%', background: '#F5F5F5' }} size='small' fullWidth margin='dense' id="outlined-basic" label="State" defaultValue={address.state} variant="outlined" />

                                        </div>
                                    </div>

                                    {!cart3 && <div className='cart-box2-header' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '20px', marginBottom: '20px' }}>
                                        <div className='cart-description'>
                                            <div style={{ font: 'normal normal normal 18px/24px Lato', color: '#333232', marginBottom: '8px' }}></div>
                                        </div>
                                        <div style={{ marginRight: '20px' }}><Button onClick={closeCartBox2} variant="contained" style={{ margin: '20px 0px 20px 20px', width: '150px', background: '#3371B5', padding: '12px 20px 12px 20px', font: 'normal normal  normal 14px/17px Lato', textAlign: 'center' }}>CONTINUE</Button></div>
                                    </div>}
                                </>)
                        })
                    }
                </div>

                
                <div className='cart-box1' >
                    <div className='cart-box1-header' style={{display:'flex',justifyContent:'flex-start',alignItems:'center',width:'100%'}}>
                        <div className='cart-description'>
                            <div style={{ font: 'normal normal normal 18px/24px Lato', color: '#0A0102', marginBottom: '8px' }}>Order Summary</div>
                        </div>
                       

                    </div>
                    {cart3&&booksArray.books.map(a => {
                        return (
                            <div className='cart-box1-content'>
                                <img className='element-image' src={a.bookImage === null ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT95pHlrtzjDuSg4AjwoGP6J0PIG-S6LXK2Lg&usqp=CAU' : a.bookImage}></img>
                                <div className='element-details'>
                                    <div style={{ font: 'normal normal normal 14px/17px Lato', color: '#0A0102', marginBottom: '8px' }}>{a.bookName}</div>
                                    <div style={{ font: 'normal normal normal 10px/12px Lato', color: '#9D9D9D', marginBottom: '10px' }}>{a.author}</div>
                                    <div><span style={{ font: 'normal normal bold 15px/18px Lato', color: '#0A0102', marginRight: '11px', marginBottom: '24px' }}>Rs.{a.discountPrice}</span> <strike style={{ font: 'normal normal normal 9px/11px Lato', color: '#9D9D9D' }}>Rs.{a.price}</strike></div>
                                    {/* <div style={{ width: '45%', display: 'flex', flexDirection: 'row', marginTop: '24px', marginBottom: '24px' }}>
                                        <button value={a._id} onClick={decrementBookCount} style={{ border: '1px solid #DBDBDB', borderRadius: '100%', background: '#FAFAFA', color: '#333333', fontSize: '15px', width: '24px', height: '24px', cursor: 'pointer' }}>-</button>
                                        <div style={{ marginLeft: '10px', marginRight: '10px', width: '41px', height: '24px', color: 'black', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', border: '1px solid black' }} ><p style={{ color: 'black' }} >{a.quantity}</p></div>
                                        <button value={a._id} onClick={incrementBookCount} style={{ border: '1px solid #DBDBDB', borderRadius: '100%', background: '#FAFAFA', color: '#333333', marginRight: '26px', fontSize: '15px', width: '24px', height: '24px', cursor: 'pointer' }}>+</button>
                                        <div style={{ marginTop: '5px', cursor: 'pointer', font: 'normal normal normal 12px/15px Lato', color: '#0A0102' }}>Remove</div>
                                    </div> */}
                                </div>
                            </div>
                        )
                    }
                    )
                    }
                    <div className='cart-box1-placeOrder'>
                        {cart3 && <Button variant="contained" onClick={placeOrder1} style={{ margin: '20px 20px 20px 20px', background: '#3371B5', width: '150px', padding: '12px 20px 12px 20px', font: 'normal normal  normal 14px/17px Lato', textAlign: 'center' }}>Checkout</Button>}
                    </div>
                </div>
            </div>
            <div style={{height:'220px',width:'100vw', display:'flex',flexDirection:'column', justifyContent:'flex-end'}}>
            <div style={{height:'50px',width:'100%'}}><Footer /></div>
            </div>
        </div>
    )
}