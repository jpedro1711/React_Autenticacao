import FormInput from '../utils/FormInput';
import React, { useContext, useState } from 'react';
import useForm from '../../hooks/useForm';
import { Alert, Button, IconButton, Snackbar, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

const CadastrarTodo = () => {
  const [open, setOpen] = React.useState(false);
  const descricao = useForm('descricao');
  const dtLimite = useForm('dtLimite');
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [msg, setMsg] = useState();

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const handleClick = async () => {
    try {
      if (descricao.validate() && dtLimite.validate()) {
        axios.post(
          'http://localhost:5240/api/Todo',
          {
            description: descricao.value,
            deadline: dtLimite.value,
            userId: context.user.userID,
          },
          {
            headers: { Authorization: 'Bearer ' + getToken() },
          }
        );
        navigate('/');
      } else {
        setMsg('campos inválidos');
        setOpen(true);
      }
    } catch (error) {
      setMsg('Erro. Username duplicado');
      setOpen(true);
      console.log(error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        X
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      ></IconButton>
    </React.Fragment>
  );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
        alignItems: 'start',
      }}
    >
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={action}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {msg}
        </Alert>
      </Snackbar>
      <form>
        <Typography variant="h3" gutterBottom>
          Criar todo
        </Typography>
        <FormInput
          label="Descrição"
          id="description"
          type="text"
          placeholder="Digite a descricao"
          {...descricao}
        />
        <br></br>
        <br></br>
        <FormInput
          label="Data limite"
          id="dtLimite"
          type="datetime-local"
          {...dtLimite}
        />
        <br></br>
        <br></br>
        <Button variant="contained" onClick={handleClick}>
          Cadastrar
        </Button>
      </form>
    </div>
  );
};

export default CadastrarTodo;
