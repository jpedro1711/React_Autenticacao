import FormInput from '../utils/FormInput';
import React, { useContext, useState } from 'react';
import useForm from '../../hooks/useForm';
import { Alert, Button, IconButton, Snackbar, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

const Cadastro = () => {
  const [open, setOpen] = React.useState(false);
  const username = useForm('username');
  const senha = useForm('senha');
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [msg, setMsg] = useState();

  const handleClick = async () => {
    try {
      if (username.validate() && senha.validate()) {
        await context.cadastro(username.value, senha.value);
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
          Cadastro
        </Typography>
        <FormInput
          label="username"
          id="username"
          type="text"
          placeholder="Digite o username"
          {...username}
        />
        <br></br>
        <br></br>
        <FormInput
          label="senha"
          id="senha"
          type="text"
          placeholder="Digite a senha"
          {...senha}
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

export default Cadastro;
