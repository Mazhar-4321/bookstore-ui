import React, { useEffect } from 'react'
import Table from '@mui/material/Table';
import image from '../icons/image1.png'
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../css/Order.css'
import { Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavDrawer } from './NavDrawer';
import { Footer } from './Footer';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];



export const Order = (props) => {
    const navigate = useNavigate();
    const location = useLocation()
    const clearHistory = () => {

        navigate('/dashboard', { replace: true })
    }

    return (

        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <NavDrawer />
            <div style={{ width: '100vw', height: '60vh',marginTop:'70px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                <img className='img1' src={image}>

                </img>
                <div className='Message'>
                    hurray!!! Your Order is Confirmed The Order id is #123456 save the order id for further communication
                </div>
                <div className='table'>
                    <div className='header'>
                        <div className='header-1' >Email Us</div>
                        <div className='header-2' >Contact Us</div>
                        <div className='header-3' >Address</div>

                    </div>
                    <div className='Bi' style={{ width: '100%', height: '70%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className='Bi1' >admin@bookstore.com</div>
                        <div style={{ width: '0.5px', height: '100%', background: '#DCDCDC' }}></div>
                        <div className='Bi2' >+91 8125629427</div>
                        <div style={{ width: '0.5px', height: '100%', background: '#DCDCDC' }}></div>

                        <div className='Bi3' >
                            42, 14th Main ,15th Cross,Sector 4,opp to BDA complex, near Kumarakom Restaurant, HSR Layout,Bangalore 560034
                        </div>
                    </div>
                </div>
                <Button onClick={clearHistory} variant="contained" style={{ background: '#3371B5', font: 'normal normal normal 14px/17px Lato', padding: '9px 26px 9px 26px' }}>Continue Shopping</Button>
            </div>
            <div style={{height:'150px',width:'100vw', display:'flex',flexDirection:'column', justifyContent:'flex-end'}}>
            <div style={{height:'50px',width:'100%'}}><Footer /></div>
            </div>
        </div>





    )
}