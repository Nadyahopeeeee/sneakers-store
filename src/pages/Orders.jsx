import React from 'react';
import axios from 'axios';

import Card from '../components/Card';
import AppContext from './context';

function Orders() {
  const { onAddToFavorite, onAddToCart } = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    try {
      (async () => {
        const { data } = await axios.get('https://63fbac6f1ff79e133292f748.mockapi.io/orders');
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      })();
    } catch (error) {
      console.log('Заказ не получен');
    }
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap">
        {[isLoading ? [...Array(4)] : orders].map((item) => (
          <Card key={item.id} loading={isLoading} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
