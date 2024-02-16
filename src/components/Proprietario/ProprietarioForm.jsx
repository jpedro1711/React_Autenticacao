import React, { useContext, useEffect, useState } from 'react';
import useForm from '../../hooks/useForm';
import FormInput from '../utils/FormInput';
import HttpService from '../../services/HttpService';
import {
  Alert,
  AppBar,
  Button,
  IconButton,
  Snackbar,
  Toolbar,
  Typography,
} from '@mui/material';
import AuthContext from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProprietarioForm = () => {
  const [open, setOpen] = React.useState(false);
  const [openAuth, setOpenAuth] = React.useState(false);
  const context = useContext(AuthContext);
  const nome = useForm('nome');
  const email = useForm('email');
  const cpf = useForm('cpf');
  const dataNascimento = useForm('dataNascimento');
  const cnpj = '';
  const http = HttpService();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [dis, setDis] = useState(false);

  useEffect(() => {
    if (context.user) {
      setUser(context.user);
      setOpenAuth(false);
      setDis(false);
    } else {
      if (context.loading == false) {
        setDis(true);
        setOpenAuth(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    }
  }, [context.user]);

  function handleLogout() {
    context.logout();
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (user && user.username) {
      console.log(`Logged in user: ${user.username}`);
    }
    if (
      nome.validate() &&
      email.validate() &&
      cpf.validate() &&
      dataNascimento.validate()
    ) {
      const proprietario = {
        nome: nome.value,
        email: email.value,
        cpf: cpf.value,
        cnpj: cnpj,
        dataNascimento: dataNascimento.value,
      };
      console.log(proprietario);
      http
        .Post('http://localhost:5137/Proprietario', proprietario)
        .then(
          setOpen(true),
          nome.setValue(''),
          email.setValue(''),
          cpf.setValue(''),
          dataNascimento.setValue('')
        );
    } else {
      console.log('Não enviar');
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleCloseAuth = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAuth(false);
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
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Proprietário cadastrado
        </Alert>
      </Snackbar>
      <Snackbar
        open={openAuth}
        autoHideDuration={6000}
        onClose={handleCloseAuth}
        action={action}
      >
        <Alert
          onClose={handleCloseAuth}
          severity="warning"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Você deve estar logado para acessar este recurso
        </Alert>
      </Snackbar>
      <form
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" gutterBottom>
          Cadastro de proprietários
        </Typography>
        <FormInput
          label="Nome"
          id="nome"
          type="text"
          placeholder="Digite o nome"
          {...nome}
        />
        <br></br>
        <br></br>
        <FormInput
          label="Email"
          id="email"
          type="email"
          placeholder="Digite o email"
          {...email}
        />
        <br></br>
        <br></br>
        <FormInput
          label="CPF"
          id="cpf"
          type="cpf"
          placeholder="Digite o cpf"
          {...cpf}
        />
        <br></br>
        <br></br>
        <FormInput
          label="Data de nascimento"
          id="dataNascimento"
          type="datetime-local"
          placeholder="Selecione a data de nascimento"
          {...dataNascimento}
        />
        <br></br>
        <br></br>
        <Button variant="contained" onClick={handleSubmit} disabled={dis}>
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default ProprietarioForm;
