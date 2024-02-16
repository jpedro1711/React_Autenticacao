import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/utils/Header';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
