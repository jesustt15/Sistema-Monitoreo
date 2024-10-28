import { useForm } from "react-hook-form";
import Navbar from "../../components/NavBar";
import { useConfig } from "../../context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import App from "./components/App";

export const Config = () => {

    const {register , handleSubmit, setValue} = useForm();
    const {updateConfig, getConfig, config} = useConfig();
    const navigate = useNavigate();

    useEffect(() => {
      const loadConfig = async () => {
          const configData = await getConfig();
          setValue('email', configData.email);
          setValue('password', configData.password);
          setValue('emailSend', configData.emailSend);

      };
        loadConfig();
  }, []);
  
  const onSubmit = async (data) => {
      try {
          updateConfig({...data });
            alert('actualizado');
            navigate('/valores')
      } catch (error) {
          console.log(error);
          // window.location.href = "/";
        }
}


  return (
    <>
        <Navbar />

        <div className="full-container">
          <div className="container">
                {/* <p>Config</p>
              <br></br>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                      <input
                      type="email"
                      placeholder="email"
                      value={config.email}
                      {...register("email")}
                      ></input>
                </div>
                <div>
                      <input
                      type="password"
                      placeholder="Contraseña"
                      {...register("password")}
                      ></input>
                </div>
                <div>
                      <input
                      type="email"
                      placeholder="emailSend"
                      {...register("emailSend")}
                      ></input>
                </div>
                <div>
                      <input
                      type="submit"
                      value="Actualizar"
                      ></input>
                </div>
                <div>{config.email}</div>
              </form>
              <br /> */}
              <App />
          </div>
        </div>  
    </>
  )
}
