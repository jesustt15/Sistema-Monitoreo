import { Link } from 'react-router-dom';





const Navbar = () => {

  

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Inicio</Link>
      </div>
    </nav>
  );
};

export default Navbar;
