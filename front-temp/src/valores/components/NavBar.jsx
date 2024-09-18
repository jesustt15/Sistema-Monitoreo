
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Inicio</Link>
      </div>
      <div className="navbar-links">
        <Link to="/filter">Opciones de Filtro</Link>
      </div>
    </nav>
  );
};

export default Navbar;
