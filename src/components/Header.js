import React from 'react';
import logo from "../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <img alt="Логотип «Mesto Russia»" className="header__logo" src={logo}/>
    </header>
  );
}

export default Header;