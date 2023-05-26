import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaCogs } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { MdMic } from 'react-icons/md';
import { fetchImageUrlByName, fetchFruitData } from '../redux/apiCall';

const Details = () => {
  const { fruitName } = useParams();
  const [showFruit, setFruit] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const imgUrl = await fetchImageUrlByName(fruitName);
      const fruit = await fetchFruitData(fruitName);
      setFruit({ imgUrl, fruit });
    };

    fetchData();
  }, [fruitName]);
  return (
    <div>
      <div className="detailNav">
        <Link to="/">
          <FaArrowLeft />
        </Link>
        <h3 style={{ margin: '5px', color: 'green' }}>{fruitName}</h3>
        <div style={{ display: 'flex' }}>
          <MdMic className="icon" />
          <FaCogs className="icon" />
        </div>
      </div>
      {showFruit && (
        <div>
          <img src={showFruit.imgUrl} alt="img" className="detailImg" />
          <h3 style={{ textAlign: 'center', color: 'green' }}>Nutritions contents</h3>
          <div className="detailContent">
            <div className="card">
              <h3>Fat:</h3>
              <span>{showFruit.fruit.fat}</span>
            </div>
            <div className="card">
              <h3>Sugar:</h3>
              <span>{showFruit.fruit.sugar}</span>
            </div>
            <div className="card">
              {' '}
              <h3>Carbohydrates:</h3>
              <span>{showFruit.fruit.carbohydrates}</span>
            </div>
            <div className="card">
              <h3>Protein:</h3>
              <span>{showFruit.fruit.protein}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
