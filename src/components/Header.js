import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';
import MenuMobile from './MenuMobile';


function Header(props) {



  // Открыть/закрыть email пользователя в мобильной версии
  function openAuthInfo() {
    props.showMenu('mobile_position1');
  }

  const { pathname } = useLocation();
  const linkText = `${pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`;
  const linkPath = `${pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`;

  return (

      <header className='header__position'>
        <div className='header'>
          <img src={logo} alt='Логотип «Mesto Russia»' className='header__logo'/>
          {props.loggedIn
            ? (<>
                <div className='header__info-desktop'>
                  <span>{props.email}</span>
                  <button className='button link header__link' onClick={props.signOut}>Выйти</button>
                </div>

                <button
                  className={`header__menu  ${props.classHeaderMenu}`}
                  onClick={openAuthInfo}
                >
                  <span/>
                </button>

              </>
            )
            : (<Link to={linkPath} className="button link header__link">{linkText}</Link>)
          }
        </div>
      </header>
  );
}

export default Header;
