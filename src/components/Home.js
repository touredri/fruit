import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiArrowRight } from 'react-icons/fi';
import { fetchImageUrlByName, getFruit } from '../redux/apiCall';

function Home() {
  const fruit = useSelector((store) => store.fruit);
  const dispatch = useDispatch();
  const [fruitElements, setFruitElements] = useState(null);

  useEffect(() => {
    dispatch(getFruit());
  }, [dispatch]);

  useEffect(() => {
    const fetchFruitElements = async () => {
      try {
        if (typeof fruit.data === 'string') {
          // add check to ensure fruit.data is a string
          const fruitData = JSON.parse(fruit.data);
          if (Array.isArray(fruitData)) {
            const promises = await Promise.allSettled(
              fruitData.map(async (element) => {
                // use Promise.allSettled for better performance
                try {
                  const imageUrl = await fetchImageUrlByName(element.name);
                  return (
                    <figure key={element.id} style={{ position: 'relative' }}>
                      <img src={imageUrl} alt={element.name} style={{ width: '100%' }} />
                      <figcaption style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        textAlign: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: '#fff',
                        padding: '1rem',
                        height: '100px',
                      }}
                      >
                        <h2>{element.name}</h2>
                        <h3 style={{ margin: '1px' }}>
                          Calorie:
                          {' '}
                          {element.nutritions.calories}
                        </h3>
                        <FiArrowRight size={24} color="red" className="custom-class" />
                      </figcaption>
                    </figure>
                  );
                } catch (error) {
                  return null;
                }
              }),
            );
            const resolvedPromises = promises
              .filter((promise) => promise.status === 'fulfilled')
              .map((promise) => promise.value); // filter out rejected promises
            setFruitElements(
              resolvedPromises.length > 0 ? (
                resolvedPromises
              ) : (
                <div>No fruit data available</div>
              ),
            ); // check if any resolved promises are returned
          } else {
            setFruitElements(<div>No fruit data available</div>);
          }
        } else {
          setFruitElements(<div>No fruit data available</div>);
        }
      } catch (error) {
        // add error handling for JSON.parse()
        setFruitElements(<div>Error retrieving fruit data</div>);
      }
    };

    fetchFruitElements();
  }, [fruit.data]);

  return (
    <div style={{ backgroundColor: '#f2f2f2' }} className="container">
      {fruitElements}
    </div>
  );
}

export default Home;
