import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Registro from './pages/registro';
import InicioSesion from './pages/inicioSesion';
import Dashboard from './pages/dashboard';
import Perfil from './pages/perfil';

function App() {
  const uid = useSelector(state => state.auth.uid); 
  return (
    <Router>
      <Routes>
        {/* Ruta inicial: redirige si está logueado */}
        <Route path="/" element={<Navigate to={uid ? '/dashboard' : '/inicioSesion'} />} />

        {/* Rutas públicas */}
        <Route path="/registro" element={<Registro />} />
        <Route path="/inicioSesion" element={<InicioSesion />} />

        {/* Rutas protegidas: solo visibles si hay UID */}
        {uid && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/perfil" element={<Perfil />} />
          </>
        )}

        {/* Redirección para rutas no válidas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
