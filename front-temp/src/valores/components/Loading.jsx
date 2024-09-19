import { useState} from "react";
import BarLoader from "react-spinners/BarLoader";



export const Loading = () => {

    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("#00793D");
  
  
    return (
    <>
            <div className="loading">
                <BarLoader
                    color={color}
                    loading={loading}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
    </>


  )
}
