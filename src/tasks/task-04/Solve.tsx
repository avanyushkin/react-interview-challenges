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

function Solve () {
  const [imageIndexes, setImageIndexes] = useState<number[]> ([]);
  useEffect (() => {
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
  }, []);
  // console.log(imageIndexes);
  return (
  <>
    <div className="images-board">
      {
        imageIndexes.map(index => {
          try {
            const imageUrl = new URL(`./images/image${index}.jpg`, import.meta.url).href;
            return (
              <div className="image" key={Date.now ()}>
                <img src={imageUrl} alt={`image${index}`}/>
              </div>
            );
          } catch (error) {
            // console.log(`image ${index} not found`);
            return null;
          }
        })
      }
    </div>
  </>
);
}

export default Solve;

