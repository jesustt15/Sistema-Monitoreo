import { NavLink} from 'react-router-dom';
import './components.scss';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import Profile from '../assets/profile.jfif';



const Navbar = () => {

  const {logout, user } = useAuth();
  const {active, setActive } = useState('');

  const handleClick = (name) =>{
    setActive(name);

  }

  const handleLogout = () =>{
    logout();
  }
  
  return (
    <nav className="navbar">
      <div className="usuario">
          <div className="img-container">
          <div className="img-halo">
            <div className="user-img">
                <img src={Profile} alt="profile" className="profile" />
            </div>
          </div> 
        </div> 
        <div className="user-info">
          <div className="user-name">{user.name}</div>
          <div className="user-email">{user.email}</div>
        </div>
      </div>
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
        <button className='logout' onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;