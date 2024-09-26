import { Link, NavLink } from 'react-router-dom';
import './components.css';



const Navbar = () => {

  
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Valores</Link>
        <NavLink to="/config">Config</NavLink>
        <NavLink to="/lugares">Localidades</NavLink>
        <NavLink to="/historico">Historico</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;