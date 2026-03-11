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
  const [newCurr, setNewCurr] = useState<Circle[]> ();
  const [future, setFuture] = useState (() => new Stack<Circle[]> ());

  // const [circles, setCircles] = useState<Circle[]> ([]);
  const handleBoardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect ();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newCircle = {
      id: Date.now (), x: x, y: y
    };
    // setCircles ([...circles, newCircle]);

    const newPast = new Stack<Circle[]>;
    while (!past.isEmpty ()) {
      newPast.push (past.pop ()!);
    }
    newPast.push (curr || []);
    setPast (newPast);
    const newFuture = new Stack<Circle[]>;
    setFuture (newFuture);
    setCurr ([...(curr || []), newCircle]);
  }

  const handleBack = () => {
    if (past.size () > 0 && curr !== undefined) {
        const newFuture = new Stack<Circle[]>();
        while (!future.isEmpty()) {
          newFuture.push(future.pop()!);
        }
        newFuture.push(curr);
        const previousState = past.pop()!;
        const newPast = new Stack<Circle[]>();
        while (!past.isEmpty()) {
          newPast.push(past.pop()!);
        }
        setFuture(newFuture);
        setPast(newPast);
        setCurr(previousState);
    }
  }

  const handleForward = () => {
    if (future.size() > 0 && curr !== undefined) {
        const newPast = new Stack<Circle[]>();
        while (!past.isEmpty()) {
        newPast.push(past.pop()!);
        }
        newPast.push(curr);
        const nextState = future.pop()!;
        const newFuture = new Stack<Circle[]>();
        while (!future.isEmpty()) {
        newFuture.push(future.pop()!);
        }
        setPast(newPast);
        setFuture(newFuture);
        setCurr(nextState);
    }
  }

  return (
    <>
      <div className = "board" onClick = {handleBoardClick}>
        {curr !== undefined ? (curr.map (circle => (
          <div key = {circle.id} className = "board-circle" style = {
              {position: "absolute", left: circle.x, top: circle.y, width: '30px', height: '30px',
               backgroundColor: 'white', pointerEvents: 'none', borderRadius: '50%'
              }
          }>
          </div>
        ))) : (<div></div>)}
      </div>
      <div className = "state-buttons">
        <button className = "button-back" onClick = {handleBack}>BACK</button>
        <button className = "button-forward" onClick = {handleForward}>FORWARD</button>
      </div>
    </>
  );
}

export default Solve;