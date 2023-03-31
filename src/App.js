import logo from './logo.svg';
import './App.css';
import { Box1 } from './components/Box1';
import { Box2 } from './components/Box2';
import { Card } from './components/Card';
import { NavDrawer } from './components/NavDrawer';
import { SemiHeader } from './components/SemiHeader';
import { BookGrid } from './components/BookGrid';
import { BookDisplay } from './components/BookDisplay';
import { useEffect, useState } from 'react';
import { WishListBox } from './components/WishListBox';
import { Cart } from './components/Cart';
import { Provider, useDispatch } from 'react-redux';

import store from './store';
import { useNavigate } from 'react-router-dom';
import { getAllBooks, getAllBooksFromcart, getAllBooksFromWishList } from './services/DataServices';

function App() {
  const [showBook, setShowBook] = useState(false)
  const [props, setProps] = useState({ data: {} })
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const changeBookStatus = (props1) => {
    console.log("after", props1)
    setShowBook(true);
    setProps((previousObject) => ({
      ...previousObject, data: props1
    }));
    console.log(props)
  }
  useEffect(()=>{
    
    
      const getBooks = async () => {
          try {
              var response = await getAllBooks()
              var responseFromCart = await getAllBooksFromcart()
              var responseFromwishList = await getAllBooksFromWishList()
              dispatch({
                  type:'LoadDataTheOtherWay',
                  value:{
                      response,responseFromCart,responseFromwishList
                  }
              })
             

           
          } catch (err) {

          }

      }
      getBooks()

  
if(localStorage.getItem('token')!=null){
 // navigate('/dashboard')
}
  },[])
  return (
    <Provider store={store}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className='LoginPage' >
          <Box1 />
          <Box2 />
        </div>
      
      </div>
    </Provider>
  );
}

export default App;
