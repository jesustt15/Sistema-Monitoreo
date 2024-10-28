/* eslint-disable react/prop-types */
import  { useState } from 'react';
import '../valores.scss';

const Box = ({ isActive, onClick, children }) => {
  return (
    <div className={`box ${isActive ? 'active' : 'inactive'}`} onClick={onClick}>
      {children}
    </div>
  );
};

const App = () => {
  const [activeBox, setActiveBox] = useState(0);

  return (
    <div className="container-box">
      <div className="active-box">
        <Box isActive={true} onClick={() => setActiveBox(activeBox)}>
          Caja {activeBox + 1}
        </Box>
      </div>
      <div className="inactive-boxes">
        {[0, 1, 2, 3].filter((index) => index !== activeBox).map((index) => (
          <Box key={index} isActive={false} onClick={() => setActiveBox(index)}>
            Caja {index + 1}
          </Box>
        ))}
      </div>
    </div>
  );
};

export default App;