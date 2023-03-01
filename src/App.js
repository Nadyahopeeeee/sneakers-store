import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

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
    axios.post('https://63fbac6f1ff79e133292f748.mockapi.io/favorites', obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onAddToFavorite = (obj) => {
    axios.post('https://63fbac6f1ff79e133292f748.mockapi.io/favorites', obj);
    setFavorites((prev) => [...prev, obj]);
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
        <Route path="/test" element={<h3>yarn add react-router-dom</h3>}></Route>
      </Routes>
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            {searchValue && (
              <img
                onClick={() => setSearchValue('')}
                className="clear cu-p"
                src="/img/btn-remove.svg"
                alt="Close"
              />
            )}
            <input value={searchValue} onChange={onChangeSearchInput} placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items
            .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
            .map((item) => (
              <Card
                key={item.title}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onFavorite={(obj) => onAddToFavorite(obj)}
                onPlus={(obj) => onAddToCart(obj)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
