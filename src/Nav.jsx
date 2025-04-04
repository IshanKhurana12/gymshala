import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-black text-amber-50 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between p-5">
        <div className="text-4xl font-extrabold mb-4 md:mb-0 tracking-wide">
          GYM <span className="text-yellow-400">शाला</span>
        </div>
        <ul className="flex flex-row items-center gap-6 text-lg">
          <li className="hover:text-yellow-400 transition duration-300">
            <Link to="/login">Login</Link>
          </li>
          <li className="hover:text-yellow-400 transition duration-300">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-yellow-400 transition duration-300">
            <Link to="/add">Add</Link>
          </li>
          <li className="hover:text-yellow-400 transition duration-300">
            <Link to="/update">Find & Update</Link>
          </li>
          <li className="hover:text-yellow-400 transition duration-300">
            <Link to="/delete">Delete</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
