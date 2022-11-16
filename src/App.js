import './App.css';
import { ALQUILERES, CANCHAS, COMPLEJOS, DEPORTES, LOGIN, LOGOUT, PERSONAS, PRIVATE } from './config/routes/paths';
import BarraNavegacion from './components/navBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import  { BrowserRouter, Route, Routes } from "react-router-dom";
import  {HomePage}  from './pages/HomePage';
import Login from './pages/Login';
import Canchas from './pages/Canchas';
import Deportes from './pages/Deportes';
import Complejos from './pages/Complejos';
import Alquileres from './pages/Alquileres';
import Personas from './pages/Personas';
import Logout from './pages/Logout';
import { AuthContextProvider } from './contexts/authContext';
import PublicRoute from './components/router/PublicRoute';
import PrivateRoute from './components/router/PrivateRoute';

function App() {
  return (
  
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={LOGIN} element={< PublicRoute />}>
              <Route index element={<Login />}/>
            </Route>
            <Route path={PRIVATE} element={<PrivateRoute />}>
              <Route element={<BarraNavegacion />}>
                <Route index element={<HomePage />} />
                <Route path={ALQUILERES} element={<Alquileres />} />
                <Route path={CANCHAS} element={<Canchas />} />
                <Route path={COMPLEJOS} element={<Complejos />} />
                <Route path={DEPORTES} element={<Deportes />} />
                <Route path={PERSONAS} element={<Personas />} />
                <Route path={LOGOUT} element={<Logout/>}/>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    
  );
}

export default App;
