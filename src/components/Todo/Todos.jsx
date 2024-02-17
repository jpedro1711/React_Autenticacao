import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import { Delete, DeleteRounded } from '@mui/icons-material';
import TodoService from '../../services/TodoService';

const Todos = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [todos, setTodos] = useState(null);
  const [user, setUser] = useState(null);
  const [open, setOpen] = React.useState(false);
  const todoService = TodoService();

  const [deleteId, setDeleteId] = useState(null);

  const handleClickOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const fetchData = async (id) => {
    axios
      .get(`http://localhost:5240/api/Todo/User/${id}`, {
        headers: { Authorization: 'Bearer ' + getToken() },
      })
      .then((res) => {
        var res = res.data;
        res.sort((a, b) => Number(a.done) - Number(b.done));
        setTodos(res);
      })
      .catch((err) => console.log(err));
  };

  async function updateDone(todoId) {
    var updated = await todoService.Update(todoId, todos, user.userID);
    setTodos(updated);
  }

  async function handleDelete(id) {
    await axios.delete(`http://localhost:5240/api/Todo/${id}`, {
      headers: {
        Authorization: `Bearer ` + getToken(),
      },
    });

    let updatedTodos = todos.filter((o) => o.todoId != id);

    updatedTodos.sort((a, b) => Number(a.done) - Number(b.done));
    setTodos(updatedTodos);
    setOpen(false);
  }

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
                  sx={{
                    fontSize: 18,
                    textDecoration: todo.done ? 'line-through' : '',
                  }}
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
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    {'Feito: '}
                    <Checkbox
                      checked={todo.done}
                      onClick={() => updateDone(todo.todoId)}
                    />
                  </div>
                  <div>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleClickOpen(todo.todoId)}
                    >
                      <Delete />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {`Tem certeza que deseja excluir o todo com id ${deleteId}`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Lembre-se que esta é uma ação irreversível.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button
              color="error"
              onClick={() => handleDelete(deleteId)}
              autoFocus
            >
              Excluir
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
};

export default Todos;
