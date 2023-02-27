import React from 'react';

import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

// const arr = [
//   {
//     "title": "Мужские Кроссовки Nike Blazer Min Suede",
//     "price": 12999,
//     "imageUrl": "/img/sneakers/1.jpg"
//   },
//   { "title": "Мужские Кроссовки Nike Air Max 270",
//    "price": 15600,
//   "imageUrl": "/img/sneakers/2.jpg" },
//   {
//     "title": "Мужские Кроссовки Nike Blazer Mid Suede",
//     "price": 8499,
//     "imageUrl": "/img/sneakers/3.jpg"
//   },
//   {
//     "title": "Кроссовки Puma X Aka Boku Future Rider",
//     "price": 7800,
//     "imageUrl": "/img/sneakers/4.jpg"
//   }
// ]

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
  const [items, setItems] = React.useState([
    {
      title: 'Мужские Кроссовки Nike Blazer Mini Suede',
      price: 12999,
      imageUrl: '/img/sneakers/1.jpg',
    },
    {
      title: 'Мужские Кроссовки Nike Air Max 270',
      price: 15600,
      imageUrl: '/img/sneakers/2.jpg',
    },
    {
      title: 'Мужские Кроссовки Nike Blazer Mid Suede',
      price: 8499,
      imageUrl: '/img/sneakers/3.jpg',
    },
    {
      title: 'Кроссовки Puma X Aka Boku Future Rider',
      price: 7800,
      imageUrl: '/img/sneakers/4.jpg',
    },
  ]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCardOpened] = React.useState(false);
  // const [searchValue, setSearchValue] = React.useState('');

  // React.useEffect(() => {
  //   fetch('https://63fbac6f1ff79e133292f748.mockapi.io/:endpoint')
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((json) => setItems(json))
  //     .catch((err) => console.warn(err));
  // }, []);

  const onAddToCart = (obj) => {
    // if (cartItems.contains(obj)) {
    //   return cartItems;
    // }
    setCartItems((prev) => [...prev, obj]);
    // console.log(cartItems);
  };

  // const onChangeSearchInput = (event) => {
  //   setSearchValue();
  // };

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCardOpened(false)} />}
      <Header onClickCart={() => setCardOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items.map((item) => (
            <Card
              key={item.title}
              // id={id}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFavorite={() => console.log('Добавили в закладки')}
              onPlus={(obj) => onAddToCart(obj)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
