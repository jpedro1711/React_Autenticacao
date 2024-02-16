import {
  AppBar,
  Box,
  Button,
  IconButton,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [user, setUser] = useState(null);
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    context.logout();
  }

  function handleNavigate(url) {
    navigate(url);
  }

  useEffect(() => {
    setUser(context.user);
  }, [context.user]);

  return (
    <div className="header">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                ></IconButton>
                <Typography variant="h6" color="inherit" component="div">
                  Auth + Proprietários
                </Typography>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                {!user ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <MenuItem onClick={() => handleNavigate('/cadastro')}>
                      <Typography textAlign="center">Cadastro</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => handleNavigate('/login')}>
                      <Typography textAlign="center">Login</Typography>
                    </MenuItem>
                  </div>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <MenuItem onClick={() => handleNavigate('/')}>
                      <Typography textAlign="center">Proprietarios</Typography>
                    </MenuItem>
                    <Button variant="inherit">{user.username}</Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleLogout}
                    >
                      Sair
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Header;
