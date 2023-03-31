import {  combineReducers,createStore} from "redux"
import BookReducer from "./reducers/BookReducer"
const mainReducer= combineReducers({
    BookReducer
})

const store=createStore(mainReducer)

export default store