import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getFruit } from '../redux/apiCall';
import FruitList from './FruitList';

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFruit());
  }, [dispatch]);

  return (
    <div style={{ backgroundColor: '#f2f2f2' }} className="container">
      <FruitList />
    </div>
  );
}

export default Home;
