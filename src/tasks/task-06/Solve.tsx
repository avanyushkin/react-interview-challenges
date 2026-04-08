import React, { useRef, useState } from 'react';
import './styles.css';

const IMAGES_AMOUNT: number = 10;

function Solve () {
  const [index, setIndex] = useState<number> (1);
  const intervalRef = useRef<number | null> (null);
  
  const updateIndex = (x: number) => {
    setIndex ((prevIndex) => {
      let newIndex: number = prevIndex + x;
      if (newIndex === 0) {
        newIndex = IMAGES_AMOUNT;
      }
      if (newIndex === IMAGES_AMOUNT + 1) {
        newIndex = 1;
      }
      return newIndex;
    });
  }

  const startSlideshow = () => {
    if (intervalRef.current) {
      clearInterval (intervalRef.current);
    }
    intervalRef.current = window.setInterval (() => {
      updateIndex (1);
    }, 500);
  }

  const stopSlideshow = () => {
    if (intervalRef.current) {
      clearInterval (intervalRef.current);
      intervalRef.current = null;
    }
  }

  const getImageUrl = (index: number): string => {
    return new URL (`../task-04/images/image${index}.jpg`, import.meta.url).href;
  };

  React.useEffect (() => {
    return () => {
      if (intervalRef.current) {
        clearInterval (intervalRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className = "image-holder">
        <img src={getImageUrl (index)} alt="image" />
      </div>
      <div className = "buttons-holder">
        <button onClick = {() => updateIndex (-1)}>Back</button>
        <button onClick = {() => updateIndex (1)}>Forward</button>
        <button onClick = {startSlideshow}>Start</button>
        <button onClick = {stopSlideshow}>Stop</button>
      </div>
    </>
  );
}

export default Solve;