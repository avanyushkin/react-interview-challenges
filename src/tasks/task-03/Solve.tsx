import React, { useState } from "react";
import "./styles.css"

interface Circle {
  x: number;
  y: number;
  id: number;
}

class Stack<T> {
  private items: T[] = [];
  push (item: T): void {
    this.items.push (item);
  }
  pop (): T | undefined {
    return this.items.pop ();
  }
  peek (): T | undefined {
    return this.items[this.items.length - 1];
  }
  isEmpty (): boolean {
    return this.items.length === 0;
  }
  size (): number {
    return this.items.length;
  }
}

function Solve () {
  const [past, setPast] = useState (() => new Stack<Circle[]> ());
  const [curr, setCurr] = useState<Circle[]> ();
  const [future, setFuture] = useState (() => new Stack<Circle[]> ());

  const [circles, setCircles] = useState<Circle[]> ([]);
  const handleBoardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect ();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newCircle = {
      id: Date.now (), x: x, y: y
    };
    setCircles ([...circles, newCircle]);
  }

  return (
    <>
      <div className = "board" onClick = {handleBoardClick}>
        {circles.map (circle => (
          <div key = {circle.id} className = "board-circle" style = {
              {position: "absolute", left: circle.x, top: circle.y, width: '30px', height: '30px',
               backgroundColor: 'white', pointerEvents: 'none', borderRadius: '50%'
              }
          }>
          </div>
        ))}
      </div>
      <div className = "state-buttons">
        <button className = "button-back">BACK</button>
        <button className = "button-forward">FORWARD</button>
      </div>
    </>
  );
}

export default Solve;