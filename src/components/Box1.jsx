import React from 'react'
import image from  '../icons/image.png'
import '../css/Box1.css'
export const Box1 = (props) => {
    return (
        <div className='Box1'>
            <img className='img' src={image} />
        <div className='Text'>Online Book Shopping</div>
        </div>
    )
}