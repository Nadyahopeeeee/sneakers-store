import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Drawer from './components/Drawer';
import AppContext from './context';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

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
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const itemsResponse = await axios.get('https://10cnehewsg.api.quickmocker.com/items');
        const cartResponse = await axios.get('https://10cnehewsg.api.quickmocker.com/cart');
        const favoritesResponse = await axios.get(
          'https://10cnehewsg.api.quickmocker.com/favorites',
        );

        console.log(itemsResponse.data);
        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        console.log(error, 'Ошибка загрузки данных с сервера');
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((elem) => Number(elem.parentId) !== Number(obj.id)));
        await axios.delete(`https://10cnehewsg.api.quickmocker.com/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post('https://10cnehewsg.api.quickmocker.com/cart', obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      console.log('Ошибка при добавлениии в корзину');
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://10cnehewsg.api.quickmocker.com/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      console.log('Ошибка при удалении из корзины');
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://10cnehewsg.api.quickmocker.com/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
        console.log(favorites)
      } else {
        const { data } = await axios.post('https://10cnehewsg.api.quickmocker.com/favorites', obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      console.log('не удалось добавить избранный товар');
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        setCardOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          onRemove={onRemoveItem}
          items={cartItems}
          onClose={() => setCardOpened(false)}
          opened={cartOpened}
        />

        <Header onClickCart={() => setCardOpened(true)} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onAddToCart={onAddToCart}
                onAddToFavorite={onAddToFavorite}
                onChangeSearchInput={onChangeSearchInput}
                isLoading={isLoading}
              />
            }
          ></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
