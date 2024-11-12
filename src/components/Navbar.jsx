import React from "react";
import { NavLink } from "react-router-dom";
import './ForAll.css';

const Navbar = () => {
  
  return (
    <div className="flex flex-row gap-5 m-4 p-4 justify-center place-content-evenly justify-items-center font-medium text-dark-yellow bg-dark-navy rounded-xl shadow-neomorph-dark">
      <NavLink
        to="/"
        className="px-4 py-2 rounded-lg bg-dark-blue shadow-neomorph-dark hover:shadow-neomorph-inset-dark transition-all text-white"
      >
        <button>
          Home
        </button>
      </NavLink>
      <NavLink
        to="/pastes"
        className="px-4 py-2 rounded-lg bg-dark-blue shadow-neomorph-dark hover:shadow-neomorph-inset-dark transition-all text-white"
      >
        Pastes
      </NavLink>
    </div>
  );
};

export default Navbar;
