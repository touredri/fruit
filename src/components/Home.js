import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { fetchImageUrlByName, getFruit } from '../redux/apiCall';
import NavBar from './NavBar';

function Home() {
  const fruit = useSelector((store) => store.fruit);
  const dispatch = useDispatch();
  const [fruitElements, setFruitElements] = useState(null);
  const [filterFruit, setFilterFruit] = useState('');

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
                if (element.name.toLowerCase().indexOf(filterFruit.toLocaleLowerCase()) === -1) {
                  return Promise.resolve();
                }
                // use Promise.allSettled for better performance
                try {
                  const imageUrl = await fetchImageUrlByName(element.name);
                  return (
                    <figure key={element.id} style={{ position: 'relative' }}>
                      <img
                        src={imageUrl}
                        alt={element.name}
                        style={{ width: '100%' }}
                      />
                      <Link to={`/Details/${element.name}`}>
                        <figcaption
                          style={{
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
                            {element.nutritions.calories}
                          </h3>
                          <FiArrowRight
                            size={24}
                            color="red"
                            className="custom-class"
                          />
                        </figcaption>
                      </Link>
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
            setFruitElements(<div>Wait for data....</div>);
          }
        } else {
          setFruitElements(<div>Wait for data....</div>);
        }
      } catch (error) {
        // add error handling for JSON.parse()
        setFruitElements(<div>Error retrieving fruit data</div>);
      }
    };

    fetchFruitElements();
  }, [filterFruit, fruit.data]);

  return (
    <div style={{ backgroundColor: '#f2f2f2' }} className="container">
      <NavBar filterFruit={filterFruit} onFilterChange={setFilterFruit} />
      {fruitElements}
    </div>
  );
}

export default Home;
