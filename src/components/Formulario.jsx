import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Alerta from "./Alerta";
import Spinner from "../components/Spinner";

const Formulario = ({ cliente, cargando }) => {
  //es un hook para redireccionar a los cleintes
  const navigate = useNavigate();

  //Schema, en el comp Formik lo asocio
  //Yup nos permite mucha flexibilidad a la hora de valdiar formularios
  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("El nombre del cliente es obligatorio")
      .min(3, "El nombre es muy corto")
      .max(30, "El nombre es muy largo"),
    empresa: Yup.string().required("El nombre de la empresa es obligatorio"),
    email: Yup.string()
      .email("Email no válido")
      .required("El email del cliente es obligatorio"),
    telefono: Yup.number()
      .integer()
      .positive()
      .typeError("El número no es válido"),
  });

  const handleSubmit = async (valores) => {
    //SCOPE
    //declaro let=respuesta en el try entonces la variable ya existe y se va a llenar en el if o en el else
    let respuesta
    //excelente forma de debuguear el llamado a una api
    try {
      
      //si existe cliente.id es porque estoy editando cliente
      if (cliente.id) {
        //Editando un registro, todo similar salvo el PUT y la url para el fetch
        const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`;
        respuesta = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        //Agregando un nuevo cliente (si no existe cliente.id entra en este else )
        const url = import.meta.env.VITE_API_URL;

        //IMPORTANTE SCOPE: Fuera del eslse yo no tengo acceso a respuesta

        respuesta = await fetch(url, {
          //si no coloco metodo, por defecto envia GET, por eso paso un segundo parametro a fetch
          method: "POST",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
          //le estoy diciendo: has un post a esa url y los valores enviala como string, el tipo de contenido es aplication/json
        });
      }     

      const resultado = await respuesta.json();     
      //asigna un id a cada entrada como si fuera un backend real

      navigate("/clientes");

      //navigate es el hook que usea arriba, aca pongo a donde lo quiero redireccionar. Cuando clickean el submit cargo el objeto en el api rest de clientes y redirecciono al cliente hacia la pagina de clientes
    } catch (error) {
      console.log(error);
    }
  };

  return cargando ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
        {/* Si viene el cliente.nombre es porque estamos editando, sino estamos agregando */}
      </h1>
      {/* en el initialCValue asociamos por ejemplo nombre, agregando en el Field name="nombre" */}
      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? "",
          /* esta es una nueva sintaxis como un ternario, muy buena */
          /* "si existe cliente.nombre utilizala, sino utiliza uns tring vacio" */
          /* nombre: cliente.nombre ? cliente.nombre : "", ese ternario tambien es valido y se puede utilizar */
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        enableReinitialize={true}
        //hace que pinte en el formulario las props recibidas
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          //creo esta funcion sobre el return y al hacer submit envio todos los datos a dicha funcion que yo creé. De ahi puedo enviarla al backend o a un API
          //resetForm es una funcion que puedo extraer, epro para garantizarme que si se ejecutío el handle puedo hacer la funcion asincrona: osea que espere a ejecutar el handle y luego recien resetee
          resetForm();
          //Para redireccionar al usuario una vez termino el formulario voy a utilizar un hook de react router,el hook se llama route navigate
        }}
        validationSchema={nuevoClienteSchema}
      >
        {/* este arrow function debe envolver todo el Form */}
        {/* Extraigo errors para manejar los errores para la valdiacion */}
        {({ errors, touched }) => {
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="nombre">
                  Nombre:
                </label>
                <Field
                  id="nombre"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Nombre del Cliente"
                  name="nombre"
                />
                {/* tauched es para validar en tiempo real cndo el usuario haga click fuera del campo */}
                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="empresa">
                  Empresa:
                </label>
                <Field
                  id="empresa"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Empresa del Cliente"
                  name="empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="email">
                  Email:
                </label>
                <Field
                  id="email"
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Email del Cliente"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="telefono">
                  Telefono:
                </label>
                <Field
                  id="telefono"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Teléfono del Cliente"
                  name="telefono"
                />
                {errors.telefono && touched.telefono ? (
                  <Alerta>{errors.telefono}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="notas">
                  Notas:
                </label>
                <Field
                  as="textarea"
                  id="notas"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Notas del Cliente"
                  name="notas"
                />
              </div>
              <input
                type="submit"
                value={cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-xl"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

Formulario.defaultProps = {
  cliente: {},
  //aca defino cliente como un objeto vacio ya q estoy reutilizadno el Formulario para agregar clientes nuevos y para editarlos, entonces si no encuentra clientes (requeridos apra editar) va a tomar los aprametros por defecto quie es un objeto vacio
  cargando: false,
  //esto es paara que cargando si exista aunque sea false
};

export default Formulario;
