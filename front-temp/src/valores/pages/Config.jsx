import { useForm } from "react-hook-form";
import Navbar from "../../components/NavBar";
import { useConfig } from "../../context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/masisa-logo.png";
import Pasos from "../../assets/contrasenia-google.png";

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

        <div className="full-container">
        <Navbar />
          <div className="container">
            <div className="general-container">
              <div className="content-form">

                  <div className="header">
                        <img src={Logo} alt="masisa-logo" />
                        <h2>Configuración de Alertas</h2>
                    </div>
                  <form  onSubmit={handleSubmit(onSubmit)}>
                    <div className="content-div">
                          <div className="header-label1">Correo de Configuración
                          <i className="blue bi bi-gear"></i>
                          </div>
                          <label>Correo electrónico</label>
                          <input
                          type="email"
                          placeholder="email"
                          value={config.email}
                          {...register("email")}
                          ></input>

                          <label>Contraseña de Aplicación</label>
                            <input
                          type="password"
                          placeholder="Contraseña"
                          {...register("password")}
                          ></input>
                    </div>
                    <div>
                          <div className="header-label">Correo de Alerta

                          <i className="bi bi-bell"></i>
                          </div>
                          <label>Correo electrónico</label>
                          <input
                          type="email"
                          placeholder="emailSend"
                          {...register("emailSend")}
                          ></input>
                    </div>
                    <div>
                          <input
                          className="btn-submit"
                          type="submit"
                          value="Actualizar"
                          ></input>
                    </div>
                </form>
              </div>
              <div className="img-content">
                  <img src="#"
                   alt="pasitos" />
              </div>
            </div>
          </div>
        </div>  
    </>
  )
}
