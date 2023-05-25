import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getFruit from '../redux/apiCall';

function Home() {
  const fruit = useSelector((store) => store.fruit);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFruit());
  }, [dispatch]);

  let fruitElements = null;

  try {
    const fruitData = JSON.parse(fruit.data);
    if (Array.isArray(fruitData)) {
      fruitElements = fruitData.map((element) => (
        <div key={element.id}>
          <h1>{element.name}</h1>
          <div>
            Calorie:
            {element.nutritions.calories}
          </div>
        </div>
      ));
    } else {
      fruitElements = <div>No fruit data available</div>;
    }
  } catch (error) {
    fruitElements = <div>Error retrieving fruit data</div>;
  }

  return (
    <div>
      Home
      {fruitElements}
    </div>
  );
}

export default Home;
