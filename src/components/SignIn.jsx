import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, styled, useTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { useNavigate } from "react-router-dom";
import Dashboard from './Dashboard';
import { useDispatch, useSelector } from "react-redux";



import '../css/signIn.css'
import { signIn } from '../services/DataServices';

const emailRegex = /[a-z]{1,}@gmail.com/;
const passwordRegex = /((?=.*[0-9])(?=.*[A-Z])(?=.{8,}$).*)(^([a-zA-Z0-9]*[^a-zA-Z0-9][a-zA-Z0-9]*)$)/;


export const SignIn = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const theme = createTheme({
        palette: {
            primary: {
                main: '#FF001C',

            }

        }
    });
    const [userObj, setUserObj] = useState({ email: '', password: '' })
    const [userRegex, setUserRegex] = useState({
        email: {
            error: false,
            helperText: ''
        }, password: {
            error: false,
            helperText: ''
        }
    })
    const changeEmail = (event) => {
        setUserObj(prevObj => (
            {
                ...prevObj, email: event.target.value
            }

        ))
        var email = event.target.value
        if (!email.match(emailRegex)) {

            setUserRegex((previousState) => ({
                ...previousState, email: {
                    helperText: 'Invalid Email',
                    error: true,

                }
            }))
        }
        else {
            setUserRegex((previousState) => ({
                ...previousState, email: {
                    helperText: '',
                    error: false,
                }
            }))
        }
    }

    const changePassword = (event) => {
        setUserObj(prevObj => (

            {
                ...prevObj, password: event.target.value
            }

        ))

        var password = event.target.value
        if (!password.match(passwordRegex)) {

            setUserRegex((previousState) => ({
                ...previousState, password: {
                    helperText: 'Invalid Password',
                    error: true,

                }
            }))
        }
        else {
            setUserRegex((previousState) => ({
                ...previousState, password: {
                    helperText: '',
                    error: false,
                }
            }))
        }
    }
    const login = async () => {
        if (userObj.email.length > 0 && !userRegex.email.error &&
            userObj.password.length > 0 && !userRegex.password.error) {
            try {
            var response=    await signIn(userObj)

            if(response){
                window.history.pushState(null, document.title, window.location.href);
                window.addEventListener('popstate', function (event){
                    window.history.pushState(null, document.title,  window.location.href);
                });
               navigate("/dashboard")
            }
            } catch (error) {
                alert('Logged in failed')
            }
        } else {
            alert('Please Fill The Details')
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <div className='SignIn'>
                <div style={{ display: 'flex', rowGap: '20px', width: '75%', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                    <TextField error={userRegex.email.error} onInput={changeEmail} helperText={userRegex.email.helperText} size='small' fullWidth margin='dense' id="outlined-basic" label="Email id" variant="outlined" />
                    <TextField error={userRegex.password.error} type={'password'} onInput={changePassword} helperText={userRegex.password.helperText} id="outlined-basic" size='small' fullWidth label="Password" variant="outlined" />
                    <div style={{ display: 'flex', width: '100%', fontSize: '10px', justifyContent: 'flex-end', marginTop: '-20px', cursor: 'pointer' }} onClick={() => alert("hi")}><p>Forgot Password?</p></div>
                    <Button onClick={login} fullWidth style={{ background: '#A03037', textTransform: 'none' }} variant="contained">Login</Button>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
                        <div style={{ height: '1px', width: '33%', background: 'black' }}></div>
                        <div style={{ height: '10px', width: '33%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>OR</div>
                        <div style={{ height: '1px', width: '33%', background: 'black' }}></div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <Button fullWidth style={{ background: '#4266B2', marginBottom: '10px', width: '40%', textTransform: 'none' }} variant="contained">Facebook</Button>
                        <Button fullWidth style={{ background: '#F5F5F5', color: 'black', marginBottom: '10px', width: '40%', textTransform: 'none' }} variant="contained">Google</Button>
                    </div>
                </div>

            </div>
        </ThemeProvider>
    )
}