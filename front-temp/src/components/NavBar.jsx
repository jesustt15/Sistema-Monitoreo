import { NavLink} from 'react-router-dom';
import './components.scss';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';



const Navbar = () => {

  const {logout} = useAuth();
  const {active, setActive } = useState('');

  const handleClick = (name) =>{
    setActive(name);

  }

  const handleLogout = () =>{
    logout();
  }
  
  return (
    <nav className="navbar">
      <div className="usuario">Jesus Toussaint</div>
      <div className="navbar-brand">
        <NavLink
        className={`nav-link ${active === 'valores' ? 'active' : ''}`}
        onClick={ () => handleClick('valores')}
        to="/">Valores</NavLink>
        <NavLink 
        className={`nav-link ${active === 'config' ? 'active' : ''}`}
        onClick={ () => handleClick('config')}
        to="/config">Config</NavLink>
        <NavLink 
        className={`nav-link ${active === 'lugares' ? 'active' : ''}`}
        onClick={ () => handleClick('lugares')}
        to="/lugares">Localidades</NavLink>
        <NavLink 
        className={`nav-link ${active === 'hist' ? 'active' : ''}`}
        onClick={ () => handleClick('hist')}
        to="/historico">Histórico</NavLink>
        <button onClick={handleLogout}>Salir</button>
      </div>
    </nav>
  );
};

export default Navbar;