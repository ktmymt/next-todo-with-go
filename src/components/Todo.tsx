import React, { FC } from 'react';

interface Todo {
  title: string;
  isDone: boolean;
}

const Todo: FC<Todo>= ({ title, isDone }) => {
  return (
    <div>
      <p>{title}</p>
      <input type="checkbox" checked={isDone} />
    </div>
  )
}

export default Todo;
