import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { fetchImageUrlByName } from '../redux/apiCall';
import NavBar from './NavBar';

function FruitList() {
  const fruit = useSelector((store) => store.fruit);
  const [fruitElements, setFruitElements] = useState(null);
  const [filterFruit, setFilterFruit] = useState('');

  useEffect(() => {
    const fetchFruitElements = async () => {
      try {
        if (typeof fruit.data === 'string') {
          // Check if fruit.data is a string
          const fruitData = JSON.parse(fruit.data);
          if (Array.isArray(fruitData)) {
            const promises = await Promise.allSettled(
              fruitData.map(async (element) => {
                if (element.name.toLowerCase().indexOf(filterFruit.toLowerCase()) === -1) {
                  return Promise.resolve();
                }
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
                            {' '}
                            {element.nutritions.calories}
                          </h3>
                          <FiArrowRight size={24} color="red" className="custom-class" />
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
              .map((promise) => promise.value);
            setFruitElements(
              resolvedPromises.length > 0 ? (
                resolvedPromises
              ) : (
                <div>No fruit data available</div>
              ),
            );
          } else {
            setFruitElements(<div>Wait for data....</div>);
          }
        } else {
          setFruitElements(<div>Wait for data....</div>);
        }
      } catch (error) {
        setFruitElements(<div>Error retrieving fruit data</div>);
      }
    };

    fetchFruitElements();
  }, [filterFruit, fruit.data]);

  return (
    <>
      <NavBar filterFruit={filterFruit} onFilterChange={setFilterFruit} />
      {fruitElements}
    </>
  );
}

export default FruitList;
