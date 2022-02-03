import Formulario from "../components/Formulario";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditarCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  //const params = useParams()
  const { id } = useParams();

  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      //Tener MUY en cuenta esta sintaxis del set timeout
      setTimeout(() => {
        setCargando(!cargando);
        //muy comun para cambiar de valor cada vez que se ejecuta el codigo
      }, 1500);
    };
    obtenerClienteAPI();
  }, []);

  console.log(cargando);

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="pt-3">Utiliza este foirmulario para editar un cliente</p>

      {cliente?.nombre ? (
        <Formulario cliente={cliente} cargando={cargando} />
      ) : (
        <p className="text-4xl text-red-600 animate-pulse mt-16">ID de Cliente no válido</p>
      )}
    </>
  );
};

export default EditarCliente;
