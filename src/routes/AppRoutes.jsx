import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/User/Login';
import ProprietarioForm from '../components/Proprietario/ProprietarioForm';
import Cadastro from '../components/User/Cadastro';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProprietarioForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
    </Routes>
  );
};

export default AppRoutes;
