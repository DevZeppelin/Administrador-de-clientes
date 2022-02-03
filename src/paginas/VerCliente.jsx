import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const VerCliente = () => {
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
      setTimeout(()=> {
          setCargando(!cargando);
          //muy comun para cambiar de valor cada vez que se ejecuta el codigo
      }, 1500)
    };
    obtenerClienteAPI();
  }, []);

  console.log(cargando);

  return (

      cargando  ? <Spinner/>
                : Object.keys(cliente).length === 0 ? <p className="text-4xl text-red-600 font-bold animate-pulse">El cliente no existe</p> : (
        <>
    
    <div>
          <h1 className="text-4xl font-bold text-blue-800">
            Ver Cliente: {cliente.nombre}
          </h1>
          <p className="text-lg">Información del cliente</p>

          <p className="text-gray-700 text-2xl mt-5">
            <span className="uppercase font-bold">Cliente: </span>
            {cliente.nombre}
          </p>
          <p className="text-gray-700 text-2xl mt-2">
            <span className="uppercase font-bold">Empresa: </span>
            {cliente.empresa}
          </p>
          <p className="text-gray-700 text-2xl mt-2">
            <span className="uppercase font-bold">Email: </span>
            {cliente.email}
          </p>
          <p className="text-gray-700 text-2xl mt-2">
            <span className="uppercase font-bold">Telefono: </span>
            {cliente.telefono}
          </p>
          {/* Este es un TRUCAZO para mostrar el p de notas si existe una nota, si no hay nota, no se mostrará NADA */}
          {cliente.notas && (
            <p className="text-gray-700 text-2xl mt-2">
              <span className="uppercase font-bold">Notas: </span>
              {cliente.notas}
            </p>
            //los datos que no son obligatorios habria que hacerle esto para VALIDAR
          )}
       
      
    </div>
    </>
    )
  );
};

export default VerCliente;
