import '../App.css';

import { NavDrawer } from './NavDrawer';
import { SemiHeader } from './SemiHeader';
import { BookGrid } from './BookGrid';
import { BookDisplay } from './BookDisplay';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import React from 'react';


function BookInfo() {
    const location = useLocation();
    console.log("state",location);
    const [showBook, setShowBook] = useState(false)
    const [props, setProps] = useState({ data: {} })
    const changeBookStatus = (props1) => {
        console.log("after", props1)
        setShowBook(true);
        setProps((previousObject) => ({
            ...previousObject, data: props1
        }));
        console.log(props)
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            <NavDrawer />
            <div className='container'>
                <div style={{marginBottom:'20px'}}></div>
                {
                    <BookDisplay props={location.state} />
                        
                }
            </div>
        </div>
    );
}

export default BookInfo;
