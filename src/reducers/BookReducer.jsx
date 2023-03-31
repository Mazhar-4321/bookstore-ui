
// const state = { title: 'Notes', notesArray: [], menu: ['Archive', 'Trash'] }
// const state1 = { title: 'Notes', notesArray: [], menu: ['Archive', 'Trash'] }

const initialState = {
    cartCount: 0,
    booksInCart: [],
    booksInWishList: [],
    booksInDB: [],
    selectedBookQuantity: 0,
    bookSelected: {},
    isSelectedBookInWishList: false,
    gridBooks: [],
    booksTemp: [],
    filter: 'Sort By Relevance',
    input: '',
    pageSelected: 1
}
const BookReducer = ((state = initialState, action) => {
    switch (action.type) {


        case 'placeOrder':
            console.log('reached')
            return{
                ...state,booksInCart:[],cartCount: 0
            }
        case 'InsertBookInTheCart':
            var data = action.value
            console.log("Inserting Book Into Cart length", data.length)
            return {
                ...state, booksInCart: data.data1, cartCount: data.data1.length, selectedBookQuantity: data.data2 == 1 ? state.selectedBookQuantity + 1 : state.selectedBookQuantity - 1
            }
        case 'removeBookFromWishList':
            var bookId = action.value
            return {
                ...state, booksInWishList: state.booksInWishList.filter(book => book._id != bookId)
            }

            case 'addBookToWishList':
            var data = action.value
            var newData=[...state.booksInWishList]
            newData.push(state.bookSelected[0])
            return {
                ...state, booksInWishList: newData
            }
        case 'refreshGrid':
            var data = action.value
            return {
                ...state, booksTemp: data.data1, gridBooks: data.data2, input: data.data3
            }

        case 'filter':
            var filterValue = action.value
            var booksTemp1;
            switch (filterValue) {
                case 'High To Low':
                    booksTemp1 = state.booksTemp.filter(book => (book.bookName + "").toLowerCase().includes(state.input.toLowerCase())).sort((a, b) => b.discountPrice - a.discountPrice)
                    break;
                case 'Low To High':
                    booksTemp1 = state.booksTemp.filter(book => (book.bookName + "").toLowerCase().includes(state.input.toLowerCase())).sort((a, b) => a.discountPrice - b.discountPrice)
                    break;
                default:
                    booksTemp1 = state.booksTemp.filter(book => (book.bookName + "").toLowerCase().includes(state.input.toLowerCase())).sort((a, b) => a.quantity - b.quantity)
                    break;
            }

            return {
                ...state, booksTemp: booksTemp1, gridBooks: booksTemp1.slice((state.pageSelected - 1) * 8, ((state.pageSelected - 1) * 8 + 8)), filter: filterValue
            }

        case 'changePagination':
            var data = action.value
            return {
                ...state, gridBooks: data.data2, pageSelected: data.pageNumber
            }
        case 'LoadDataTheOtherWay':
            var data = action.value
            console.log("response from wishlist", data.responseFromwishList)
            var map = new Map()
            data.response.forEach(book => map.set(book._id, book))
            var booksInWishListFinal = data.responseFromwishList[0].books.map(item => map.get(item.productID))
            console.log("books in wishlist final", booksInWishListFinal.length)
            return {
                ...state, gridBooks: data.response.slice((state.pageSelected - 1) * 8, ((state.pageSelected - 1) * 8 + 8)), booksTemp: data.response, booksInDB: data.response, booksInCart: data.responseFromCart, booksInWishList: booksInWishListFinal, cartCount: data.responseFromCart.length
            }

        case 'LoadDataTheOtherWay1':
            var data = action.value
            console.log("data3", data.data3)
            try {
                return {
                    ...state,
                    bookSelected: data.data2,
                    selectedBookQuantity: data.data1.length == 0 ? 0 : data.data1[0].quantity,
                    isSelectedBookInWishList: data.data3.length == 0 ? false : true
                }
            } catch (err) {
                return state
            }



        default:
            return state


    }

}
)
export default BookReducer