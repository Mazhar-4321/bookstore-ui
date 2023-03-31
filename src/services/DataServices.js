import axios from "axios";
const baseURL = 'http://localhost:7001/api/v1'
const headerConfig = {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
}

export const getAllBooks = async () => {
    try {
        let response = await axios.get(`${baseURL}/books/`, headerConfig)
        console.log(response.data.data)
        return response.data.data
    } catch (err) {
        throw new Error('Connection Refused')
    }
}

export const getAllBooksFromcart = async () => {
    try {
        let response = await axios.get(`${baseURL}/cart/`, headerConfig)
        console.log(response.data.data)
        return response.data.data
    } catch (err) {
        throw new Error('Connection Refused')
    }
}

export const placeOrder=async()=>{
    try {
        var response = await axios.put(`${baseURL}/cart/order`, {}, headerConfig)
        return response.data
    } catch (err) {
        console.log(err)
        throw new Error('Could Not Change Cart')
    }
}

export const addBookToWishList = async (obj) => {
    try {
        console.log(`${baseURL}/cart/insert/${obj}`, headerConfig)
        var response = await axios.put(`${baseURL}/books/wishlist/insert/${obj}`, {}, headerConfig)
        return response.data
    } catch (err) {
        console.log(err)
        throw new Error('Could Not Change Cart')
    }
}

export const removeBookFromWishList = async (obj) => {
    try {
        console.log(`${baseURL}/cart/insert/${obj}`, headerConfig)
        var response = await axios.put(`${baseURL}/books/wishlist/remove/${obj}`, {}, headerConfig)
        console.log("aaa", response.data.message)
        return response.data.message
    } catch (err) {
        console.log(err)
        throw new Error('Could Not Change Cart')
    }
}


export const getAllBooksFromWishList = async () => {
    try {
        let response = await axios.get(`${baseURL}/books/wishlist/`, headerConfig)
        console.log("books wishlist data", response.data.data)
        return response.data.data
    } catch (err) {
        throw new Error('Connection Refused')
    }
}

export const incrementBookQuantityInTheCart = async (obj) => {
    try {
        var response = await axios.put(`${baseURL}/cart/insert/${obj}`, {}, headerConfig)
        return response.data.data
    } catch (err) {
        throw new Error('Could Not Change Cart')
    }
}

export const decrementBookQuantityInTheCart = async (obj) => {
    try {
        var response = await axios.put(`${baseURL}/cart/remove/${obj}`, {}, headerConfig)
        console.log(response)
        return response.data.data
    } catch (err) {
        throw new Error('Could Not Change Cart')
    }
}

export const removeBookFromCart = async (obj) => {
    try {
        var response = await axios.put(`${baseURL}/cart/delete/${obj}`, {}, headerConfig)
        return response
    } catch (err) {
        throw new Error('Could Not Change Cart')
    }
}

export const signIn = async (obj) => {
    try {
        var response = await axios.post(`${baseURL}/users/login`, obj)
        localStorage.setItem('token', response.data.token)
        return response
    } catch (err) {
        throw new Error('Could Not Create User')
    }
}

export const registerUser = async (obj) => {
    try {
        var response = await axios.post(`${baseURL}/users/`, obj)
        return response
    } catch (err) {
        throw new Error('Could Not Create User')
    }
}

export const getAllNotes = async () => {
    try {
        let response = await axios.get(`${baseURL}/notes/`, headerConfig)
        // useDispatch(insertAllNotesInTheArray(response.data.data))
        return response.data.data
    } catch (err) {
        throw new Error('Connection Refused')
    }
}

export const getCustomerDetails = async () => {
    try {
        let response = await axios.get(`${baseURL}/cart/getCustomerDetails`, headerConfig)
        // useDispatch(insertAllNotesInTheArray(response.data.data))
        return response.data.data
    } catch (err) {
        throw new Error('Connection Refused')
    }
}

export const updateCustomerDetails = async (obj) => {
    try {
        var response = await axios.post(`${baseURL}/cart/updateCustomerDetails`, obj, headerConfig)
        return response
    } catch (err) {
        throw new Error('Could Not Create User')
    }
}

