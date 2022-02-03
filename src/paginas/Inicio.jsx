import { useEffect, useState } from "react";
import Cliente from "../components/Cliente";

const Inicio = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const obtenerClientesAPI = async () => {
      try {
        //const url = "http://localhost:4000/clientes";
        const url = import.meta.env.VITE_API_URL;
        const respuesta = await fetch(url);
        //con fetch si voy a usar un get no es necesario especificar, si para un put o push
        const resultado = await respuesta.json();
        //va a mostrarme los clientes en consola
        setClientes(resultado);
        console.log(clientes);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerClientesAPI();
  }, []);

  const handleEliminar = async id => {
    const confirmar = confirm("¿Deseas eliminar este cliente?")
    console.log(confirmar)
    if (confirmar){
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`
        const respuesta = await fetch (url, {
          method: 'DELETE'
          //no le pasamos el body xq solo requiere el id para saber cual eliminar
        })
        await respuesta.json()
        //con location.reload() podria recargar para que actualice el cambio, pero no es lo ideal xq cada vez esta haciendo un llamado a la API
        //mucho mejor forma hacerlo usando el state de clientes
        const arrayClientes = clientes.filter(cliente => cliente.id !== id)
        setClientes(arrayClientes)
        
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="pt-3">
       Administra tus clientes
      </p>

      <table className="w-full mt-5 table-auto shadow bg-white">
          <thead className="bg-blue-800 text-white">
            <tr>
                <th className="p-2">Nombre</th>
                <th className="p-2">Contacto</th>
                <th className="p-2">Empresa</th>
                <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
              {clientes.map(cliente => (
                  <Cliente
                    key={cliente.id}
                    cliente={cliente}
                    handleEliminar={handleEliminar}
                  />
              ))}
          </tbody>

      </table>
    </>
  );
};

export default Inicio;
