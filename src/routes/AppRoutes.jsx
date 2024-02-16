import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/User/Login';
import Cadastro from '../components/User/Cadastro';
import Todos from '../components/Todo/Todos';
import CadastrarTodo from '../components/Todo/CadastrarTodo';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Todos />} />
      <Route path="/cadastrarTodo" element={<CadastrarTodo />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
    </Routes>
  );
};

export default AppRoutes;
