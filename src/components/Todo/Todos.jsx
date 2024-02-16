import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, CardContent, Typography } from '@mui/material';

const Todos = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [todos, setTodos] = useState(null);
  const [user, setUser] = useState(null);

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const fetchData = async (id) => {
    axios
      .get(`http://localhost:5240/api/Todo/User/${id}`, {
        headers: { Authorization: 'Bearer ' + getToken() },
      })
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (context.user) {
      setUser(context.user);
      fetchData(context.user.userID);
    } else {
      console.log(context.loading);
      if (context.loading == false) {
        navigate('/login');
      }
    }
  }, [context.user, context.loading]);

  return (
    <div
      style={{
        padding: '20px',
        marginBottom: '20px',
      }}
    >
      {' '}
      <div>
        <Button variant="contained" onClick={() => navigate('/cadastrarTodo')}>
          Cadastrar Todo
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
        }}
      >
        {todos &&
          todos.map((todo) => (
            <Card key={todo.todoId} sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 18 }}
                  color="text.primary"
                  gutterBottom
                >
                  {todo.description}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {todo.deadline}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {'Feito: ' + todo.done}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Todos;
