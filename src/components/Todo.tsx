import React, { FC } from 'react';

interface Todo {
  title: string;
  description: string;
  isDone: boolean;
}

const Todo: FC<Todo>= ({ title, description, isDone }) => {
  return (
    <div>
      <p>{title}</p>
      <p>{description}</p>
      <input type="checkbox" checked={isDone} />
    </div>
  )
}

export default Todo;
