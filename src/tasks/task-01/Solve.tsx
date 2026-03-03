import React, { useState } from "react";
import "./styles.css";

const colors: Array<string> = [
    "#f60505", "#a605b5", "#f6a505", "#f2c501", "#a6a5b5", "#f2a5d5",
    "#4CAF50", "#2196F3", "#FF9800", "#9C27B0", "#00BCD4", "#FF4081", 
    "#8BC34A", "#673AB7", "#FF5722", "#607D8B"
];

function getRandomColors (cnt: number): string[] {
  const shuffled = [...colors];
  const ls: string[] = [];
  for (let i: number = 0; i < cnt; i += 1) {
    const j = Math.floor (Math.random () * (colors.length - 1));
    ls.push (shuffled[j]);
    shuffled.splice (j, 1);
  }
  return ls;
}

function Solve () {
  const [answer, setAnswer] = useState (-1);
  const randomColorsArray: Array<string> = [...getRandomColors (3)];
  const [variants, setVariants] = useState ([...randomColorsArray]);
  const answerIndex: number = Math.floor (Math.random () * 3)
  const [correctColor, setCorrectColor] = useState (randomColorsArray[answerIndex]);

  const ShowColor = () => {
    const colorHolderStyle: React.CSSProperties = {
      backgroundColor: `${correctColor}`,
      height: "200px",
    };
    return (
        <div className = "color-holder" style = {colorHolderStyle}>
        .
        </div>
    );
  }

  return (
    <>
      <ShowColor />
      {
        answer !== -1 ? (
           answer === answerIndex ? ( <h2 className = "correct-answer">Correct Answer!</h2>) : 
                                      (<h2 className = "wrong-answer">Wrong Answer</h2>)
        ) : (
          <div className = "answer-buttons">
            <button onClick = { () => {setAnswer (0), setTimeout (() => {
                window.location.reload ();
            }, 1000)}}>{variants[0]}</button>
            <button onClick = { () => {setAnswer (1), setTimeout (() => {
                window.location.reload ();
            }, 1000)}}>{variants[1]}</button>
            <button onClick = { () => {setAnswer (2), setTimeout (() => {
                window.location.reload ();
            }, 1000)}}>{variants[2]}</button>
          </div>
        )
      }  
    </>
  );
}

export default Solve;