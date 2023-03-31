import React, { useState } from "react";
import '../css/Box2.css'
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
export const Box2 = (props) => {
    const [login, setLogin] = useState(true);
    const [signUp, setSignUp] = useState(false)
    const [color1, setTextColor1] = useState('#0A0102')
    const [color2, setTextColor2] = useState('#878787')

    const changeLoginStatus = () => {
        setLogin(true)
        setSignUp(false)
        setTextColor1('#0A0102')
        setTextColor2('#878787')
    }
    const changeSignUpStatus = () => {
        setLogin(false)
        setSignUp(true)
        setTextColor2('#0A0102')
        setTextColor1('#878787')
    }
    return (
        <div className="Box2">
            <div style={{ display: 'flex', height: '25%', flexDirection: 'row', justifyContent: 'space-around', fontSize: ' 25px' }}>
                <div style={{ cursor: 'pointer' }} onClick={changeLoginStatus}> <p style={{ color: color1 }}>LOGIN</p>
                    {login && <div className="selector"></div>}
                </div>
                <div style={{ cursor: 'pointer' }} onClick={changeSignUpStatus}>
                    <p style={{ color: color2 }}>SIGNUP</p>
                    {signUp && <div className="selector">
                    </div>}
                </div>
            </div>
            {login ? <SignIn /> : <SignUp />}
        </div>
    )
}