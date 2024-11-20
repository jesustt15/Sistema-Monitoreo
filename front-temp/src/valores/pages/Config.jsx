import { useForm } from "react-hook-form";
import Navbar from "../../components/NavBar";
import { useConfig } from "../../context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/masisa-logo.png";
import { PhotoCarousel} from "./components/PhotoCarousel";
import { imagesUrls} from "../../components";

export const Config = () => {
    const { register, handleSubmit, setValue } = useForm();
    const { updateConfig, getConfig } = useConfig();
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
            await updateConfig({ ...data });
            alert('Actualizado');
            navigate('/valores');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="full-container">
            <Navbar />
            <div className="container">
                <div className="general-container">
                    <div className="content-form">
                        <div className="header">
                            <img src={Logo} alt="masisa-logo" />
                            <h2>Configuración de Alertas</h2>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="content-div">
                                <div className="header-label1">
                                    Correo de Configuración
                                    <i className="blue bi bi-gear"></i>
                                </div>
                                <label>Correo electrónico</label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    {...register("email")}
                                />
                                <label>Contraseña de Aplicación</label>
                                <input
                                    type="password"
                                    placeholder="Contraseña"
                                    {...register("password")}
                                />
                            </div>
                            <div>
                                <div className="header-label">
                                    Correo de Alerta
                                    <i className="bi bi-bell"></i>
                                </div>
                                <label>Correo electrónico</label>
                                <input
                                    type="email"
                                    placeholder="emailSend"
                                    {...register("emailSend")}
                                />
                            </div>
                            <div>
                                <input
                                    className="btn-submit"
                                    type="submit"
                                    value="Actualizar"
                                />
                            </div>
                        </form>
                    </div>
                    <div className="img-content">
                    <PhotoCarousel images={imagesUrls} />
                    </div>
                </div>
            </div>
        </div>
    );
};
