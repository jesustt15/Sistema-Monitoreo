import { Link, NavLink } from 'react-router-dom';





const Navbar = () => {

  

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Inicio</Link>
        <NavLink to="/config">Config</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
