import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b-4 text-center fixed top-0 bg-blue-600 font-bold w-full text-lg text-white">
      <div className="flex justify-between items-center px-4">
        <div className="pl-4">
          <Link to="/">PMP-Air</Link>
        </div>
        <ul className="flex justify-end items-center pr-6">
          <li className="inline-block py-4">
            <Link to="/" className="pl-6 pr-8">
              Devices
            </Link>
          </li>
          <li className="inline-block py-4">
            <Link to="/historic" className="pl-6 pr-8">
              Historic Data
            </Link>
          </li>
          <li className="inline-block py-4">
            <Link to="/live" className="pl-6 pr-8">
              Live Data
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
