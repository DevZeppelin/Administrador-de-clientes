import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-2xl bg-blue-900 min-h-screen">
      <h1 className="text-center py-28 text-white font-extrabold mx-6 md:mx-96 text-3xl md:text-5xl">¡Bienvenido a Administrator CMR!</h1>
      <Link to="/clientes">
        <button className="p-6 m-2 flex justify-center mx-auto border-white text-white  border-2 rounded-lg">
          Ingresar
        </button>
      </Link>
    </div>
  );
};

export default Home;
