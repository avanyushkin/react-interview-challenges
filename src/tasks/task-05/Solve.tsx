import React, { useState } from 'react';
import './styles.css';

/*
- интерфейс для ноды
- при ЛКМ открытие/закрытие -> < - > и показ child[]
- при ПКМ возможность добавить child с возможностью заполнение имени / стандартное
*/

const files = {
  children: [
    {
      name: "node_modules",
      children: [
        {
          name: 'joi'
        }
      ]
    },
    {
      name: "packeje.json",
    },
    {
      name: "vite.ts",
    },
  ],
};

type TEntry = {
  name: string;
  children?: TEntry[];
};

function Entry ({ entry, depth }: { entry: TEntry; depth: number } ) {
  return (
    <div style = {{paddingLeft: `${depth * 10}px`}}>
      {entry.name}
      {entry.children?.map ((entry) => (<Entry entry = {entry} depth = {depth + 1} />))}
    </div>
  );
}

function Solve () {
  return (
     <div className = "task-five">
      {files.children.map ((entry) => (
        <Entry entry = {entry} depth = {1} />
      ))}
     </div>
  );
}

export default Solve;