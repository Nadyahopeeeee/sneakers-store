import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

// [
//   {
//     title: 'Мужские Кроссовки Nike Blazer Min Suede',
//     price: 12999,
//     imageUrl: '/img/sneakers/1.jpg',
//   },
//   {
//     title: 'Мужские Кроссовки Nike Air Max 270',
//     price: 15600,
//     imageUrl: '/img/sneakers/2.jpg',
//   },
//   {
//     title: 'Мужские Кроссовки Nike Blazer Mid Suede',
//     price: 8499,
//     imageUrl: '/img/sneakers/3.jpg',
//   },
//   {
//     title: 'Кроссовки Puma X Aka Boku Future Rider',
//     price: 7800,
//     imageUrl: '/img/sneakers/4.jpg',
//   },
// ]

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [cartOpened, setCardOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    // fetch('https://63fbac6f1ff79e133292f748.mockapi.io/items')
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((json) => {
    //     console.log(json);
    //     setItems(json.items);
    //   });
    axios
      .get('https://63fbac6f1ff79e133292f748.mockapi.io/items')
      .then((res) => setItems(res.data));
    axios
      .get('https://63fbac6f1ff79e133292f748.mockapi.io/cart')
      .then((res) => setCartItems(res.data));
    axios
      .get('https://63fbac6f1ff79e133292f748.mockapi.io/favorites')
      .then((res) => setFavorites(res.data));
  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://63fbac6f1ff79e133292f748.mockapi.io/cart', obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onAddToFavorite = async (obj) => {
    if (favorites.find((favObj) => favObj.id === obj.id)) {
      axios.delete(`/cart/${obj.id}`);
      // setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
    } else {
      const resp = axios.post('https://63fbac6f1ff79e133292f748.mockapi.io/favorites', obj);
      setFavorites((prev) => [...prev, obj]);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://63fbac6f1ff79e133292f748.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    // console.log(id);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer onRemove={onRemoveItem} items={cartItems} onClose={() => setCardOpened(false)} />
      )}
      <Header onClickCart={() => setCardOpened(true)} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onAddToCart={onAddToCart}
              onAddToFavorite={onAddToFavorite}
              onChangeSearchInput={onChangeSearchInput}
            />
          }
        ></Route>
        <Route
          path="/favorites"
          element={<Favorites items={favorites} onAddToFavorite={onAddToFavorite} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
