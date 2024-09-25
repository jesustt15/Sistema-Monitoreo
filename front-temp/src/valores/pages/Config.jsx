import { useForm } from "../../hooks"
import Navbar from "../components/NavBar"


const configFormField = {
  emailConfig: '',
  passwordConfig: ''
};



export const Config = () => {

    const {emailConfig , passwordConfig, onInputChange:onConfigChange} = useForm( configFormField);

      const onHandleConfigSubmit = async(e) =>{
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:3000/sensor/config', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: emailConfig, password: passwordConfig })
          });
          if (response.ok) {
            window.location.reload();
            console.log('Datos enviados con éxito');
          } else {
            console.error('Error al enviar los datos');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }

  return (
    <>
        <Navbar />
        <p>Config</p>
        <br></br>
        <form onSubmit={onHandleConfigSubmit}>
          <div>
                <input
                type="email"
                placeholder="Email"
                name="emailConfig"
                value={emailConfig}
                onChange={onConfigChange}
                ></input>
          </div>
          <div>
                <input
                type="password"
                placeholder="password"
                name="passwordConfig"
                value={passwordConfig}
                onChange={onConfigChange}
                ></input>
          </div>
          <div>
                <input
                type="submit"
                value="Actualizar"
                ></input>
          </div>


        </form>

    </>
  )
}
