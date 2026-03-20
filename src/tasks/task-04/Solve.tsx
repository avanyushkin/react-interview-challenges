/*
- useState для изображений -> показывать(2 пары одинаковых картинок,
9-4=6 пар других разных картинок) и прятать
- стилизуем сеткой 3 на 3, анимацию разворачивания/блюра
- слушатель для двух нажатий, анимка разворачивания, вердикт Good/Wrond
- useState для подсчета кол-ва В/П
*/

import React, { useState, useEffect } from 'react';
import "./styles.css";

const TOTAL_AMOUNT: number = 10;
const DUBLICATE: number = 2;
const MATRIX: number = 9;
const SHOW_TIME: number = 3000;

function Solve () {
  const [imageIndexes, setImageIndexes] = useState<number[]> ([]);
  const [wins, setWins] = useState<number> (0);
  const [games, setGames] = useState<number> (0);
  const [isVisible, setIsVisible] = useState<boolean> (true);

  const [selectedIndexes, setSelectedIndexes] = useState<number[]> ([]);
  const [selectedPositions, setSelectedPositions] = useState<number[]> ([]);
  const [isProcessing, setIsProcessing] = useState<boolean> (false);
  
  const initializeGame = () => {
    let initArray: Array<number> = [];
    for (let i: number = 1; i <= TOTAL_AMOUNT; i += 1) {
      initArray.push (i);
    }
    const shuffledArray = [...initArray].sort (() => Math.random() - 0.5);
    // setImageIndexes ([...shuffledArray]);
    const NOT_DUBLICATE: number = MATRIX - DUBLICATE * 2;
    initArray = [];
    for (let i: number = 0; i < DUBLICATE; i += 1) {
      initArray.push (shuffledArray[i], shuffledArray[i]);
    }
    for (let i: number = DUBLICATE; i < DUBLICATE + NOT_DUBLICATE; i += 1) {
      initArray.push (shuffledArray[i]);
    }
    // console.log ("shuffledArray: ", shuffledArray);
    // console.log ("initArray: ", initArray);
    initArray.sort (() => Math.random () - 0.5);
    setImageIndexes (initArray);

    setSelectedIndexes ([]);
    setSelectedPositions ([]);
    setIsProcessing (false);

    setIsVisible (true);

    const timer = setTimeout (() => {
      setIsVisible (false);
    }, SHOW_TIME);

    return () => clearTimeout (timer);
  }

  useEffect (() => {
    initializeGame ();
  }, [games]);
  // console.log(imageIndexes);

  const handleImageClick = (position: number, imageIndex: number) => {
    if (isVisible || isProcessing || selectedPositions.includes (position)) {
      return;
    }
    const newSelectedIndexes = [...selectedIndexes, imageIndex];
    const newSelectedPositions = [...selectedPositions, position];
    setSelectedIndexes (newSelectedIndexes);
    setSelectedPositions (newSelectedPositions);

    if (newSelectedIndexes.length === 2) {
      setIsProcessing (true);
      if (newSelectedIndexes[0] === newSelectedIndexes[1]) {
        setWins (prev => prev + 1);
      } else {
        setGames (prev => prev + 1);
        return;
      }

      setGames (prev => prev + 1);
      setTimeout (() => {
        setSelectedIndexes ([]);
        setSelectedPositions ([]);
        setIsProcessing (false);
      }, 500);
    }
  }

  return (
  <>
    <div className="images-board">
      {
        imageIndexes.map( (index, position) => {
          try {
            const imageUrl = new URL(`./images/image${index}.jpg`, import.meta.url).href;
            return (
              <div className = {`image ${isVisible ? 'visible' : 'hidden'} ${selectedPositions.includes(position) ? 'selected' : ''}`} 
                   key = {`${index} - ${position}`}
                   onClick = {() => handleImageClick (position, index)}>
                <img src = {imageUrl} alt = {`image${index}`}/>
              </div>
            );
          } catch (error) {
            // console.log(`image ${index} not found`);
            return null;
          }
        })
      }
    </div>
    <div className = "score-board">
      <div className = "wins-amount">Wins - {wins}</div>
      <div className = "loses-amount">Loses - {games - wins}</div>
    </div>
  </>
);
}

export default Solve;

