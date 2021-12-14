import {useNavigate} from 'react-router-dom'

//En Inicio.jsx hice un map sobre clientes, que es el state que hice, y le dije que por cada elemnto imprima un componente <Cliente/> donde le asigno una key diferente a cada uno (id) y le pase lo data, que seria la variable temporal cliente, y la traigo hacia este componente para poder utilizar sus atributos como cliente.nombre
const Cliente = ({ cliente, handleEliminar }) => {

    const navigate = useNavigate()

  //destructuring
  const { nombre, empresa, email, telefono, notas, id } = cliente;
  return (
    <tr className="border-b hover:bg-slate-200 ">
      <td className="p-3">{nombre}</td>
      <td className="p-3">
        <p>
          <span className="text-gray-800 uppercase font-bold">Email: </span>
          {email}
        </p>
        <p>
          <span className="text-gray-800 uppercase font-bold">Tel: </span>
          {telefono}
        </p>
      </td>
      <td className="p-3">{empresa}</td>
      <td className="p-3">
        <button
          type="button"
          className="bg-green-600 hover:bg-green-700 text-white uppercase font-bold text-xs w-full"
            onClick={()=> navigate(`/clientes/${id}`)}
            //para que exista la ruta debo ir al App.jsx y agregar un Route con el path :id y creo el componente VerCliente para ejecutar
        > 
          Ver
        </button>
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white uppercase font-bold text-xs w-full"
          onClick={()=> navigate(`/clientes/editar/${id}`)}

        >
          Editar
        </button>
        <button
          type="button"
          className="bg-red-600 hover:bg-red-700 text-white uppercase font-bold text-xs w-full"
          onClick={()=> handleEliminar(id)}
        >
          Eliminar
        </button>
       
      </td>
    </tr>
  );
};

export default Cliente;
