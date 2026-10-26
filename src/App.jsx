import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Contact from './pages/Contact';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Services />} />
        <Route path="/servicios/:slug" element={<ServiceDetail />} />
        <Route path="/contacto" element={<Contact />} />
        <Route
          path="*"
          element={
            <div className="container py-5 text-center">
              <h1 className="display-5 fw-bold">404</h1>
              <p className="text-body-secondary">La página que buscás no existe.</p>
              <a href="/" className="btn btn-primary">Volver al inicio</a>
            </div>
          }
        />
      </Routes>
    </Layout>
  );
}
