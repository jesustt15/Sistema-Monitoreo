import { useEffect } from 'react';
import { useHistorico } from '../context/HistoricoContext';
import Navbar from '../components/NavBar';
import '../index.scss';
import { useLugar } from '../context';
import { Table } from './Table';



export const Historico = () => {
  const {lugares} = useLugar();
  const {results ,getHistorico , searcher} = useHistorico();

    useEffect(() => {
      getHistorico();

  },[]);

  return (
    
    <>
    <Navbar />
      
    <div className="full-container">
        <div className="container">
              <Table />
        </div>
    </div>
    </>

    
  );
}