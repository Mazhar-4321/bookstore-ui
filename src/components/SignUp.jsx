// @ts-nocheck
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, styled, useTheme } from '@mui/material/styles';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { ThemeProvider } from '@emotion/react';
import '../css/SignUp.css'

const emailRegex = /[a-z]{1,}@gmail.com/;
const passwordRegex = /((?=.*[0-9])(?=.*[A-Z])(?=.{8,}$).*)(^([a-zA-Z0-9]*[^a-zA-Z0-9][a-zA-Z0-9]*)$)/;
const nameRegex = /[A-Z][A-za-z0-9]{2,}/
const mobileRegex = /[1-9][0-9]{9}/
export const SignUp = (props) => {

    const [signUpObject, setSignUpObject] = useState({
        firstName: {
            helperText: 'white',
            error: false,
            value: ''
        },
        lastName: {
            helperText: 'white',
            error: false,
            value: ''
        },
        email: {
            helperText: 'white',
            error: false,
            value: ''
        },
        password: {
            helperText: 'white',
            error: false,
            value: ''
        },

    })

    const checkFirstName = (event) => {
        var name = event.target.value
        if (!name.match(nameRegex)) {

            setSignUpObject((previousState) => ({
                ...previousState, firstName: {
                    helperText: '#FF001C',
                    error: true,
                    value: name
                }
            }))
        }
        else {
            setSignUpObject((previousState) => ({
                ...previousState, firstName: {
                    helperText: 'white',
                    error: false,
                    value: name
                }
            }))
        }
    }

    const checkLastName = (event) => {
        var lastName = event.target.value
        if (!lastName.match(nameRegex)) {

            setSignUpObject((previousState) => ({
                ...previousState, lastName: {
                    helperText: '#FF001C',
                    error: true,
                    value: lastName
                }
            }))
        }
        else {
            setSignUpObject((previousState) => ({
                ...previousState, lastName: {
                    helperText: 'white',
                    error: false,
                    value: lastName
                }
            }))
        }
    }

    const checkEmail = (event) => {
        var email = event.target.value
        if (!email.match(emailRegex)) {

            setSignUpObject((previousState) => ({
                ...previousState, email: {
                    helperText: '#FF001C',
                    error: true,
                    value: email
                }
            }))
        }
        else {
            setSignUpObject((previousState) => ({
                ...previousState, email: {
                    helperText: 'white',
                    error: false,
                    value: email
                }
            }))
        }
    }

    const checkPassword = (event) => {
        var password = event.target.value
        if (!password.match(passwordRegex)) {
            setSignUpObject((previousState) => ({
                ...previousState, password: {
                    helperText: '#FF001C',
                    error: true,
                    value: password
                }
            }))
        }
        else {
            setSignUpObject((previousState) => ({
                ...previousState, password: {
                    helperText: 'white',
                    error: false,
                    value: password
                }
            }))
        }
    }

    const registerUser = async () => {
        if (signUpObject.firstName.value.length > 0 &&
            signUpObject.lastName.value.length > 0 &&
            signUpObject.email.value.length > 0 &&
            signUpObject.password.value.length > 0 &&
            !signUpObject.firstName.error &&
            !signUpObject.lastName.error &&
            !signUpObject.email.error &&
            !signUpObject.password.error) {
            const userObj = {
                firstName: signUpObject.firstName.value,
                lastName: signUpObject.lastName.value,
                email: signUpObject.email.value,
                password: signUpObject.password.value
            }
            try {
                const response = await registerUser(userObj)
                alert('User Registered Successfully')
            } catch (err) {
                alert('User Registration Failed')
            }
        } else {
            alert('Please Fill The User Details')
        }

    }

    const theme = createTheme({
        palette: {
            primary: {
                main: '#FF001C',

            }


        }
    });
    return (
        <ThemeProvider theme={theme}>
            <div className='SignIn'>
                <div style={{ display: 'flex', width: '80%', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>

                    <TextField style={{ maxHeight: '10vh' }} onInput={checkFirstName} size='small' fullWidth margin='dense' id="outlined-basic" label="First Name" variant="outlined" />
                    <span style={{ width: '100%', fontSize: '8px', marginBottom: '5px', textAlign: 'left', color: signUpObject.firstName.helperText }}>Invalid Firstname</span>

                    <TextField style={{ maxHeight: '10vh' }} onInput={checkLastName} id="outlined-basic" size='small' fullWidth margin='dense' label="Last Name" variant="outlined" />
                    <span style={{ width: '100%', fontSize: '8px', marginBottom: '5px', textAlign: 'left', color: signUpObject.lastName.helperText }}>Invalid Lastname</span>

                    <TextField style={{ maxHeight: '10vh' }} type={'email'} onInput={checkEmail} id="outlined-basic" size='small' fullWidth margin='dense' label="Email" variant="outlined" />
                    <span style={{ width: '100%', fontSize: '8px', marginBottom: '5px', textAlign: 'left', color: signUpObject.email.helperText }}>Invalid Email</span>

                    <TextField type={'password'} style={{ maxHeight: '10vh' }} onInput={checkPassword} id="outlined-basic" size='small' fullWidth margin='dense' label="Password" variant="outlined" />
                    <span style={{ width: '100%', fontSize: '8px', marginBottom: '5px', textAlign: 'left', color: signUpObject.password.helperText }}>Invalid Password</span>

                    <Button onClick={registerUser}  fullWidth style={{ background: '#A03037', textTransform: 'none' }} variant="contained">Sign Up</Button>

                </div>
            </div>
        </ThemeProvider>
    )
}