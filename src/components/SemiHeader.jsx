import React, { useEffect, useState } from "react";
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, FormControl, InputAdornment, InputLabel, TextField, ThemeProvider } from "@mui/material";
import { getAllBooks } from "../services/DataServices";
import { useSelector,useDispatch } from "react-redux";
import '../css/SemiHeader.css'
const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',

        }


    }
});
export const SemiHeader = (props) => {
    const [quantity, setQuantity] = useState(0)
    const [age, setAge] = React.useState('Sort By Relevance');
    const myState = useSelector(state => state.BookReducer)
    const dispatch = useDispatch()
    
    const handleChange = (event) => {
        setAge(event.target.value);
        dispatch({
            type:'filter',
            value:event.target.value
        })
    };
    useEffect(() => {
        const getQuantity = async () => {
            try {
                const response = await getAllBooks();
                setQuantity(response.length)
            } catch (err) {

            }
        }
        getQuantity()
    }, [])
    return (
        <ThemeProvider theme={theme}>
            <div className="semi-header" style={{ width: '100%', height: '10vh', display: 'flex', flexDirection: 'row', marginBottom: '20px', justifyContent: 'space-around' }}>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <span className="semi-header-title" >Books</span><span className="semi-header-books-count" >({myState.booksTemp.length} items)</span>
                    </div>
                    <div className="filter" >
                        <FormControl fullWidth   style={{height:'30px',font:'normal normal normal 12px/15px Lato'}}>
                            <Select
                            style={{height:'30px',font:'normal normal normal 12px/15px Lato'}}
                                displayEmpty
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                input={<OutlinedInput />}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem style={{font:'normal normal normal 12px/15px Lato'}} value={'Sort By Relevance'}>Sort By Relevance</MenuItem>
                                <MenuItem style={{font:'normal normal normal 12px/15px Lato'}} value={'High To Low'}>High To Low</MenuItem>
                                <MenuItem style={{font:'normal normal normal 12px/15px Lato'}} value={'Low To High'}>Low To High</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>

            </div>
        </ThemeProvider>
    )
}