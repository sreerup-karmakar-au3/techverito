import { NavLink } from "react-router-dom";
import "./style.scss";
import React from "react";

interface HeaderProps {
  totalCartProducts: number;
}

const Header: React.FC<HeaderProps> = ({ totalCartProducts }) => {
  return (
    <>
      <header>
        <h1>Products</h1>
      </header>
      <nav className="nav-bar">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          Home
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          Cart {totalCartProducts ? `(${totalCartProducts})` : ''}
        </NavLink>
      </nav>
    </>
  );
};

export default Header;
