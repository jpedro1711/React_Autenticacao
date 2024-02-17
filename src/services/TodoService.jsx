import React, { useState } from 'react';
import axios from 'axios';
const TodoService = () => {
  const [token, setToken] = useState(null);

  const getToken = () => {
    return localStorage.getItem('token');
  };
  let config = {
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  };

  async function Post(data) {
    var res = await axios.post('http://localhost:5240/api/Todo', data, config);
    return res;
  }

  async function Update(todoId, todos, userID) {
    let todo = todos.find((t) => t.todoId == todoId);
    let updatedTodo = {
      todoId: todoId,
      description: todo.description,
      deadline: todo.deadline,
      userId: parseInt(userID),
      done: !todo.done,
    };
    console.log(updatedTodo);
    await axios.put(
      `http://localhost:5240/api/Todo/${todoId}`,
      updatedTodo,
      config
    );

    let updatedTodos = [...todos];

    let index = updatedTodos.findIndex((t) => t.todoId === todoId);

    updatedTodos[index] = updatedTodo;

    updatedTodos.sort((a, b) => Number(a.done) - Number(b.done));
    return updatedTodos;
  }

  async function Get(url) {
    const res = await axios.get(url, config);
    return res;
  }

  return {
    Get: (url) => Get(url),
    Post: (url, data) => Post(url, data),
    Update: (todoId, todos, userID) => Update(todoId, todos, userID),
  };
};

export default TodoService;
