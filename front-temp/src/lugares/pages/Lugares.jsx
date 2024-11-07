import Navbar from "../../components/NavBar";
import '../../index.scss';
import { Link } from "react-router-dom";
import { Table } from "../components/Table";



export const Lugares = () => {

    
      
  return (
  <>
    
    <div className="full-container">
        <Navbar />  
        <div className="container">
          <Link to={'/new-lugar'}>Agregar</Link>
            <Table />
        </div>
    </div>
  </>
    
  )
}
