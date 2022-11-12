import './App.css';
import BarraNavegacion from './components/navBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import  { Route, Routes } from "react-router-dom";
import  {HomePage}  from './pages/HomePage';
import Canchas from './pages/Canchas';
import Deportes from './pages/Deportes';
import Complejos from './pages/Complejos';

function App() {
  return (
    <>
      <Routes>
        <Route element={<BarraNavegacion />}>
          <Route path="" element={<HomePage />} />
          <Route path="/cancha" element={<Canchas />} />
          <Route path="/complejo" element={<Complejos />} />
          <Route path="/deporte" element={<Deportes />} />
        </Route>
        
      </Routes>
    </>
  );
}

export default App;
